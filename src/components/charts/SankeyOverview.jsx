import React, { useState, useEffect } from 'react';
import { Events } from '../../lib/api';
import './SankeyOverview.css';

function buildSankeyLayout(data, options, columns) {
  const { width, height, nodeWidth, columnGap, rowGap } = options;
  const nodeById = new Map(data.nodes.map((node) => [node.id, node]));
  const columnMap = new Map();
  columns.forEach((col, colIndex) => {
    col.forEach((id) => columnMap.set(id, colIndex));
  });

  const incoming = new Map();
  const outgoing = new Map();
  data.links.forEach((link) => {
    outgoing.set(link.source, (outgoing.get(link.source) || 0) + link.value);
    incoming.set(link.target, (incoming.get(link.target) || 0) + link.value);
  });

  const nodes = data.nodes.map((node) => {
    const inVal = incoming.get(node.id) || 0;
    const outVal = outgoing.get(node.id) || 0;
    const value = Math.max(inVal, outVal);
    return { ...node, value, column: columnMap.get(node.id) || 0 };
  });

  const columnTotals = new Map();
  columns.forEach((col, colIndex) => {
    const total = col.reduce((sum, id) => {
      const n = nodes.find((node) => node.id === id);
      return sum + (n?.value || 0);
    }, 0);
    columnTotals.set(colIndex, total);
  });

  const maxNodes = Math.max(...columns.map((col) => col.length));
  const maxTotal = Math.max(...Array.from(columnTotals.values()));
  const scale = (height - (maxNodes - 1) * rowGap) / (maxTotal || 1);

  const layout = new Map();
  columns.forEach((col, colIndex) => {
    const nodesInCol = col
      .map((id) => nodes.find((node) => node.id === id))
      .filter(Boolean);
    const columnHeight = nodesInCol.reduce((sum, node) => sum + node.value * scale, 0)
      + (nodesInCol.length - 1) * rowGap;
    let y = (height - columnHeight) / 2;
    const x = colIndex * (nodeWidth + columnGap);
    nodesInCol.forEach((node) => {
      const h = Math.max(4, node.value * scale);
      layout.set(node.id, { x, y, width: nodeWidth, height: h, node });
      y += h + rowGap;
    });
  });

  const outOffset = new Map();
  const inOffset = new Map();

  const links = data.links.map((link) => {
    const sourceLayout = layout.get(link.source);
    const targetLayout = layout.get(link.target);
    if (!sourceLayout || !targetLayout) return null;

    const thickness = Math.max(1.5, link.value * scale);
    const out = outOffset.get(link.source) || 0;
    const inc = inOffset.get(link.target) || 0;
    const y0 = sourceLayout.y + out + thickness / 2;
    const y1 = targetLayout.y + inc + thickness / 2;
    outOffset.set(link.source, out + thickness);
    inOffset.set(link.target, inc + thickness);

    const x0 = sourceLayout.x + sourceLayout.width;
    const x1 = targetLayout.x;
    const c1 = x0 + (x1 - x0) * 0.5;
    const c2 = x0 + (x1 - x0) * 0.5;
    const d = `M ${x0} ${y0} C ${c1} ${y0}, ${c2} ${y1}, ${x1} ${y1}`;

    return {
      ...link,
      d,
      thickness,
      targetGroup: nodeById.get(link.target)?.group || 'neutral',
    };
  }).filter(Boolean);

  return { nodes: Array.from(layout.values()), links, width, height };
}

function buildSankeyData(apiData) {
  const {
    cravingContextPercentages = {},
    relapseContextPercentages = {},
    highRiskContexts = [],
    totalRelapses = 0,
    totalCravings = 0,
  } = apiData;

  const allContexts = Array.from(new Set([
    ...Object.keys(cravingContextPercentages),
    ...Object.keys(relapseContextPercentages),
  ]));

  const highRiskSet = new Set(highRiskContexts);

  const nodes = [
    ...allContexts.map((ctx) => ({
      id: ctx,
      group: highRiskSet.has(ctx) ? 'loss' : 'neutral',
    })),
    { id: 'Resistiu', group: 'profit' },
    { id: 'Fumou', group: 'loss' },
  ];

  const links = [];
  allContexts.forEach((ctx) => {
    const relapsePct = relapseContextPercentages[ctx] || 0;
    const cravingPct = cravingContextPercentages[ctx] || 0;
    const relapsesForCtx = Math.round((relapsePct / 100) * totalRelapses);
    const totalCravingsForCtx = Math.round((cravingPct / 100) * totalCravings);
    const resistedForCtx = Math.max(0, totalCravingsForCtx - relapsesForCtx);

    if (relapsesForCtx > 0) links.push({ source: ctx, target: 'Fumou', value: relapsesForCtx });
    if (resistedForCtx > 0) links.push({ source: ctx, target: 'Resistiu', value: resistedForCtx });
  });

  const columns = [allContexts, ['Resistiu', 'Fumou']];
  return { data: { nodes, links }, columns };
}

export const SankeyOverview = ({ refreshKey = 0 }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Events.relapseCorrelation()
      .then(setApiData)
      .catch(() => setApiData(null))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return (
      <section className="sankey">
        <div className="sankey__title">Correlação Gatilhos → Recaídas</div>
        <div className="sankey__subtitle">Carregando dados...</div>
      </section>
    );
  }

  const isEmpty = !apiData
    || ((!apiData.totalCravings || apiData.totalCravings === 0)
      && (!apiData.totalRelapses || apiData.totalRelapses === 0));

  if (isEmpty) {
    return (
      <section className="sankey">
        <div className="sankey__title">Correlação Gatilhos → Recaídas</div>
        <div className="sankey__subtitle">Nenhum dado registrado ainda.</div>
      </section>
    );
  }

  const { data, columns } = buildSankeyData(apiData);

  if (data.links.length === 0) {
    return (
      <section className="sankey">
        <div className="sankey__title">Correlação Gatilhos → Recaídas</div>
        <div className="sankey__subtitle">Nenhum dado suficiente para gerar o gráfico.</div>
      </section>
    );
  }

  const contextCount = columns[0].length;
  const svgHeight = Math.max(280, contextCount * 55);
  const svgWidth = 500;
  const nodeWidth = 14;
  const columnGap = 310;

  const layout = buildSankeyLayout(data, {
    width: svgWidth,
    height: svgHeight,
    nodeWidth,
    columnGap,
    rowGap: 10,
  }, columns);

  return (
    <section className="sankey">
      <div className="sankey__title">Correlação Gatilhos → Recaídas</div>
      <div className="sankey__subtitle">
        {apiData.totalCravings} desejos · {apiData.totalRelapses} recaídas
        {apiData.highRiskContexts?.length > 0 && (
          <> · <span className="sankey__risk-badge">Alto risco: {apiData.highRiskContexts.join(', ')}</span></>
        )}
      </div>
      <div className="sankey__chart">
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          className="sankey__svg"
          role="img"
          aria-label="Gráfico de correlação entre gatilhos e recaídas"
        >
          {layout.links.map((link, i) => (
            <path
              key={`${link.source}-${link.target}-${i}`}
              d={link.d}
              className={`sankey__link sankey__link--${link.targetGroup}`}
              strokeWidth={link.thickness}
            />
          ))}
          {layout.nodes.map((n) => (
            <g key={n.node.id} className={`sankey__node sankey__node--${n.node.group || 'neutral'}`}>
              <rect x={n.x} y={n.y} width={n.width} height={n.height} rx="3" />
              <text
                x={n.x + n.width + 8}
                y={n.y + n.height / 2}
                className="sankey__label"
              >
                {n.node.label || n.node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
};
