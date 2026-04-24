import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';

export const HealthScreen = () => {
  const days = 12;
  const healthItems = [
    { icon: 'Droplets', label: 'Seu sangue está mais limpo', pct: 100, color: 'var(--color-primary)', how: `Após 12 dias, o nível de monóxido no sangue volta ao normal. Baseado nos seus ${days} dias sem fumar.` },
    { icon: 'Wind', label: 'Sua respiração está mais leve', pct: 90, color: '#3B82F6', how: `A capacidade pulmonar melhora ~5% por semana. Baseado nos seus ${days} dias sem fumar.` },
    { icon: 'Smile', label: 'Sabores e aromas voltando', pct: 70, color: '#F59E0B', how: `Nervos sensoriais se regeneram em 2-4 semanas. Você está no dia ${days} — progresso estimado: 70%.` },
  ];
  return (
    <>
      <PageTitle title="Recuperação Física" subtitle="Acompanhe como seu corpo está se curando dia após dia. Cada pequena porcentagem é uma grande vitória." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
        {healthItems.map((item, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: item.pct === 100 ? 'var(--color-primary-light)' : item.color === '#3B82F6' ? '#EFF6FF' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={item.icon} size={20} color={item.color} />
              </div>
              <span style={{ fontSize: 28, fontWeight: 700, color: item.color }}>{item.pct}%</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.label}</div>
            <div style={{ height: 6, borderRadius: 3, background: '#F0F1F3', marginBottom: 12 }}>
              <div style={{ height: '100%', borderRadius: 3, background: item.color, width: `${item.pct}%` }}></div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, padding: '8px 10px', background: '#F9FAFB', borderRadius: 8 }}>
              <Icon name="Lightbulb" size={12} color="#999" /> {item.how}
            </div>
          </Card>
        ))}
      </div>
      {/* Heart card */}
      <Card>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 20, background: '#FEE2E2', fontSize: 12, color: '#EF4444', fontWeight: 600, marginBottom: 16 }}>
              <Icon name="Heart" size={12} color="#EF4444" />Seu coração agradece
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 12px' }}>Risco de Infarto Reduzido em 20%</h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 16px' }}>
              Após 1 ano sem fumar, o risco cai pela metade. Seu coração já sente a diferença — o fluxo de sangue melhorou e a pressão está mais estável.
            </p>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <Icon name="Lightbulb" size={14} color="#999" style={{ flexShrink: 0, marginTop: 1 }} />
              <span>Cálculo: baseado em estudos da OMS. Após {days} dias, a redução estimada é de 20%. A meta de 50% é atingida com 1 ano completo.</span>
            </div>
          </div>
          <div style={{ flexShrink: 0, width: 140, height: 140, borderRadius: '50%', border: '8px solid #F0F1F3', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ position: 'absolute', top: -8, left: -8, transform: 'rotate(-90deg)' }}>
              <circle cx="70" cy="70" r="62" fill="none" stroke="var(--color-primary)" strokeWidth="8" strokeDasharray={`${0.2 * 2 * Math.PI * 62} ${2 * Math.PI * 62}`} strokeLinecap="round" />
            </svg>
            <div style={{ textAlign: 'center' }}>
              <Icon name="Heart" size={24} color="#EF4444" />
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>-20%</div>
              <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>Risco</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--color-primary-light)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="Star" size={16} color="var(--color-primary)" />
          <span style={{ fontSize: 14, color: 'var(--color-primary-dark)' }}><strong>Próximo Marco: 5 Anos</strong> — Risco de AVC igual ao de um não-fumante</span>
        </div>
      </Card>
      {/* Function timeline */}
      <Card style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 17, margin: '0 0 16px' }}>Linha do Tempo da Recuperação</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { time: '20 min', label: 'Pressão e batimentos voltam ao normal', done: true },
            { time: '8 horas', label: 'Seu sangue está mais limpo', done: true },
            { time: '48 horas', label: 'Sabores e aromas começam a voltar', done: true },
            { time: '2 semanas', label: 'Sua respiração fica mais fácil', done: days >= 14 },
            { time: '1 mês', label: 'Pulmões começam a se reparar', done: days >= 30 },
            { time: '1 ano', label: 'Risco cardíaco cai pela metade', done: false },
          ].map((step, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: step.done ? 'var(--color-primary)' : '#E5E7EB', border: step.done ? 'none' : '2px solid #D1D5DB', flexShrink: 0, marginTop: 4 }}></div>
                {i < arr.length - 1 && <div style={{ width: 2, height: 32, background: step.done ? 'var(--color-primary)' : '#E5E7EB' }}></div>}
              </div>
              <div style={{ paddingBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: step.done ? 'var(--color-primary)' : '#999' }}>{step.time}</div>
                <div style={{ fontSize: 14, color: step.done ? 'var(--color-text-primary)' : '#999' }}>{step.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
