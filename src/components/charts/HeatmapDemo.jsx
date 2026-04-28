import React, { useState, useEffect } from 'react';
import { Events } from '../../lib/api';
import './HeatmapDemo.css';

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const DAY_PT = {
  MONDAY: 'Seg', TUESDAY: 'Ter', WEDNESDAY: 'Qua',
  THURSDAY: 'Qui', FRIDAY: 'Sex', SATURDAY: 'Sáb', SUNDAY: 'Dom',
};
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));

function buildValueMap(apiData) {
  const map = {};
  let max = 0;
  apiData.forEach(({ hour, dayOfWeek, context, count, avgIntensity }) => {
    const key = `${dayOfWeek}_${String(hour).padStart(2, '0')}`;
    if (!map[key]) map[key] = { count: 0, topContext: null, topCount: 0, avgIntensity: 0 };
    map[key].count += count;
    if (count > map[key].topCount) {
      map[key].topCount = count;
      map[key].topContext = context;
      map[key].avgIntensity = avgIntensity;
    }
    if (map[key].count > max) max = map[key].count;
  });
  return { map, max };
}

function getLevel(value, max) {
  if (!value || !max) return 0;
  const t = value / max;
  if (t < 0.08) return 1;
  if (t < 0.16) return 2;
  if (t < 0.28) return 3;
  if (t < 0.42) return 4;
  if (t < 0.58) return 5;
  if (t < 0.72) return 6;
  if (t < 0.86) return 7;
  return 8;
}

export const HeatmapDemo = ({ refreshKey = 0 }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Events.heatmap()
      .then(setApiData)
      .catch(() => setApiData(null))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  if (loading) {
    return (
      <section className="heatmap">
        <div className="heatmap__title">Mapa de Calor — Desejos por Hora</div>
        <div className="heatmap__empty">Carregando dados...</div>
      </section>
    );
  }

  if (!apiData || apiData.length === 0) {
    return (
      <section className="heatmap">
        <div className="heatmap__title">Mapa de Calor — Desejos por Hora</div>
        <div className="heatmap__empty">Nenhum dado registrado ainda.</div>
      </section>
    );
  }

  const { map, max } = buildValueMap(apiData);

  return (
    <section className="heatmap">
      <div className="heatmap__title">Mapa de Calor — Desejos por Hora</div>

      <div className="heatmap__chart">
        <div className="heatmap__x-axis">
          {DAY_ORDER.map((day) => (
            <span key={day} className="heatmap__x-label">{DAY_PT[day]}</span>
          ))}
        </div>

        <div className="heatmap__y-axis">
          {HOURS.map((h, i) => (
            <span key={h} className={`heatmap__y-label ${i % 2 === 0 ? '' : 'heatmap__y-label--muted'}`}>
              {h}h
            </span>
          ))}
        </div>

        <div className="heatmap__grid">
          {HOURS.map((h) =>
            DAY_ORDER.map((day) => {
              const key = `${day}_${h}`;
              const cell = map[key];
              const count = cell?.count || 0;
              const level = getLevel(count, max);
              const tooltip = count > 0
                ? `${count} ${count === 1 ? 'desejo' : 'desejos'} • ${DAY_PT[day]} ${h}h${cell?.topContext ? ` • ${cell.topContext}` : ''}${cell?.avgIntensity ? ` • intensidade média ${cell.avgIntensity.toFixed(1)}` : ''}`
                : `${DAY_PT[day]} ${h}h — sem registros`;
              return (
                <div
                  key={key}
                  className={`heatmap__cell heatmap__cell--l${level}`}
                  title={tooltip}
                  aria-label={tooltip}
                  role="img"
                />
              );
            })
          )}
        </div>
      </div>

      <div className="heatmap__legend">
        <span className="heatmap__legend-label">Menos</span>
        <div className="heatmap__legend-scale">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((l) => (
            <span key={l} className={`heatmap__legend-dot heatmap__cell--l${l}`} />
          ))}
        </div>
        <span className="heatmap__legend-label">Mais</span>
      </div>
    </section>
  );
};
