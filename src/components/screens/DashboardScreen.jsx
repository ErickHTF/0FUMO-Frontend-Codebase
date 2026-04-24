import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';
import '../../styles/screens/DashboardScreen.css';

export const DashboardScreen = () => {
  const days = 12, hours = 4, totalHours = 288 + 4;
  const money = 245, cigs = 124;

  return (
    <>
      <PageTitle title="Olá, João" subtitle="Um dia de cada vez. Você está indo muito bem." />
      <div className="dashboard__grid">
        <Card className="progress-card">
          <div className="progress-card__label">Seu Progresso</div>
          <div className="progress-card__time">
            <span className="progress-card__number">{days}</span>
            <span className="progress-card__unit">dias</span>
            <span className="progress-card__number--spaced">{hours}</span>
            <span className="progress-card__unit">hrs</span>
          </div>
          <div className="progress-card__sub">Livre do cigarro</div>
          <div className="progress-card__badge">
            <Icon name="Clock" size={14} color="var(--color-primary)" />
            {totalHours} horas totais
          </div>
        </Card>

        <div className="dashboard__side-col">
          <Card>
            <div className="stat-card__header">
              <div className="stat-card__icon stat-card__icon--primary">
                <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
              </div>
              <span className="stat-card__label">Economizado</span>
            </div>
            <div className="stat-card__value">R$ {money},00</div>
            <div className="stat-card__desc">O suficiente para um jantar especial</div>
          </Card>

          <Card>
            <div className="stat-card__header">
              <div className="stat-card__icon stat-card__icon--danger">
                <Icon name="Zap" size={16} color="#EF4444" />
              </div>
              <span className="stat-card__label">Cigarros Evitados</span>
            </div>
            <div className="stat-card__value">{cigs}</div>
            <div className="stat-card__desc">Seus pulmões agradecem</div>
          </Card>
        </div>
      </div>

      <div className="dashboard__bottom-grid">
        <Card>
          <div className="recovery__header">
            <Icon name="Heart" size={18} color="#EF4444" />
            <h3 className="recovery__title">Recuperação Física</h3>
          </div>
          {[
            { label: 'Seu sangue está mais limpo', pct: 100, desc: 'Baseado em 12 dias sem fumar' },
            { label: 'Sabores e aromas voltando', pct: 80, desc: 'Nervos se regenerando' },
          ].map((item, i) => (
            <div key={i} className="recovery__item">
              <div className="recovery__item-row">
                <span>{item.label}</span>
                <span className={`recovery__item-status ${item.pct === 100 ? 'recovery__item-status--done' : 'recovery__item-status--partial'}`}>
                  {item.pct === 100 ? 'Normalizado' : `${item.pct}%`}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{
                    '--progress-width': `${item.pct}%`,
                    '--progress-color': item.pct === 100 ? 'var(--color-primary)' : '#F59E0B',
                  }}
                />
              </div>
              <div className="recovery__item-desc">{item.desc}</div>
            </div>
          ))}
        </Card>

        <Card>
          <div className="achievements__header">
            <div className="achievements__header-left">
              <Icon name="Trophy" size={18} color="#F59E0B" />
              <h3 className="achievements__title">Conquistas</h3>
            </div>
            <span className="achievements__see-all">Ver todas</span>
          </div>
          <div className="achievements__row">
            {[
              { label: '1 Dia Limpo', unlocked: true, color: 'var(--color-primary)' },
              { label: '1 Semana Limpa', unlocked: true, color: '#3B82F6' },
              { label: '1 Mês Limpo', unlocked: false, color: '#9CA3AF' },
            ].map((a, i) => (
              <div key={i} className="achievement-badge">
                <div
                  className={`achievement-badge__circle${!a.unlocked ? ' achievement-badge__circle--locked' : ''}`}
                  style={{ '--badge-color': a.unlocked ? a.color : '#F0F1F3' }}
                >
                  {a.unlocked
                    ? <Icon name="Award" size={24} color="#fff" />
                    : <Icon name="Lock" size={20} color="#999" />}
                </div>
                <div className={`achievement-badge__label ${a.unlocked ? 'achievement-badge__label--unlocked' : 'achievement-badge__label--locked'}`}>
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};
