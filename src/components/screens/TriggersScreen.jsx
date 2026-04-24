import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';
import '../../styles/screens/TriggersScreen.css';

export const TriggersScreen = () => {
  const [filterPeriod, setFilterPeriod] = React.useState('todos');
  const [filterType, setFilterType] = React.useState('todos');
  const [filterIntensity, setFilterIntensity] = React.useState('todos');
  const [showFilters, setShowFilters] = React.useState(false);

  const entries = [
    { date: 'HOJE, 14:30', title: 'Estresse no trabalho', type: 'Ansiedade', intensity: 4, note: 'Reunião longa com o cliente. Senti muita necessidade de sair...' },
    { date: 'HOJE, 08:15', title: 'Após o café', type: 'Hábito', intensity: 3, note: "Associação muito forte. Consegui substituir por um copo d'água." },
    { date: 'ONTEM, 20:00', title: 'Fim do dia', type: 'Cansaço', intensity: 5, note: 'Cheguei em casa exausto. O desejo de recompensa foi muito...' },
    { date: 'ONTEM, 12:45', title: 'Pós-almoço', type: 'Social', intensity: 2, note: 'Colegas foram fumar. Fiquei na mesa finalizando a sobremesa.' },
    { date: 'ANTEONTEM, 09:00', title: 'Manhã difícil', type: 'Ansiedade', intensity: 4, note: 'Acordei já sentindo vontade. Fiz a respiração 4-7-8.' },
  ];

  const typeColors = { Ansiedade: '#EF4444', Hábito: '#F59E0B', Cansaço: '#8B5CF6', Social: '#3B82F6', Tédio: '#6B7280', Estresse: '#EC4899' };

  const filtered = entries.filter(e => {
    if (filterType !== 'todos' && e.type !== filterType) return false;
    if (filterIntensity !== 'todos' && e.intensity !== parseInt(filterIntensity)) return false;
    return true;
  });

  const typeCounts = {};
  entries.forEach(e => { typeCounts[e.type] = (typeCounts[e.type] || 0) + 1; });
  const topType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];
  const topPct = Math.round((topType[1] / entries.length) * 100);

  return (
    <>
      <div className="triggers__header-row">
        <PageTitle title="Diário de Gatilhos" subtitle="Reconhecer é o primeiro passo. Registre e compreenda seus momentos de desejo." />
        <button className="triggers__new-btn">
          <Icon name="Plus" size={16} color="#fff" />Novo Registro
        </button>
      </div>

      <Card className="card--primary-light-bg card--mb-24">
        <div className="triggers__insight">
          <div className="triggers__insight-icon">
            <Icon name="BarChart3" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <div className="triggers__insight-title">Seu gatilho mais frequente é {topType[0]}</div>
            <div className="triggers__insight-sub">{topPct}% dos seus registros — os momentos de {topType[0].toLowerCase()} são os que mais pedem atenção</div>
          </div>
          <div className="triggers__insight-pct">{topPct}%</div>
        </div>
      </Card>

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
              {Object.keys(typeColors).map(t => <option key={t} value={t}>{t}</option>)}
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

      <div className="triggers__grid">
        {filtered.map((e, i) => (
          <Card
            key={i}
            className="card--pad-sm trigger-entry-card"
            style={{ '--type-color': typeColors[e.type] || '#999' }}
          >
            <div className="trigger-entry__meta">
              <span className="trigger-entry__date">{e.date}</span>
              <div className="trigger-entry__dots">
                {[1, 2, 3, 4, 5].map(v => (
                  <div
                    key={v}
                    className={`trigger-entry__dot ${v <= e.intensity ? 'trigger-entry__dot--filled' : 'trigger-entry__dot--empty'}`}
                    style={v <= e.intensity ? { '--dot-color': typeColors[e.type] || '#999' } : undefined}
                  />
                ))}
              </div>
            </div>
            <h4 className="trigger-entry__title">{e.title}</h4>
            <span className="trigger-entry__type-badge">{e.type}</span>
            <p className="trigger-entry__note">{e.note}</p>
          </Card>
        ))}
      </div>
    </>
  );
};
