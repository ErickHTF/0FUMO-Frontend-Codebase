import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';
import { Events } from '../../lib/api';
import '../../styles/screens/TriggersScreen.css';

const TYPE_COLORS = {
  Ansiedade: '#EF4444',
  Hábito:    '#F59E0B',
  Cansaço:   '#8B5CF6',
  Social:    '#3B82F6',
  Tédio:     '#6B7280',
  Estresse:  '#EC4899',
};

function formatEventDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now  = new Date();
  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const today     = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const eventDay  = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (eventDay.getTime() === today.getTime())     return `HOJE, ${time}`;
  if (eventDay.getTime() === yesterday.getTime()) return `ONTEM, ${time}`;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase() + `, ${time}`;
}

function isInPeriod(isoString, period) {
  if (period === 'todos') return true;
  const date = new Date(isoString);
  const now  = new Date();
  if (period === 'hoje')  return date.toDateString() === now.toDateString();
  if (period === 'semana') { const w = new Date(now); w.setDate(w.getDate() - 7); return date >= w; }
  if (period === 'mes')   return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  return true;
}

export const TriggersScreen = () => {
  const [activeTab,      setActiveTab]      = React.useState('cravings');
  const [cravings,       setCravings]       = React.useState([]);
  const [cigarettes,     setCigarettes]     = React.useState([]);
  const [loading,        setLoading]        = React.useState(true);
  const [filterPeriod,   setFilterPeriod]   = React.useState('todos');
  const [selectedTypes,  setSelectedTypes]  = React.useState(new Set());
  const [filterIntensity,setFilterIntensity]= React.useState('todos');
  const [showFilters,    setShowFilters]    = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    Promise.all([Events.list('CRAVING'), Events.list('CIGARETTE_SMOKED')])
      .then(([c, s]) => { setCravings(c); setCigarettes(s); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Toggle um tipo: adiciona se não estava, remove se estava
  const toggleType = (context) => {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      next.has(context) ? next.delete(context) : next.add(context);
      return next;
    });
  };

  // Distribuição de gatilhos (sempre baseada em todos os cravings, sem filtro de tipo)
  const typeCounts = {};
  cravings.forEach(e => { if (e.context) typeCounts[e.context] = (typeCounts[e.context] || 0) + 1; });
  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const maxCount    = sortedTypes[0]?.[1] || 1;

  const filteredCravings = cravings.filter(e => {
    if (!isInPeriod(e.occurredAt || e.recordedAt, filterPeriod)) return false;
    if (selectedTypes.size > 0 && !selectedTypes.has(e.context))  return false;
    if (filterIntensity !== 'todos' && e.intensity !== parseInt(filterIntensity)) return false;
    return true;
  });

  const filteredCigarettes = cigarettes.filter(e => {
    if (!isInPeriod(e.occurredAt || e.recordedAt, filterPeriod)) return false;
    if (selectedTypes.size > 0 && !selectedTypes.has(e.context))  return false;
    return true;
  });

  const hasTypeFilter  = selectedTypes.size > 0;
  const someNotSelected = hasTypeFilter;

  return (
    <>
      <div className="triggers__header-row">
        <PageTitle title="Diário de Gatilhos" subtitle="Reconhecer é o primeiro passo. Registre e compreenda seus momentos." />
      </div>

      {/* ── Tabs ─────────────────────────────────────────── */}
      <div className="triggers__tabs">
        <button
          onClick={() => setActiveTab('cravings')}
          className={`triggers__tab-btn ${activeTab === 'cravings' ? 'triggers__tab-btn--active' : 'triggers__tab-btn--inactive'}`}
        >
          <Icon name="Flame" size={15} color={activeTab === 'cravings' ? 'var(--color-primary)' : 'var(--color-muted)'} />
          Desejos {cravings.length > 0 && <span className="triggers__tab-count">{cravings.length}</span>}
        </button>
        <button
          onClick={() => setActiveTab('cigarettes')}
          className={`triggers__tab-btn ${activeTab === 'cigarettes' ? 'triggers__tab-btn--active' : 'triggers__tab-btn--inactive'}`}
        >
          <Icon name="AlertCircle" size={15} color={activeTab === 'cigarettes' ? '#EF4444' : 'var(--color-muted)'} />
          Cigarros fumados {cigarettes.length > 0 && <span className="triggers__tab-count triggers__tab-count--danger">{cigarettes.length}</span>}
        </button>
      </div>

      {/* ── Breakdown interativo (só na tab desejos) ──────── */}
      {activeTab === 'cravings' && sortedTypes.length > 0 && (
        <Card className="card--primary-light-bg card--mb-24">
          <div className="triggers__insight-header">
            <Icon name="BarChart3" size={16} color="var(--color-primary)" />
            <span className="triggers__insight-title">Gatilhos</span>
            {hasTypeFilter && (
              <button className="triggers__clear-btn" onClick={() => setSelectedTypes(new Set())}>
                <Icon name="X" size={12} /> Limpar filtro
              </button>
            )}
            <span className="triggers__insight-total">
              {hasTypeFilter
                ? `${filteredCravings.length} de ${cravings.length}`
                : `${cravings.length} registro${cravings.length !== 1 ? 's' : ''}`}
            </span>
          </div>

          <div className="triggers__breakdown">
            {sortedTypes.map(([context, count]) => {
              const pct      = Math.round((count / cravings.length) * 100);
              const barWidth = Math.round((count / maxCount) * 100);
              const color    = TYPE_COLORS[context] || 'var(--color-muted)';
              const isActive = selectedTypes.has(context);
              const isDimmed = someNotSelected && !isActive;

              return (
                <button
                  key={context}
                  onClick={() => toggleType(context)}
                  className={`triggers__breakdown-row ${isActive ? 'triggers__breakdown-row--active' : ''} ${isDimmed ? 'triggers__breakdown-row--dimmed' : ''}`}
                  style={{ '--type-color': color }}
                >
                  <span className="triggers__breakdown-check">
                    {isActive && <Icon name="Check" size={11} color="#fff" />}
                  </span>
                  <span className="triggers__breakdown-label">{context}</span>
                  <div className="triggers__breakdown-bar-wrap">
                    <div
                      className="triggers__breakdown-bar"
                      style={{ width: `${barWidth}%`, background: color }}
                    />
                  </div>
                  <span className="triggers__breakdown-pct">{pct}%</span>
                  <span className="triggers__breakdown-count">{count}</span>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── Filtros complementares ─────────────────────────── */}
      <div className="triggers__filters">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`triggers__filter-toggle ${showFilters ? 'triggers__filter-toggle--active' : 'triggers__filter-toggle--inactive'}`}
        >
          <Icon name="Filter" size={14} />Filtros
        </button>
        {showFilters && (
          <>
            <select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)} className="triggers__select">
              <option value="todos">Todos os períodos</option>
              <option value="hoje">Hoje</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mês</option>
            </select>
            {activeTab === 'cravings' && (
              <select value={filterIntensity} onChange={e => setFilterIntensity(e.target.value)} className="triggers__select">
                <option value="todos">Qualquer intensidade</option>
                {[1, 2, 3, 4, 5].map(v => (
                  <option key={v} value={v}>{v} — {['Fraco', 'Leve', 'Médio', 'Forte', 'Intenso'][v - 1]}</option>
                ))}
              </select>
            )}
          </>
        )}
      </div>

      {/* ── Conteúdo ─────────────────────────────────────── */}
      {loading ? (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Carregando registros...</p>
      ) : activeTab === 'cravings' ? (
        filteredCravings.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '40px' }}>
            <Icon name="Flame" size={32} color="var(--color-text-secondary)" />
            <p style={{ marginTop: '12px', color: 'var(--color-text-secondary)' }}>
              {cravings.length === 0
                ? 'Nenhum desejo registrado ainda. Use "Registrar Desejo" na barra lateral.'
                : 'Nenhum registro com os filtros selecionados.'}
            </p>
          </Card>
        ) : (
          <div className="triggers__grid">
            {filteredCravings.map(e => (
              <Card
                key={e.id}
                className="card--pad-sm trigger-entry-card"
                style={{ '--type-color': TYPE_COLORS[e.context] || 'var(--color-muted)' }}
              >
                <div className="trigger-entry__meta">
                  <span className="trigger-entry__date">{formatEventDate(e.occurredAt || e.recordedAt)}</span>
                  <div className="trigger-entry__dots">
                    {[1, 2, 3, 4, 5].map(v => (
                      <div
                        key={v}
                        className={`trigger-entry__dot ${v <= e.intensity ? 'trigger-entry__dot--filled' : 'trigger-entry__dot--empty'}`}
                        style={v <= e.intensity ? { '--dot-color': TYPE_COLORS[e.context] || 'var(--color-muted)' } : undefined}
                      />
                    ))}
                  </div>
                </div>
                <h4 className="trigger-entry__title">{e.context}</h4>
                <span className="trigger-entry__type-badge">{e.context}</span>
                {e.note && <p className="trigger-entry__note">{e.note}</p>}
              </Card>
            ))}
          </div>
        )
      ) : (
        filteredCigarettes.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '40px' }}>
            <Icon name="AlertCircle" size={32} color="var(--color-text-secondary)" />
            <p style={{ marginTop: '12px', color: 'var(--color-text-secondary)' }}>
              {cigarettes.length === 0
                ? 'Nenhum cigarro registrado. Continue assim!'
                : 'Nenhum registro com os filtros selecionados.'}
            </p>
          </Card>
        ) : (
          <div className="triggers__grid">
            {filteredCigarettes.map(e => (
              <Card
                key={e.id}
                className="card--pad-sm trigger-entry-card"
                style={{ '--type-color': TYPE_COLORS[e.context] || '#EF4444' }}
              >
                <div className="trigger-entry__meta">
                  <span className="trigger-entry__date">{formatEventDate(e.occurredAt || e.recordedAt)}</span>
                  <span className="trigger-entry__type-badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
                    Cigarro fumado
                  </span>
                </div>
                {e.context && <h4 className="trigger-entry__title">{e.context}</h4>}
                {e.note && <p className="trigger-entry__note">{e.note}</p>}
              </Card>
            ))}
          </div>
        )
      )}
    </>
  );
};
