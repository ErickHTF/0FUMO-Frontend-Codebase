import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';
import { Events } from '../../lib/api';
import '../../styles/screens/TriggersScreen.css';

const TYPE_COLORS = {
  Ansiedade: '#EF4444',
  Hábito: '#F59E0B',
  Cansaço: '#8B5CF6',
  Social: '#3B82F6',
  Tédio: '#6B7280',
  Estresse: '#EC4899',
};

function formatEventDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const eventDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (eventDay.getTime() === today.getTime()) return `HOJE, ${time}`;
  if (eventDay.getTime() === yesterday.getTime()) return `ONTEM, ${time}`;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase() + `, ${time}`;
}

function isInPeriod(isoString, period) {
  if (period === 'todos') return true;
  const date = new Date(isoString);
  const now = new Date();
  if (period === 'hoje') {
    return date.toDateString() === now.toDateString();
  }
  if (period === 'semana') {
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  }
  if (period === 'mes') {
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }
  return true;
}

export const TriggersScreen = () => {
  const [entries, setEntries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filterPeriod, setFilterPeriod] = React.useState('todos');
  const [filterType, setFilterType] = React.useState('todos');
  const [filterIntensity, setFilterIntensity] = React.useState('todos');
  const [showFilters, setShowFilters] = React.useState(false);

  React.useEffect(() => {
    Events.list('CRAVING')
      .then(setEntries)
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = entries.filter(e => {
    if (!isInPeriod(e.occurredAt || e.recordedAt, filterPeriod)) return false;
    if (filterType !== 'todos' && e.context !== filterType) return false;
    if (filterIntensity !== 'todos' && e.intensity !== parseInt(filterIntensity)) return false;
    return true;
  });

  const typeCounts = {};
  entries.forEach(e => {
    if (e.context) typeCounts[e.context] = (typeCounts[e.context] || 0) + 1;
  });
  const topEntry = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];
  const topPct = topEntry ? Math.round((topEntry[1] / entries.length) * 100) : 0;

  return (
    <>
      <div className="triggers__header-row">
        <PageTitle title="Diário de Gatilhos" subtitle="Reconhecer é o primeiro passo. Registre e compreenda seus momentos de desejo." />
        <button className="triggers__new-btn" onClick={() => window.dispatchEvent(new CustomEvent('open-craving-modal'))}>
          <Icon name="Plus" size={16} color="#fff" />Novo Registro
        </button>
      </div>

      {topEntry && (
        <Card className="card--primary-light-bg card--mb-24">
          <div className="triggers__insight">
            <div className="triggers__insight-icon">
              <Icon name="BarChart3" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <div className="triggers__insight-title">Seu gatilho mais frequente é {topEntry[0]}</div>
              <div className="triggers__insight-sub">{topPct}% dos seus registros — os momentos de {topEntry[0].toLowerCase()} pedem mais atenção</div>
            </div>
            <div className="triggers__insight-pct">{topPct}%</div>
          </div>
        </Card>
      )}

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
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="triggers__select">
              <option value="todos">Todos os tipos</option>
              {Object.keys(TYPE_COLORS).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={filterIntensity} onChange={e => setFilterIntensity(e.target.value)} className="triggers__select">
              <option value="todos">Qualquer intensidade</option>
              {[1, 2, 3, 4, 5].map(v => (
                <option key={v} value={v}>{v} — {['Fraco', 'Leve', 'Médio', 'Forte', 'Intenso'][v - 1]}</option>
              ))}
            </select>
          </>
        )}
      </div>

      {loading ? (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Carregando registros...</p>
      ) : filtered.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '40px' }}>
          <Icon name="Target" size={32} color="var(--color-text-secondary)" />
          <p style={{ marginTop: '12px', color: 'var(--color-text-secondary)' }}>
            {entries.length === 0
              ? 'Nenhum registro ainda. Use o botão "Registrar Desejo" para começar.'
              : 'Nenhum registro encontrado com os filtros selecionados.'}
          </p>
        </Card>
      ) : (
        <div className="triggers__grid">
          {filtered.map(e => (
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
      )}
    </>
  );
};
