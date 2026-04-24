import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';

export const CommunityScreen = () => {
  const [tab, setTab] = React.useState('feed');

  const tabs = [
    { id: 'feed', label: 'Feed', icon: 'MessageCircle' },
    { id: 'conquistas', label: 'Conquistas', icon: 'Trophy' },
    { id: 'ranking', label: 'Ranking', icon: 'BarChart3' },
  ];

  const feedPosts = [
    { name: 'João Silva', time: '2 horas atrás', avatar: 'J', color: 'var(--color-primary)', achievement: '7 dias de liberdade!', text: 'João completou 7 dias sem fumar. Economizou R$ 105,00 e sua respiração já melhorou.', reactions: [{ icon: 'ThumbsUp', label: 'Força!', count: 8 }, { icon: 'Star', label: 'Inspirador', count: 3 }] },
    { name: 'Maria Costa', time: '4 horas atrás', avatar: 'M', color: '#3B82F6', achievement: 'Respirou Fundo!', text: 'Maria resistiu a um gatilho de estresse após uma reunião difícil usando a respiração 4-7-8.', reactions: [{ icon: 'ThumbsUp', label: 'Força!', count: 2 }, { icon: 'Star', label: 'Inspirador', count: 5 }] },
    { name: 'Carlos Mendes', time: '5 horas atrás', avatar: 'C', color: '#F59E0B', text: 'Hoje a manhã foi difícil, bateu aquela vontade forte junto com o café. Mas lembrei dos motivos que me fizeram começar. Bebi água gelada, dei uma volta e a vontade passou. Seguimos firmes!', reactions: [{ icon: 'ThumbsUp', label: 'Força!', count: 12 }] },
  ];

  return (
    <>
      <PageTitle title="Community" subtitle="Together we are stronger. Celebrate victories and find your safe space." />
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#F5F6F8', borderRadius: 10, padding: 4 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
            background: tab === t.id ? '#fff' : 'transparent',
            color: tab === t.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            boxShadow: tab === t.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
          }}>
            <Icon name={t.icon} size={16} />{t.label}
          </button>
        ))}
      </div>

      {tab === 'feed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Global challenge */}
          <Card style={{ background: 'var(--color-primary)', color: '#fff', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.8, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="Globe" size={12} color="#fff" /> Desafio Global
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: 20 }}>Pulmão Limpo</h3>
                <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 16px' }}>Nossa meta comunitária: cada dia sem fumar conta para o progresso coletivo.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20, fontWeight: 700 }}>7.452</span>
                  <span style={{ fontSize: 13, opacity: 0.7 }}>/ 10.000 dias</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)', marginTop: 8, width: 240 }}>
                  <div style={{ height: '100%', borderRadius: 3, background: '#fff', width: '74.5%' }}></div>
                </div>
              </div>
              <button style={{ padding: '14px 28px', borderRadius: 12, border: 'none', background: '#fff', color: 'var(--color-primary-dark)', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Juntar-se</button>
            </div>
          </Card>
          {feedPosts.map((post, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: post.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16 }}>{post.avatar}</div>
                <div><div style={{ fontWeight: 600, fontSize: 14 }}>{post.name}</div><div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{post.time}</div></div>
              </div>
              {post.achievement && (
                <div style={{ background: 'var(--color-primary-light)', borderRadius: 10, padding: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon name="Trophy" size={20} color="var(--color-primary)" />
                  <div><div style={{ fontWeight: 600, fontSize: 14 }}>{post.achievement}</div><div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{post.text}</div></div>
                </div>
              )}
              {!post.achievement && <p style={{ fontSize: 14, color: 'var(--color-text-primary)', lineHeight: 1.6, margin: '0 0 12px' }}>{post.text}</p>}
              <div style={{ display: 'flex', gap: 8 }}>
                {post.reactions.map((r, j) => (
                  <button key={j} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 20, border: '1px solid #E5E7EB', background: '#fff', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--color-text-secondary)' }}>
                    <Icon name={r.icon} size={14} />{r.label} {r.count}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'conquistas' && (
        <div>
          <Card style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 17, margin: '0 0 20px' }}>Suas Conquistas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { label: 'Café de Graça', unlocked: true, color: '#3B82F6' },
                { label: 'Jantar Fora', unlocked: true, color: '#F59E0B' },
                { label: 'Iniciante Zen', unlocked: true, color: 'var(--color-primary)' },
                { label: 'Mestre Zen', unlocked: false, color: '#9CA3AF' },
              ].map((a, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: a.unlocked ? a.color : '#F0F1F3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', opacity: a.unlocked ? 1 : 0.5 }}>
                    {a.unlocked ? <Icon name="Award" size={24} color="#fff" /> : <Icon name="Lock" size={20} color="#999" />}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: a.unlocked ? 'var(--color-text-primary)' : '#999' }}>{a.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'ranking' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { title: 'Mestres Zen', subtitle: 'Mais sessões de relaxamento (Semana)', metric: 'SESSÕES', data: [{ name: 'Marina S.', initial: 'M', color: '#3B82F6', value: 24 }, { name: 'Você', initial: 'V', color: 'var(--color-primary)', value: 18, you: true }, { name: 'Rafael C.', initial: 'R', color: '#F59E0B', value: 15 }] },
            { title: 'Caçadores de Gatilhos', subtitle: 'Mapeando desejos (Semana)', metric: 'REGISTROS', data: [{ name: 'Carlos A.', initial: 'C', color: '#6B7280', value: 32 }, { name: 'Luciana T.', initial: 'L', color: '#EC4899', value: 28 }, { name: 'Você', initial: 'V', color: 'var(--color-primary)', value: 12, you: true, rank: 8 }] },
          ].map((board, bi) => (
            <Card key={bi}>
              <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>{board.title}</h3>
              <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 20 }}>{board.subtitle}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {board.data.map((p, pi) => (
                  <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: p.you ? '8px 10px' : '0', borderRadius: 8, background: p.you ? 'var(--color-primary-light)' : 'transparent' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#999', width: 16 }}>{p.rank || pi + 1}</span>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 14 }}>{p.initial}</div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: p.you ? 600 : 400 }}>{p.name}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-primary)' }}>{p.value}</div>
                      <div style={{ fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: 0.5 }}>{board.metric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
