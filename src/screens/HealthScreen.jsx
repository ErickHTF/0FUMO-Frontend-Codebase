import React from 'react';
import { Icon } from '../lib/icons';
import { Card, PageTitle } from '../components/ui/Card';
import { getStoredUser } from '../lib/api';
import './HealthScreen.css';

function getElapsed(isoString) {
  if (!isoString) return { hours: 0, days: 0 };
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return { hours, days: Math.floor(hours / 24) };
}

export const HealthScreen = () => {
  const user = getStoredUser();
  const startDate = user?.quitDate || user?.createdAt;
  const { hours, days } = getElapsed(startDate);

  const bloodPct    = Math.min(100, Math.round((hours / 8)   * 100));
  const breathPct   = Math.min(100, Math.round((days  / 14)  * 100));
  const tastePct    = Math.min(100, Math.round((days  / 30)  * 100));
  const heartRisk   = Math.min(50,  Math.round((days  / 365) * 50));

  const healthItems = [
    {
      icon: 'Droplets', label: 'Seu sangue está mais limpo',
      pct: bloodPct, color: 'var(--color-primary)', iconVariant: 'primary',
      how: `Após 8h o monóxido de carbono sai do sangue. ${hours < 8 ? `Faltam ${8 - hours}h.` : `Concluído há ${hours - 8}h.`}`,
    },
    {
      icon: 'Wind', label: 'Sua respiração está mais leve',
      pct: breathPct, color: '#3B82F6', iconVariant: 'blue',
      how: `Capacidade pulmonar melhora progressivamente em 2 semanas. Você está no dia ${days}.`,
    },
    {
      icon: 'Smile', label: 'Sabores e aromas voltando',
      pct: tastePct, color: '#F59E0B', iconVariant: 'amber',
      how: `Nervos sensoriais se regeneram em ~30 dias. Progresso estimado: ${Math.min(tastePct, 99)}%.`,
    },
  ];

  const milestones = [
    { time: '20 min',    label: 'Pressão e batimentos voltam ao normal', done: hours >= 1 },
    { time: '8 horas',   label: 'Seu sangue está mais limpo',            done: hours >= 8 },
    { time: '48 horas',  label: 'Sabores e aromas começam a voltar',     done: hours >= 48 },
    { time: '2 semanas', label: 'Sua respiração fica mais fácil',        done: days >= 14 },
    { time: '1 mês',     label: 'Pulmões começam a se reparar',          done: days >= 30 },
    { time: '1 ano',     label: 'Risco cardíaco cai pela metade',        done: days >= 365 },
  ];

  const circumference = 2 * Math.PI * 62;
  const dashOffset = circumference - (heartRisk / 50) * circumference;

  return (
    <>
      <PageTitle
        title="Recuperação Física"
        subtitle="Acompanhe como seu corpo está se curando dia após dia. Cada pequena porcentagem é uma grande vitória."
      />
      <div className="health__grid">
        {healthItems.map((item, i) => (
          <Card key={i} style={{ '--metric-color': item.color }}>
            <div className="health-item__header">
              <div className={`health-item__icon health-item__icon--${item.iconVariant}`}>
                <Icon name={item.icon} size={20} color={item.color} />
              </div>
              <span className="health-item__pct">{item.pct >= 100 ? '100' : item.pct}%</span>
            </div>
            <div className="health-item__label">{item.label}</div>
            <div className="progress-bar progress-bar--spaced">
              <div
                className="progress-bar__fill"
                style={{ '--progress-width': `${Math.min(item.pct, 100)}%`, '--progress-color': 'var(--metric-color)' }}
              />
            </div>
            <div className="health-item__note">
              <Icon name="Lightbulb" size={12} color="var(--color-muted)" /> {item.how}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="heart-card__body">
          <div className="heart-card__text">
            <div className="heart-card__badge">
              <Icon name="Heart" size={12} color="#EF4444" />
              Seu coração agradece
            </div>
            <h2 className="heart-card__title">Risco de Infarto Reduzido em {heartRisk}%</h2>
            <p className="heart-card__desc">
              Após 1 ano sem fumar o risco cai pela metade. Seu coração já começa a sentir a diferença.
            </p>
            <div className="heart-card__source">
              <Icon name="Lightbulb" size={14} color="var(--color-muted)" />
              <span>Cálculo baseado em estudos da OMS. Meta de 50% atingida com 1 ano completo.</span>
            </div>
          </div>
          <div className="heart-card__chart">
            <svg width="140" height="140" viewBox="0 0 140 140" className="heart-card__chart-svg">
              <circle
                cx="70" cy="70" r="62"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="8"
                strokeDasharray={`${(heartRisk / 50) * circumference} ${circumference}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="heart-card__chart-inner">
              <Icon name="Heart" size={24} color="#EF4444" />
              <div className="heart-card__chart-value">-{heartRisk}%</div>
              <div className="heart-card__chart-label">Risco</div>
            </div>
          </div>
        </div>
        <div className="heart-card__milestone">
          <Icon name="Star" size={16} color="var(--color-primary)" />
          <span className="heart-card__milestone-text">
            {days >= 365
              ? <><strong>Marco atingido!</strong> Risco cardíaco reduzido em 50%</>
              : <><strong>Próximo Marco: 1 Ano</strong> — Risco cardíaco cai pela metade ({365 - days} dias restantes)</>}
          </span>
        </div>
      </Card>

      <Card className="timeline-card">
        <h3 className="timeline-card__title">Linha do Tempo da Recuperação</h3>
        <div className="timeline">
          {milestones.map((step, i, arr) => (
            <div key={i} className="timeline__row">
              <div className="timeline__connector">
                <div className={`timeline__dot ${step.done ? 'timeline__dot--done' : 'timeline__dot--pending'}`} />
                {i < arr.length - 1 && (
                  <div className={`timeline__line ${step.done ? 'timeline__line--done' : 'timeline__line--pending'}`} />
                )}
              </div>
              <div className="timeline__content">
                <div className={`timeline__time ${step.done ? 'timeline__time--done' : 'timeline__time--pending'}`}>{step.time}</div>
                <div className={`timeline__label ${step.done ? 'timeline__label--done' : 'timeline__label--pending'}`}>{step.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
