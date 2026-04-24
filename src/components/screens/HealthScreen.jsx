import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';
import '../../styles/screens/HealthScreen.css';

export const HealthScreen = () => {
  const days = 12;
  const healthItems = [
    { icon: 'Droplets', label: 'Seu sangue está mais limpo', pct: 100, color: 'var(--color-primary)', iconVariant: 'primary', how: `Após 12 dias, o nível de monóxido no sangue volta ao normal. Baseado nos seus ${days} dias sem fumar.` },
    { icon: 'Wind', label: 'Sua respiração está mais leve', pct: 90, color: '#3B82F6', iconVariant: 'blue', how: `A capacidade pulmonar melhora ~5% por semana. Baseado nos seus ${days} dias sem fumar.` },
    { icon: 'Smile', label: 'Sabores e aromas voltando', pct: 70, color: '#F59E0B', iconVariant: 'amber', how: `Nervos sensoriais se regeneram em 2-4 semanas. Você está no dia ${days} — progresso estimado: 70%.` },
  ];

  return (
    <>
      <PageTitle title="Recuperação Física" subtitle="Acompanhe como seu corpo está se curando dia após dia. Cada pequena porcentagem é uma grande vitória." />
      <div className="health__grid">
        {healthItems.map((item, i) => (
          <Card key={i} style={{ '--metric-color': item.color }}>
            <div className="health-item__header">
              <div className={`health-item__icon health-item__icon--${item.iconVariant}`}>
                <Icon name={item.icon} size={20} color={item.color} />
              </div>
              <span className="health-item__pct">{item.pct}%</span>
            </div>
            <div className="health-item__label">{item.label}</div>
            <div className="progress-bar progress-bar--spaced">
              <div
                className="progress-bar__fill"
                style={{ '--progress-width': `${item.pct}%`, '--progress-color': 'var(--metric-color)' }}
              />
            </div>
            <div className="health-item__note">
              <Icon name="Lightbulb" size={12} color="#999" /> {item.how}
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
            <h2 className="heart-card__title">Risco de Infarto Reduzido em 20%</h2>
            <p className="heart-card__desc">
              Após 1 ano sem fumar, o risco cai pela metade. Seu coração já sente a diferença — o fluxo de sangue melhorou e a pressão está mais estável.
            </p>
            <div className="heart-card__source">
              <Icon name="Lightbulb" size={14} color="#999" />
              <span>Cálculo: baseado em estudos da OMS. Após {days} dias, a redução estimada é de 20%. A meta de 50% é atingida com 1 ano completo.</span>
            </div>
          </div>
          <div className="heart-card__chart">
            <svg width="140" height="140" viewBox="0 0 140 140" className="heart-card__chart-svg">
              <circle cx="70" cy="70" r="62" fill="none" stroke="var(--color-primary)" strokeWidth="8" strokeDasharray={`${0.2 * 2 * Math.PI * 62} ${2 * Math.PI * 62}`} strokeLinecap="round" />
            </svg>
            <div className="heart-card__chart-inner">
              <Icon name="Heart" size={24} color="#EF4444" />
              <div className="heart-card__chart-value">-20%</div>
              <div className="heart-card__chart-label">Risco</div>
            </div>
          </div>
        </div>
        <div className="heart-card__milestone">
          <Icon name="Star" size={16} color="var(--color-primary)" />
          <span className="heart-card__milestone-text"><strong>Próximo Marco: 5 Anos</strong> — Risco de AVC igual ao de um não-fumante</span>
        </div>
      </Card>

      <Card className="timeline-card">
        <h3 className="timeline-card__title">Linha do Tempo da Recuperação</h3>
        <div className="timeline">
          {[
            { time: '20 min', label: 'Pressão e batimentos voltam ao normal', done: true },
            { time: '8 horas', label: 'Seu sangue está mais limpo', done: true },
            { time: '48 horas', label: 'Sabores e aromas começam a voltar', done: true },
            { time: '2 semanas', label: 'Sua respiração fica mais fácil', done: days >= 14 },
            { time: '1 mês', label: 'Pulmões começam a se reparar', done: days >= 30 },
            { time: '1 ano', label: 'Risco cardíaco cai pela metade', done: false },
          ].map((step, i, arr) => (
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
