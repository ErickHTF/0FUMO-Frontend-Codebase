import React from 'react';
import { Icon } from '../lib/icons';
import { Card, PageTitle } from '../components/ui/Card';
import { Events } from '../lib/api';
import './TriggersScreen.css';

const TYPE_COLORS = {
  Ansiedade:   '#E05252',
  Hábito:      '#D4783A',
  Cansaço:     '#7B68C8',
  Social:      '#3B82F6',
  Tédio:       '#7A8494',
  Estresse:    '#C95F8E',
  'Manhã':     '#F59E0B',
  'Tarde':     '#D4783A',
  'Noite':     '#7B68C8',
  'Madrugada': '#3B82F6',
};

const TYPE_COLOR_CLASSES = {
  Ansiedade:   'type-color--ansiedade',
  Hábito:      'type-color--habito',
  Cansaço:     'type-color--cansaco',
  Social:      'type-color--social',
  Tédio:       'type-color--tedio',
  Estresse:    'type-color--estresse',
  'Manhã':     'type-color--manha',
  'Tarde':     'type-color--tarde',
  'Noite':     'type-color--noite',
  'Madrugada': 'type-color--madrugada',
};

const getTypeColorClass = (ctx, isCigarettes) => (
  TYPE_COLOR_CLASSES[ctx] || (isCigarettes ? 'type-color--cigarette' : 'type-color--muted')
);

const CIRCUMFERENCE = 2 * Math.PI * 38;

function DonutChart({ segments, total }) {
  let acc = 0;
  const GAP = segments.length > 1 ? 2.5 : 0;
  const arcs = segments.map(([ctx, count]) => {
    const pct    = count / total;
    const segLen = Math.max(0, pct * CIRCUMFERENCE - GAP);
    const offset = CIRCUMFERENCE - acc * CIRCUMFERENCE;
    acc += pct;
    return { ctx, count, segLen, offset, color: TYPE_COLORS[ctx] || '#7A8494' };
  });
  return (
    <svg viewBox="0 0 100 100" className="triggers__donut">
      <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-border)" strokeWidth="10" />
      {arcs.map(a => (
        <circle key={a.ctx} cx="50" cy="50" r="38" fill="none"
          stroke={a.color} strokeWidth="10" strokeLinecap="butt"
          strokeDasharray={`${a.segLen} ${CIRCUMFERENCE - a.segLen}`}
          strokeDashoffset={a.offset}
          transform="rotate(-90 50 50)"
        />
      ))}
      <text x="50" y="46" textAnchor="middle" fontSize="16" fontWeight="700"
        fill="var(--color-text-primary)" fontFamily="inherit">{total}</text>
      <text x="50" y="59" textAnchor="middle" fontSize="9"
        fill="var(--color-text-secondary)" fontFamily="inherit">registros</text>
    </svg>
  );
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso), now = new Date();
  const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yest  = new Date(today); yest.setDate(yest.getDate() - 1);
  const eDay  = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (eDay.getTime() === today.getTime()) return `HOJE, ${time}`;
  if (eDay.getTime() === yest.getTime())  return `ONTEM, ${time}`;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase() + `, ${time}`;
}

function formatTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function formatDay(iso) {
  if (!iso) return '';
  const d = new Date(iso), now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yest  = new Date(today); yest.setDate(yest.getDate() - 1);
  const eDay  = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  if (eDay.getTime() === today.getTime()) return 'Hoje';
  if (eDay.getTime() === yest.getTime())  return 'Ontem';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function timeLabel(iso) {
  if (!iso) return 'Noite';
  const h = new Date(iso).getHours();
  if (h >= 5  && h < 12) return 'Manhã';
  if (h >= 12 && h < 18) return 'Tarde';
  if (h >= 18 && h < 23) return 'Noite';
  return 'Madrugada';
}

function isInPeriod(iso, period) {
  if (period === 'todos') return true;
  const d = new Date(iso), now = new Date();
  if (period === 'hoje')   return d.toDateString() === now.toDateString();
  if (period === '7dias')  { const w = new Date(now); w.setDate(w.getDate()-7);  return d >= w; }
  if (period === '30dias') { const m = new Date(now); m.setDate(m.getDate()-30); return d >= m; }
  return true;
}

export const TriggersScreen = () => {
  const [activeTab,       setActiveTab]       = React.useState('cravings');
  const [viewMode,        setViewMode]        = React.useState('grid');
  const [cravings,        setCravings]        = React.useState([]);
  const [cigarettes,      setCigarettes]      = React.useState([]);
  const [loading,         setLoading]         = React.useState(true);
  const [filterPeriod,    setFilterPeriod]    = React.useState('todos');
  const [selectedTypes,   setSelectedTypes]   = React.useState(new Set());
  const [filterIntensity, setFilterIntensity] = React.useState('todos');
  const [searchQuery,     setSearchQuery]     = React.useState('');

  const load = () => {
    setLoading(true);
    Promise.all([Events.list('CRAVING'), Events.list('CIGARETTE_SMOKED')])
      .then(([c, s]) => { setCravings(c); setCigarettes(s); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  React.useEffect(() => { load(); }, []);

  React.useEffect(() => {
    const handleCravingLogged = () => load();
    window.addEventListener('craving-logged', handleCravingLogged);
    return () => window.removeEventListener('craving-logged', handleCravingLogged);
  }, []);

  const handleDelete = async (id, type) => {
    if (!confirm('Remover este registro?')) return;
    try {
      await Events.remove(id);
      if (type === 'CRAVING')               setCravings(p => p.filter(e => e.id !== id));
      else if (type === 'CIGARETTE_SMOKED') setCigarettes(p => p.filter(e => e.id !== id));
    } catch { /* silently fail */ }
  };

  const toggleType = ctx => {
    setSelectedTypes(prev => {
      const n = new Set(prev);
      n.has(ctx) ? n.delete(ctx) : n.add(ctx);
      return n;
    });
  };

  const counts = (arr) => {
    const m = {};
    arr.forEach(e => { if (e.context) m[e.context] = (m[e.context] || 0) + 1; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  };
  const sortedCravingTypes = counts(cravings);
  const sortedCigTypes     = counts(cigarettes);

  const cigTimeOfDayCounts = React.useMemo(() => {
    const m = {};
    cigarettes.forEach(e => {
      const label = timeLabel(e.occurredAt || e.recordedAt);
      m[label] = (m[label] || 0) + 1;
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [cigarettes]);

  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const thisW = {}, lastW = {};
  cravings.forEach(e => {
    const t = new Date(e.occurredAt || e.recordedAt).getTime();
    if (!e.context) return;
    if (t >= now - ONE_WEEK)          thisW[e.context] = (thisW[e.context]||0)+1;
    else if (t >= now - 2 * ONE_WEEK) lastW[e.context] = (lastW[e.context]||0)+1;
  });
  const weekDelta = ctx => {
    const c = thisW[ctx]||0, p = lastW[ctx]||0;
    if (!c && !p) return null;
    if (!p) return c ? `+${c} esta semana` : null;
    const pct = Math.round(Math.abs((c-p)/p)*100);
    if (c > p) return `+${pct}% vs sem. anterior`;
    if (c < p) return `-${pct}% vs sem. anterior`;
    return 'igual à sem. anterior';
  };

  const applyFilter = (arr) => arr.filter(e => {
    if (!isInPeriod(e.occurredAt || e.recordedAt, filterPeriod)) return false;
    if (selectedTypes.size > 0 && !selectedTypes.has(e.context))  return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!(e.context || '').toLowerCase().includes(q) && !(e.note || '').toLowerCase().includes(q)) return false;
    }
    return true;
  });
  const filteredCravings   = applyFilter(cravings).filter(e =>
    filterIntensity === 'todos' || e.intensity === parseInt(filterIntensity)
  );
  const filteredCigarettes = applyFilter(cigarettes);

  const hasTypeFilter = selectedTypes.size > 0;
  const activeList    = activeTab === 'cravings' ? filteredCravings : filteredCigarettes;

  return (
    <>
      <div className="triggers__header-row">
        <PageTitle title="Diário de Gatilhos" subtitle="Reconhecer é o primeiro passo. Registre e compreenda seus momentos." />
      </div>

      {/* ── Tabs ─────────────────────────────────────── */}
      <div className="triggers__tabs">
        <button onClick={() => setActiveTab('cravings')}
          className={`triggers__tab-btn ${activeTab === 'cravings' ? 'triggers__tab-btn--active' : 'triggers__tab-btn--inactive'}`}>
          <Icon name="Flame" size={15} color={activeTab === 'cravings' ? 'var(--color-primary)' : 'var(--color-muted)'} />
          Desejos {cravings.length > 0 && <span className="triggers__tab-count">{cravings.length}</span>}
        </button>
        <button onClick={() => setActiveTab('cigarettes')}
          className={`triggers__tab-btn ${activeTab === 'cigarettes' ? 'triggers__tab-btn--active' : 'triggers__tab-btn--inactive'}`}>
          <Icon name="AlertCircle" size={15} color={activeTab === 'cigarettes' ? '#E05252' : 'var(--color-muted)'} />
          Cigarros {cigarettes.length > 0 && <span className="triggers__tab-count triggers__tab-count--danger">{cigarettes.length}</span>}
        </button>
      </div>

      {/* ── Insight: donut + grid ─────────────────────── */}
      {(() => {
        const isC        = activeTab === 'cravings';
        const src        = isC ? sortedCravingTypes : cigTimeOfDayCounts;
        const total      = isC ? cravings.length : cigarettes.length;
        const chartTitle = isC ? 'Gatilhos' : 'Horário do dia';
        if (src.length === 0) return null;
        return (
          <Card className="card--primary-light-bg card--mb-24">
            <div className="triggers__insight-header">
              <Icon name={isC ? 'BarChart3' : 'Clock'} size={16} color="var(--color-primary)" />
              <span className="triggers__insight-title">{chartTitle}</span>
              {isC && hasTypeFilter && (
                <button className="triggers__clear-btn" onClick={() => setSelectedTypes(new Set())}>
                  <Icon name="X" size={12} /> Limpar
                </button>
              )}
              <span className="triggers__insight-total">
                {isC && hasTypeFilter ? `${activeList.length} de ${total}` : `${total} registro${total !== 1 ? 's' : ''}`}
              </span>
            </div>
            <div className="triggers__insight-body">
              <DonutChart segments={src} total={total} />
              <div className="triggers__breakdown-grid">
                {src.map(([ctx, count]) => {
                  const pct     = Math.round((count / total) * 100);
                  const active  = isC && selectedTypes.has(ctx);
                  const dimmed  = isC && hasTypeFilter && !active;
                  const delta   = isC ? weekDelta(ctx) : null;
                  const typeClass = getTypeColorClass(ctx, isC);
                  return (
                    <button key={ctx} onClick={() => isC && toggleType(ctx)}
                      className={`triggers__breakdown-item ${typeClass} ${active ? 'triggers__breakdown-item--active' : ''} ${dimmed ? 'triggers__breakdown-item--dimmed' : ''} ${!isC ? 'triggers__breakdown-item--static' : ''}`}>
                      <div className="triggers__breakdown-item-header">
                        <span className="triggers__breakdown-item-label">{ctx}</span>
                        <span className={`triggers__breakdown-item-pct${delta ? ' triggers__breakdown-tooltip' : ''}`} data-tooltip={delta || undefined}>
                          {pct}%
                        </span>
                      </div>
                      <div className="triggers__breakdown-item-bar-wrap">
                        <progress className="triggers__breakdown-item-bar" value={pct} max="100" />
                      </div>
                      <span className="triggers__breakdown-item-count">{count} vez{count !== 1 ? 'es' : ''}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        );
      })()}

      {/* ── Toolbar ──────────────────────────────────────── */}
      <div className="triggers__toolbar">
        <div className="triggers__search-wrap">
          <Icon name="Search" size={14} color="var(--color-muted)" />
          <input
            type="text"
            className="triggers__search"
            placeholder="Buscar por gatilho ou nota..."
            value={searchQuery}
            onChange={ev => setSearchQuery(ev.target.value)}
          />
          {searchQuery && (
            <button className="triggers__search-clear" onClick={() => setSearchQuery('')}>
              <Icon name="X" size={12} color="var(--color-muted)" />
            </button>
          )}
        </div>

        <span className="triggers__toolbar-sep" />

        <div className="triggers__date-chips">
          {[
            { value: 'hoje',   label: 'Hoje'    },
            { value: '7dias',  label: '7 dias'  },
            { value: '30dias', label: '30 dias' },
            { value: 'todos',  label: 'Todos'   },
          ].map(({ value, label }) => (
            <button key={value}
              className={`triggers__date-chip ${filterPeriod === value ? 'triggers__date-chip--active' : ''}`}
              onClick={() => setFilterPeriod(value)}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'cravings' && <>
          <span className="triggers__toolbar-sep" />
          <select value={filterIntensity} onChange={ev => setFilterIntensity(ev.target.value)} className="triggers__select triggers__select--inline">
            <option value="todos">Intensidade</option>
            {[1,2,3,4,5].map(v => <option key={v} value={v}>{['Fraco','Leve','Médio','Forte','Intenso'][v-1]}</option>)}
          </select>
        </>}

        <span className="triggers__toolbar-sep" />

        <div className={`triggers__view-toggle triggers__view-toggle--${viewMode}`}>
          <button onClick={() => setViewMode('grid')}
            className={`triggers__view-btn ${viewMode === 'grid' ? 'triggers__view-btn--active' : ''}`}>
            <Icon name="LayoutGrid" size={15} />
            <span className="triggers__view-label">Cards</span>
          </button>
          <button onClick={() => setViewMode('list')}
            className={`triggers__view-btn ${viewMode === 'list' ? 'triggers__view-btn--active' : ''}`}>
            <Icon name="List" size={15} />
            <span className="triggers__view-label">Lista</span>
          </button>
        </div>
      </div>

      {/* ── Conteúdo ─────────────────────────────── */}
      {loading ? (
        <p className="triggers__empty-message">Carregando registros...</p>
      ) : activeList.length === 0 ? (
        <Card className="triggers__empty-card">
          <Icon name={activeTab === 'cravings' ? 'Flame' : 'AlertCircle'} size={32} color="var(--color-text-secondary)" />
          <p className="triggers__empty-card-message">
            {(activeTab === 'cravings' ? cravings : cigarettes).length === 0
              ? activeTab === 'cravings'
                ? 'Nenhum desejo registrado ainda. Use "Registrar Desejo" na barra lateral.'
                : 'Nenhum cigarro registrado. Continue assim!'
              : 'Nenhum registro com os filtros selecionados.'}
          </p>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="triggers__grid">
          {activeList.map(e => {
            const typeClass = getTypeColorClass(e.context, activeTab === 'cigarettes');
            return (
              <Card key={e.id} className={`card--pad-sm trigger-entry-card ${typeClass}`}>
                <div className="trigger-entry__meta">
                  <span className="trigger-entry__date">{formatDate(e.occurredAt || e.recordedAt)}</span>
                  <div className="trigger-entry__meta-right">
                    {activeTab === 'cravings' ? (
                      <div className="trigger-entry__dots">
                        {[1,2,3,4,5].map(v => (
                          <div key={v} className={`trigger-entry__dot ${v <= e.intensity ? 'trigger-entry__dot--filled' : 'trigger-entry__dot--empty'}`} />
                        ))}
                      </div>
                    ) : (
                      <span className="trigger-entry__type-badge trigger-entry__type-badge--cigarette">Cigarro</span>
                    )}
                    <button className="trigger-entry__delete" onClick={() => handleDelete(e.id, e.eventType || (activeTab === 'cravings' ? 'CRAVING' : 'CIGARETTE_SMOKED'))}>
                      <Icon name="Trash2" size={13} />
                    </button>
                  </div>
                </div>
                <h4 className="trigger-entry__title">{e.context}</h4>
                <span className="trigger-entry__type-badge">{e.context}</span>
                {e.note && <p className="trigger-entry__note">{e.note}</p>}
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="triggers__list">
          <div className="triggers__list-header">
            <span>Horário</span>
            <span>Gatilho</span>
            {activeTab === 'cravings' && <span>Intensidade</span>}
            <span>Status</span>
            <span></span>
          </div>
          {activeList.map(e => {
            const isCig     = activeTab === 'cigarettes';
            const eType     = e.eventType || (isCig ? 'CIGARETTE_SMOKED' : 'CRAVING');
            const typeClass = getTypeColorClass(e.context, isCig);
            return (
              <div key={e.id} className={`triggers__list-row ${typeClass}`}>
                <div className="triggers__list-time">
                  <span className="triggers__list-day">{formatDay(e.occurredAt || e.recordedAt)}</span>
                  <span className="triggers__list-hour">{formatTime(e.occurredAt || e.recordedAt)}</span>
                </div>
                <span className="trigger-entry__type-badge">{e.context}</span>
                {activeTab === 'cravings' && (
                  <div className="trigger-entry__dots trigger-entry__dots--sm">
                    {[1,2,3,4,5].map(v => (
                      <div key={v} className={`trigger-entry__dot ${v <= e.intensity ? 'trigger-entry__dot--filled' : 'trigger-entry__dot--empty'}`} />
                    ))}
                  </div>
                )}
                <span className={`triggers__list-status ${isCig ? 'triggers__list-status--smoked' : 'triggers__list-status--resisted'}`}>
                  {isCig ? 'Fumou' : 'Resistiu'}
                </span>
                <div className="triggers__list-actions">
                  <button className="triggers__list-action-btn triggers__list-delete" onClick={() => handleDelete(e.id, eType)} title="Remover">
                    <Icon name="Trash2" size={13} color="var(--color-muted)" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
