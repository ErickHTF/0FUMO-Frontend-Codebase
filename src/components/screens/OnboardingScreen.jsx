import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';

export const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = React.useState(0);
  const [cigs, setCigs] = React.useState('');
  const [time, setTime] = React.useState('');
  const [motivo, setMotivo] = React.useState('');

  const times = ['Menos de 1 ano', '1 a 5 anos', 'Mais de 5 anos'];
  const motivos = [
    { id: 'saude', label: 'Saúde', icon: 'Heart' },
    { id: 'familia', label: 'Família', icon: 'Users' },
    { id: 'economia', label: 'Economia', icon: 'TrendingUp' },
    { id: 'liberdade', label: 'Liberdade', icon: 'Wind' },
  ];

  if (step === 0) {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', paddingTop: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: 8 }}>0 Fumo</div>
          <div style={{ fontSize: 15, color: 'var(--color-text-secondary)' }}>Sua jornada começa aqui. Vamos juntos.</div>
        </div>
        <Card style={{ padding: 40 }}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 32, height: 4, borderRadius: 2, background: i === 0 ? 'var(--color-primary)' : '#E5E7EB' }}></div>)}
          </div>
          <h2 style={{ fontSize: 22, margin: '0 0 8px', textAlign: 'center' }}>Personalize sua jornada</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 14, margin: '0 0 32px' }}>Entender seu momento atual nos ajuda a criar um plano sob medida para você.</p>
          <label style={{ fontSize: 15, fontWeight: 600, display: 'block', marginBottom: 12 }}>Quantos cigarros por dia?</label>
          <input type="number" value={cigs} onChange={e => setCigs(e.target.value)} placeholder="Ex: 15" style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 32 }} />
          <label style={{ fontSize: 15, fontWeight: 600, display: 'block', marginBottom: 12 }}>Há quanto tempo fuma?</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            {times.map(t => (
              <button key={t} onClick={() => setTime(t)} style={{
                flex: 1, padding: '12px 8px', borderRadius: 8, border: `1.5px solid ${time === t ? 'var(--color-primary)' : '#E5E7EB'}`,
                background: time === t ? 'var(--color-primary)' : '#fff', color: time === t ? '#fff' : 'var(--color-text-primary)',
                fontSize: 14, fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500,
              }}>{t}</button>
            ))}
          </div>
          <button onClick={() => setStep(1)} disabled={!cigs || !time} style={{
            width: '100%', padding: 14, borderRadius: 12, border: 'none',
            background: cigs && time ? 'var(--color-primary)' : '#E5E7EB',
            color: cigs && time ? '#fff' : '#999', fontWeight: 600, fontSize: 15, cursor: cigs && time ? 'pointer' : 'default', fontFamily: 'inherit',
          }}>Continuar</button>
        </Card>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', paddingTop: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: 8 }}>0 Fumo</div>
        </div>
        <Card style={{ padding: 40 }}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 32, height: 4, borderRadius: 2, background: i <= 1 ? 'var(--color-primary)' : '#E5E7EB' }}></div>)}
          </div>
          <h2 style={{ fontSize: 22, margin: '0 0 8px', textAlign: 'center' }}>Qual o seu principal motivo para parar?</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 14, margin: '0 0 32px' }}>Vamos lembrar disso nos momentos difíceis.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
            {motivos.map(m => (
              <button key={m.id} onClick={() => setMotivo(m.id)} style={{
                padding: 20, borderRadius: 12, border: `1.5px solid ${motivo === m.id ? 'var(--color-primary)' : '#E5E7EB'}`,
                background: motivo === m.id ? 'var(--color-primary-light)' : '#fff', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, fontFamily: 'inherit',
              }}>
                <Icon name={m.icon} size={24} color={motivo === m.id ? 'var(--color-primary)' : '#999'} />
                <span style={{ fontSize: 14, fontWeight: 500, color: motivo === m.id ? 'var(--color-primary-dark)' : 'var(--color-text-primary)' }}>{m.label}</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep(0)} style={{ flex: 1, padding: 14, borderRadius: 12, border: '1.5px solid #E5E7EB', background: '#fff', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Voltar</button>
            <button onClick={() => setStep(2)} disabled={!motivo} style={{
              flex: 2, padding: 14, borderRadius: 12, border: 'none',
              background: motivo ? 'var(--color-primary)' : '#E5E7EB',
              color: motivo ? '#fff' : '#999', fontWeight: 600, fontSize: 15, cursor: motivo ? 'pointer' : 'default', fontFamily: 'inherit',
            }}>Continuar</button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', paddingTop: 40 }}>
      <Card style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 32, height: 4, borderRadius: 2, background: 'var(--color-primary)' }}></div>)}
        </div>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Icon name="Check" size={36} color="var(--color-primary)" />
        </div>
        <h2 style={{ fontSize: 24, margin: '0 0 12px' }}>Tudo pronto!</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 15, margin: '0 0 32px', lineHeight: 1.6 }}>
          Sua jornada de {cigs} cigarros por dia para zero começa agora. Estaremos com você em cada momento.
        </p>
        <button onClick={onComplete} style={{
          width: '100%', padding: 16, borderRadius: 12, border: 'none', background: 'var(--color-primary)',
          color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 4px 12px rgba(34,151,107,0.3)',
        }}>Começar Jornada →</button>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 12 }}>Suas respostas são confidenciais</div>
      </Card>
    </div>
  );
};
