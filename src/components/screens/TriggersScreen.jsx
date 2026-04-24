import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';

export const TriggersScreen = () => {
  const [filterPeriod, setFilterPeriod] = React.useState('todos');
  const [filterType, setFilterType] = React.useState('todos');
  const [filterIntensity, setFilterIntensity] = React.useState('todos');
  const [showFilters, setShowFilters] = React.useState(false);

  const entries = [
    { date: 'HOJE, 14:30', title: 'Estresse no trabalho', type: 'Ansiedade', intensity: 4, note: 'Reunião longa com o cliente. Senti muita necessidade de sair...' },
    { date: 'HOJE, 08:15', title: 'Após o café', type: 'Hábito', intensity: 3, note: 'Associação muito forte. Consegui substituir por um copo d\'água.' },
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

  // Pattern analysis
  const typeCounts = {};
  entries.forEach(e => { typeCounts[e.type] = (typeCounts[e.type] || 0) + 1; });
  const topType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];
  const topPct = Math.round((topType[1] / entries.length) * 100);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <PageTitle title="Diário de Gatilhos" subtitle="Reconhecer é o primeiro passo. Registre e compreenda seus momentos de desejo." />
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
          <Icon name="Plus" size={16} color="#fff" />Novo Registro
        </button>
      </div>

      {/* Pattern insight */}
      <Card style={{ marginBottom: 24, background: 'var(--color-primary-light)', border: '1px solid rgba(34,151,107,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="BarChart3" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-primary-dark)' }}>Seu gatilho mais frequente é {topType[0]}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{topPct}% dos seus registros — os momentos de {topType[0].toLowerCase()} são os que mais pedem atenção</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 32, fontWeight: 700, color: 'var(--color-primary)' }}>{topPct}%</div>
        </div>
      </Card>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => setShowFilters(!showFilters)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1.5px solid #E5E7EB', background: showFilters ? 'var(--color-primary-light)' : '#fff', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', fontWeight: 500, color: showFilters ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)' }}>
          <Icon name="Filter" size={14} />Filtros
        </button>
        {showFilters && (
          <>
            <select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 13, fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
              <option value="todos">Todos os períodos</option><option value="hoje">Hoje</option><option value="semana">Esta semana</option><option value="mes">Este mês</option>
            </select>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 13, fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
              <option value="todos">Todos os tipos</option>{Object.keys(typeColors).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={filterIntensity} onChange={e => setFilterIntensity(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 13, fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
              <option value="todos">Qualquer intensidade</option>{[1,2,3,4,5].map(v => <option key={v} value={v}>{v} — {['Fraco','Leve','Médio','Forte','Intenso'][v-1]}</option>)}
            </select>
          </>
        )}
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map((e, i) => (
          <Card key={i} style={{ padding: 20, borderLeft: `3px solid ${typeColors[e.type] || '#999'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{e.date}</span>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(v => <div key={v} style={{ width: 8, height: 8, borderRadius: '50%', background: v <= e.intensity ? (typeColors[e.type] || '#999') : '#E5E7EB' }}></div>)}
              </div>
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: 16 }}>{e.title}</h4>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 12, background: '#F5F6F8', fontSize: 12, color: typeColors[e.type] || '#999', fontWeight: 500 }}>{e.type}</span>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '10px 0 0', lineHeight: 1.5 }}>{e.note}</p>
          </Card>
        ))}
      </div>
    </>
  );
};
