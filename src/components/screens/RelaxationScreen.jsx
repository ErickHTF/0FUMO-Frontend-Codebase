import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';

export const RelaxationScreen = () => (
  <>
    <PageTitle title="Central de Relaxamento" subtitle="Encontre seu equilíbrio. Práticas rápidas e suaves para acalmar a mente e aliviar a tensão." />
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
      <Card style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)', border: '1px solid rgba(34,151,107,0.1)' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Icon name="Wind" size={22} color="var(--color-primary)" />
        </div>
        <h3 style={{ fontSize: 22, margin: '0 0 8px' }}>Respiração 4-7-8</h3>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 24px' }}>Uma técnica simples e poderosa para reduzir a ansiedade. Inspire, segure, expire. Nós guiamos você no ritmo certo.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
            <Icon name="Play" size={16} color="#fff" />Iniciar Prática
          </button>
          <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>~ 2 minutos</span>
        </div>
      </Card>
      <Card>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Icon name="Headphones" size={22} color="#3B82F6" />
        </div>
        <h3 style={{ fontSize: 18, margin: '0 0 8px' }}>Meditação Curta (3 min)</h3>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: '0 0 20px' }}>Uma pausa rápida para reencontrar seu eixo e clarear a mente.</p>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, border: '1.5px solid #E5E7EB', background: '#fff', fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>
          <Icon name="Play" size={14} />Ouvir agora
        </button>
      </Card>
    </div>
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="Lightbulb" size={18} color="#F59E0B" />
          <h3 style={{ margin: 0, fontSize: 17 }}>Dicas para a Fissura</h3>
        </div>
        <span style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 500, cursor: 'pointer' }}>Ver todas →</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { icon: 'Droplets', title: 'Beba Água Gelada', desc: 'Pequenos goles ajudam a simular o gesto e refrescam a boca.' },
          { icon: 'Wind', title: 'Mude de Ambiente', desc: 'Levante, dê uma volta rápida. Quebre o padrão visual.' },
          { icon: 'Coffee', title: 'Aromaterapia Rápida', desc: 'Cheire um grão de café ou óleo essencial de lavanda.' },
        ].map((tip, i) => (
          <div key={i} style={{ padding: 16, borderRadius: 10, background: '#F9FAFB', border: '1px solid #F0F1F3' }}>
            <Icon name={tip.icon} size={18} color="var(--color-primary)" />
            <h4 style={{ margin: '10px 0 6px', fontSize: 14 }}>{tip.title}</h4>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>{tip.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  </>
);

