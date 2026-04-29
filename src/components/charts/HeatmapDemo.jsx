import React, { useState, useEffect } from 'react';
import { Events, getStoredUser } from '../../lib/api';
import { Icon } from '../../lib/icons';
import './HeatmapDemo.css';

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const DAY_PT = {
  MONDAY: 'Seg', TUESDAY: 'Ter', WEDNESDAY: 'Qua',
  THURSDAY: 'Qui', FRIDAY: 'Sex', SATURDAY: 'Sáb', SUNDAY: 'Dom',
};
const DAY_FULL_PT = {
  MONDAY: 'segundas-feiras', TUESDAY: 'terças-feiras', WEDNESDAY: 'quartas-feiras',
  THURSDAY: 'quintas-feiras', FRIDAY: 'sextas-feiras', SATURDAY: 'sábados', SUNDAY: 'domingos',
};
const DAY_SINGULAR_PT = {
  MONDAY: 'Segunda-feira', TUESDAY: 'Terça-feira', WEDNESDAY: 'Quarta-feira',
  THURSDAY: 'Quinta-feira', FRIDAY: 'Sexta-feira', SATURDAY: 'Sábado', SUNDAY: 'Domingo',
};

function nudgeTime(hourStr) {
  const h = parseInt(hourStr, 10);
  return h === 0 ? '23h45' : `${h - 1}h45`;
}
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

function computeStats(map) {
  const hourTotals = {};
  const dayTotals = {};
  HOURS.forEach(h => { hourTotals[h] = 0; });
  DAY_ORDER.forEach(d => { dayTotals[d] = 0; });

  Object.entries(map).forEach(([key, cell]) => {
    const [day, hour] = key.split('_');
    hourTotals[hour] = (hourTotals[hour] || 0) + cell.count;
    dayTotals[day] = (dayTotals[day] || 0) + cell.count;
  });

  const sortedHours = Object.entries(hourTotals).sort((a, b) => b[1] - a[1]);
  const peakHour = sortedHours[0];
  const quietHours = HOURS.filter(h => hourTotals[h] === 0).slice(0, 4);
  const peakDay = Object.entries(dayTotals).sort((a, b) => b[1] - a[1])[0];
  const totalCravings = Object.values(hourTotals).reduce((s, v) => s + v, 0);

  return { peakHour, quietHours, peakDay, totalCravings };
}

const MONTH_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function getMonthOptions(sinceDate) {
  const options = [{ year: null, month: null, label: 'Todos' }];
  const now = new Date();
  const since = sinceDate ? new Date(sinceDate) : now;
  const sinceYear = since.getFullYear();
  const sinceMonth = since.getMonth();

  for (let i = 0; i <= 120; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    if (d.getFullYear() < sinceYear || (d.getFullYear() === sinceYear && d.getMonth() < sinceMonth)) break;
    options.push({
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      label: `${MONTH_PT[d.getMonth()]} ${d.getFullYear()}`,
    });
  }
  return options;
}

export const HeatmapDemo = ({ refreshKey = 0 }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState({ hour: null, day: null });
  const [period, setPeriod] = useState({ year: null, month: null });

  const monthOptions = getMonthOptions(getStoredUser()?.createdAt);

  useEffect(() => {
    setLoading(true);
    Events.heatmap(period.year, period.month)
      .then(setApiData)
      .catch(() => setApiData(null))
      .finally(() => setLoading(false));
  }, [refreshKey, period.year, period.month]);

  const ChipsRow = () => (
    <div className="heatmap__months">
      {monthOptions.map((opt) => {
        const active = opt.year === period.year && opt.month === period.month;
        return (
          <button
            key={opt.label}
            className={`heatmap__month-chip${active ? ' heatmap__month-chip--active' : ''}`}
            onClick={() => setPeriod({ year: opt.year, month: opt.month })}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );

  if (loading) {
    return (
      <section className="heatmap">
        <div className="heatmap__title">Mapa de Vulnerabilidade</div>
        <div className="heatmap__empty">Carregando dados...</div>
        <ChipsRow />
      </section>
    );
  }

  if (!apiData || apiData.length === 0) {
    return (
      <section className="heatmap">
        <div className="heatmap__title">Mapa de Vulnerabilidade</div>
        <div className="heatmap__empty">Nenhum dado registrado ainda.</div>
        <ChipsRow />
      </section>
    );
  }

  const { map, max } = buildValueMap(apiData);
  const stats = computeStats(map);

  const peakEntry = Object.entries(map).reduce((best, [key, cell]) =>
    cell.count > (best?.cell?.count || 0) ? { key, cell } : best, null);
  const [peakDay, peakHour] = peakEntry?.key?.split('_') || [];
  const peakContext = peakEntry?.cell?.topContext;

  return (
    <section className="heatmap">
      <div className="heatmap__header">
        <div className="heatmap__title">Mapa de Vulnerabilidade</div>
        <ChipsRow />
      </div>

      {peakDay && (
        <div className="heatmap__toast">
          <div className="heatmap__toast-icon">
            <Icon name="Lightbulb2" size={18} color="#D4A350" />
          </div>
          <p className="heatmap__toast-text">
            Pico às <span className="heatmap__badge heatmap__badge--alert">{peakHour}h</span>{' '}
            nas <span className="heatmap__badge heatmap__badge--alert">{DAY_FULL_PT[peakDay]}</span>
            {peakContext && <> · gatilho: <span className="heatmap__badge heatmap__badge--alert">{peakContext}</span></>}.{' '}
            Quebre o padrão <strong>15 min antes</strong> desse horário.
          </p>
        </div>
      )}

      <div className="heatmap__chart">
        <div className="heatmap__x-axis">
          {DAY_ORDER.map((day) => (
            <span key={day} className="heatmap__x-label">{DAY_PT[day]}</span>
          ))}
        </div>

        <div className="heatmap__y-axis">
          {HOURS.map((h, i) => (
            <span
              key={h}
              className={`heatmap__y-label${i % 2 !== 0 ? ' heatmap__y-label--muted' : ''}`}
            >
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
              const isRowHl = hovered.hour === h;
              const isColHl = hovered.day === day;
              const isActive = isRowHl && isColHl;
              const tooltip = count > 0
                ? `${count} ${count === 1 ? 'desejo' : 'desejos'} · ${DAY_PT[day]} ${h}h${cell?.topContext ? ` · ${cell.topContext}` : ''}${cell?.avgIntensity ? ` · intensidade média ${cell.avgIntensity.toFixed(1)}` : ''}`
                : `${DAY_PT[day]} ${h}h — sem registros`;
              return (
                <div
                  key={key}
                  className={[
                    'heatmap__cell',
                    `heatmap__cell--l${level}`,
                    (isRowHl || isColHl) && !isActive ? 'heatmap__cell--hl' : '',
                    isActive ? 'heatmap__cell--active' : '',
                  ].join(' ')}
                  title={tooltip}
                  aria-label={tooltip}
                  role="img"
                  onMouseEnter={() => setHovered({ hour: h, day })}
                  onMouseLeave={() => setHovered({ hour: null, day: null })}
                />
              );
            })
          )}
        </div>
      </div>

      <div className="heatmap__legend">
        <span className="heatmap__legend-start">
          <span className="heatmap__legend-label-icon heatmap__legend-label-icon--start" />
          Sem registros
        </span>
        <div className="heatmap__legend-scale">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((l) => (
            <span key={l} className={`heatmap__legend-dot heatmap__cell--l${l}`} />
          ))}
        </div>
        <span className="heatmap__legend-end">
          <span className="heatmap__legend-label-icon heatmap__legend-label-icon--end" />
          Alta frequência
        </span>
      </div>

      <div className="heatmap__insights">
        {stats.peakHour && stats.peakHour[1] > 0 && (
          <div className="heatmap__insight-card heatmap__insight-card--alert">
            <div className="heatmap__insight-label">
              <Icon name="AlertCircle" size={14} color="#9A6200" />
              Seu Ponto Crítico
            </div>
            <span className="heatmap__insight-value">
              Às {stats.peakHour[0]}h a vontade aperta. Você já lidou com isso {stats.totalCravings} {stats.totalCravings === 1 ? 'vez' : 'vezes'}.
            </span>
            <div className="heatmap__insight-nudge">
              Agende uma Respiração 4-7-8 para as {nudgeTime(stats.peakHour[0])}.
              <button className="heatmap__insight-nudge-btn">Agendar Respiração 4-7-8</button>
            </div>
          </div>
        )}

        {stats.peakDay && stats.peakDay[1] > 0 && (
          <div className="heatmap__insight-card heatmap__insight-card--alert">
            <div className="heatmap__insight-label">
              <Icon name="BarChart3" size={14} color="#9A6200" />
              Onde Aperta
            </div>
            <span className="heatmap__insight-value">
              {DAY_SINGULAR_PT[stats.peakDay[0]]} exige mais de você.
            </span>
            <div className="heatmap__insight-nudge">
              {DAY_FULL_PT[stats.peakDay[0]].charAt(0).toUpperCase() + DAY_FULL_PT[stats.peakDay[0]].slice(1)} costumam ser pesadas.
              <button className="heatmap__insight-nudge-btn">Agendar Lembrete</button>
            </div>
          </div>
        )}

        {stats.quietHours.length > 0 ? (
          <div className="heatmap__insight-card heatmap__insight-card--good">
            <div className="heatmap__insight-label">
              <Icon name="Star" size={14} color="#22976b" />
              Seu Porto Seguro
            </div>
            <span className="heatmap__insight-value">
              Suas ilhas de paz: {stats.quietHours.map(h => `${h}h`).join(' · ')}.
            </span>
            <div className="heatmap__insight-nudge">
              Nesses momentos você está no controle. Use-os para respiros.
            </div>
          </div>
        ) : (
          <div className="heatmap__insight-card heatmap__insight-card--good">
            <div className="heatmap__insight-label">
              <Icon name="Star" size={14} color="#22976b" />
              Seu Porto Seguro
            </div>
            <span className="heatmap__insight-value">
              Continue registrando para revelar seus momentos de paz.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
