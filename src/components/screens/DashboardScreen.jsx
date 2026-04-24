import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';

export const DashboardScreen = () => {
  const days = 12, hours = 4, totalHours = 288 + 4;
  const money = 245, cigs = 124;
  return (
    <>
      <PageTitle title="Olá, Bob" subtitle="Um dia de cada vez. Você está indo muito bem." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        {/* Progress card */}
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--color-primary)', marginBottom: 16 }}>Seu Progresso</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 56, fontWeight: 700, color: 'var(--color-primary)' }}>{days}</span>
            <span style={{ fontSize: 18, color: 'var(--color-text-secondary)' }}>dias</span>
            <span style={{ fontSize: 56, fontWeight: 700, color: 'var(--color-primary)', marginLeft: 8 }}>{hours}</span>
            <span style={{ fontSize: 18, color: 'var(--color-text-secondary)' }}>hrs</span>
          </div>
          <div style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginTop: 8 }}>Livre do cigarro</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, padding: '8px 16px', borderRadius: 20, background: 'var(--color-primary-light)', fontSize: 13, color: 'var(--color-primary-dark)', fontWeight: 500 }}>
            <Icon name="Clock" size={14} color="var(--color-primary)" />{totalHours} horas totais
          </div>
        </Card>
        {/* Side cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
              </div>
              <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Economizado</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>R$ {money},00</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>O suficiente para um jantar especial</div>
          </Card>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="Zap" size={16} color="#EF4444" />
              </div>
              <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Cigarros Evitados</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{cigs}</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Seus pulmões agradecem</div>
          </Card>
        </div>
      </div>
      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Icon name="Heart" size={18} color="#EF4444" />
            <h3 style={{ margin: 0, fontSize: 17 }}>Recuperação Física</h3>
          </div>
          {[
            { label: 'Seu sangue está mais limpo', pct: 100, desc: 'Baseado em 12 dias sem fumar' },
            { label: 'Sabores e aromas voltando', pct: 80, desc: 'Nervos se regenerando' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? 16 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                <span>{item.label}</span>
                <span style={{ fontWeight: 600, color: item.pct === 100 ? 'var(--color-primary)' : '#F59E0B' }}>
                  {item.pct === 100 ? 'Normalizado' : `${item.pct}%`}
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: '#F0F1F3' }}>
                <div style={{ height: '100%', borderRadius: 3, background: item.pct === 100 ? 'var(--color-primary)' : '#F59E0B', width: `${item.pct}%`, transition: 'width 0.5s' }}></div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>{item.desc}</div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="Trophy" size={18} color="#F59E0B" />
              <h3 style={{ margin: 0, fontSize: 17 }}>Conquistas</h3>
            </div>
            <span style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 500, cursor: 'pointer' }}>Ver todas</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: '1 Dia Limpo', unlocked: true, color: 'var(--color-primary)' },
              { label: '1 Semana Limpa', unlocked: true, color: '#3B82F6' },
              { label: '1 Mês Limpo', unlocked: false, color: '#9CA3AF' },
            ].map((a, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: a.unlocked ? a.color : '#F0F1F3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', opacity: a.unlocked ? 1 : 0.5 }}>
                  {a.unlocked ? <Icon name="Award" size={24} color="#fff" /> : <Icon name="Lock" size={20} color="#999" />}
                </div>
                <div style={{ fontSize: 12, color: a.unlocked ? 'var(--color-text-primary)' : '#999' }}>{a.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};
