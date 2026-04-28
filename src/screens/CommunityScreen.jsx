import React from 'react';
import { Icon } from '../lib/icons';
import { Card, PageTitle } from '../components/ui/Card';
import './CommunityScreen.css';

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
      <div className="community__tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`community__tab-btn ${tab === t.id ? 'community__tab-btn--active' : 'community__tab-btn--inactive'}`}
          >
            <Icon name={t.icon} size={16} />{t.label}
          </button>
        ))}
      </div>

      {tab === 'feed' && (
        <div className="community__feed">
          <Card className="card--primary-bg">
            <div className="challenge__header">
              <div>
                <div className="challenge__eyebrow">
                  <Icon name="Globe" size={12} color="#fff" /> Desafio Global
                </div>
                <h3 className="challenge__title">Pulmão Limpo</h3>
                <p className="challenge__desc">Nossa meta comunitária: cada dia sem fumar conta para o progresso coletivo.</p>
                <div className="challenge__count-row">
                  <span className="challenge__count">7.452</span>
                  <span className="challenge__count-label">/ 10.000 dias</span>
                </div>
                <div className="challenge__progress">
                  <div className="challenge__progress-fill" />
                </div>
              </div>
              <button className="challenge__join-btn">Juntar-se</button>
            </div>
          </Card>

          {feedPosts.map((post, i) => (
            <Card key={i}>
              <div className="post__header">
                <div className="post__avatar" style={{ '--avatar-color': post.color }}>{post.avatar}</div>
                <div>
                  <div className="post__name">{post.name}</div>
                  <div className="post__time">{post.time}</div>
                </div>
              </div>
              {post.achievement && (
                <div className="post__achievement">
                  <Icon name="Trophy" size={20} color="var(--color-primary)" />
                  <div>
                    <div className="post__achievement-title">{post.achievement}</div>
                    <div className="post__achievement-text">{post.text}</div>
                  </div>
                </div>
              )}
              {!post.achievement && <p className="post__text">{post.text}</p>}
              <div className="post__reactions">
                {post.reactions.map((r, j) => (
                  <button key={j} className="post__reaction-btn">
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
          <Card className="card--mb-24">
            <h3 className="achievements-tab__title">Suas Conquistas</h3>
            <div className="achievements-grid">
              {[
                { label: 'Café de Graça', unlocked: true, color: '#3B82F6' },
                { label: 'Jantar Fora', unlocked: true, color: '#F59E0B' },
                { label: 'Iniciante Zen', unlocked: true, color: 'var(--color-primary)' },
                { label: 'Mestre Zen', unlocked: false, color: '#9CA3AF' },
              ].map((a, i) => (
                <div key={i} className="community-badge">
                  <div
                    className={`community-badge__circle${!a.unlocked ? ' community-badge__circle--locked' : ''}`}
                    style={{ '--badge-color': a.unlocked ? a.color : '#F0F1F3' }}
                  >
                    {a.unlocked ? <Icon name="Award" size={24} color="#fff" /> : <Icon name="Lock" size={20} color="#999" />}
                  </div>
                  <div className={`community-badge__label ${a.unlocked ? 'community-badge__label--unlocked' : 'community-badge__label--locked'}`}>
                    {a.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'ranking' && (
        <div className="ranking__grid">
          {[
            { title: 'Mestres Zen', subtitle: 'Mais sessões de relaxamento (Semana)', metric: 'SESSÕES', data: [{ name: 'Marina S.', initial: 'M', color: '#3B82F6', value: 24 }, { name: 'Você', initial: 'V', color: 'var(--color-primary)', value: 18, you: true }, { name: 'Rafael C.', initial: 'R', color: '#F59E0B', value: 15 }] },
            { title: 'Caçadores de Gatilhos', subtitle: 'Mapeando desejos (Semana)', metric: 'REGISTROS', data: [{ name: 'Carlos A.', initial: 'C', color: '#6B7280', value: 32 }, { name: 'Luciana T.', initial: 'L', color: '#EC4899', value: 28 }, { name: 'Você', initial: 'V', color: 'var(--color-primary)', value: 12, you: true, rank: 8 }] },
          ].map((board, bi) => (
            <Card key={bi}>
              <h3 className="ranking__board-title">{board.title}</h3>
              <div className="ranking__board-sub">{board.subtitle}</div>
              <div className="ranking__list">
                {board.data.map((p, pi) => (
                  <div key={pi} className={`ranking__row${p.you ? ' ranking__row--you' : ''}`}>
                    <span className="ranking__position">{p.rank || pi + 1}</span>
                    <div className="ranking__avatar" style={{ '--avatar-color': p.color }}>{p.initial}</div>
                    <span className={`ranking__name${p.you ? ' ranking__name--you' : ''}`}>{p.name}</span>
                    <div className="ranking__score">
                      <div className="ranking__score-value">{p.value}</div>
                      <div className="ranking__score-label">{board.metric}</div>
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
