import React from 'react';
import { Icon } from '../lib/icons';
import { Card } from './ui/Card';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'saude', label: 'Saúde', icon: 'Heart' },
  { id: 'gatilhos', label: 'Gatilhos', icon: 'Target' },
  { id: 'relaxar', label: 'Relaxar', icon: 'Wind' },
  { id: 'comunidade', label: 'Comunidade', icon: 'Users' },
];

export const LogCravingButton = ({ onClick }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 8, width: '100%',
    padding: '14px 16px', border: 'none', borderRadius: 12,
    background: 'var(--color-primary)', color: '#fff', cursor: 'pointer',
    fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
    boxShadow: '0 4px 12px rgba(34,151,107,0.3)',
    transition: 'all 0.2s',
  }}
  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(34,151,107,0.4)'; }}
  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(34,151,107,0.3)'; }}
  >
    <Icon name="Flame" size={20} color="#fff" /><span>Registrar Desejo</span>
  </button>
);

export const CravingLogModal = ({ open, onClose }) => {
  const [intensity, setIntensity] = React.useState(3);
  const [trigger, setTrigger] = React.useState('');
  const [note, setNote] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const triggers = ['Ansiedade', 'Hábito', 'Social', 'Cansaço', 'Estresse', 'Tédio'];

  React.useEffect(() => { if (open) { setSubmitted(false); setIntensity(3); setTrigger(''); setNote(''); } }, [open]);

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: 32, width: 440, maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Icon name="Check" size={32} color="var(--color-primary)" />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 20 }}>Registrado!</h3>
            <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px', fontSize: 14 }}>Você reconheceu o desejo e isso é uma vitória. A fissura passa em poucos minutos.</p>
            <button onClick={onClose} style={{ padding: '12px 32px', borderRadius: 8, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15 }}>Fechar</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 20 }}>Como você está se sentindo?</h3>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><Icon name="X" size={20} color="#999" /></button>
            </div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Intensidade do desejo</label>
            <div style={{ display: 'flex', gap: 8, margin: '12px 0 24px' }}>
              {[1,2,3,4,5].map(v => (
                <button key={v} onClick={() => setIntensity(v)} style={{
                  flex: 1, height: 40, borderRadius: 8, border: `2px solid ${v <= intensity ? 'var(--color-primary)' : '#E5E7EB'}`,
                  background: v <= intensity ? 'var(--color-primary-light)' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  color: v <= intensity ? 'var(--color-primary-dark)' : '#999', fontFamily: 'inherit',
                }}>{v}</button>
              ))}
            </div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>O que provocou?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0 24px' }}>
              {triggers.map(t => (
                <button key={t} onClick={() => setTrigger(t)} style={{
                  padding: '8px 16px', borderRadius: 20, border: `1.5px solid ${trigger === t ? 'var(--color-primary)' : '#E5E7EB'}`,
                  background: trigger === t ? 'var(--color-primary-light)' : '#fff', cursor: 'pointer', fontSize: 14,
                  color: trigger === t ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)', fontFamily: 'inherit', fontWeight: 500,
                }}>{t}</button>
              ))}
            </div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quer anotar algo? (opcional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Como foi o momento..." style={{ width: '100%', height: 80, borderRadius: 8, border: '1.5px solid #E5E7EB', padding: 12, fontFamily: 'inherit', fontSize: 14, resize: 'none', marginTop: 12, boxSizing: 'border-box' }} />
            <button onClick={() => setSubmitted(true)} style={{ width: '100%', padding: 14, borderRadius: 12, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 24, fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(34,151,107,0.3)' }}>Registrar</button>
          </>
        )}
      </div>
    </div>
  );
};

export const Sidebar = ({ activePage, onNavigate, onLogout }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <>
      <aside style={{
        width: 220, minHeight: '100vh', background: '#fff', borderRight: '1px solid #ECEEF1',
        display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'fixed', left: 0, top: 0, zIndex: 100, boxSizing: 'border-box',
      }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-primary-dark)' }}>0 Fumo</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>Sua nova jornada</div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <LogCravingButton onClick={() => setModalOpen(true)} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {NAV_ITEMS.map(item => {
            const active = activePage === item.id;
            return (
              <button key={item.id} onClick={() => onNavigate(item.id)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8,
                border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: active ? 600 : 400,
                background: active ? 'var(--color-primary-light)' : 'transparent',
                color: active ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F5F6F8'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon name={item.icon} size={18} color={active ? 'var(--color-primary)' : '#999'} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div style={{ borderTop: '1px solid #ECEEF1', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button onClick={() => onNavigate('config')} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14,
            background: activePage === 'config' ? 'var(--color-primary-light)' : 'transparent',
            color: activePage === 'config' ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
          }}><Icon name="Settings" size={18} color={activePage === 'config' ? 'var(--color-primary)' : '#999'} />Configurações</button>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, background: 'transparent', color: 'var(--color-text-secondary)' }}>
            <Icon name="LogOut" size={18} color="#999" />Sair
          </button>
        </div>
      </aside>
      <CravingLogModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

const TopBar = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, padding: '16px 0', marginBottom: 8 }}>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
      <Icon name="Bell" size={20} color="#6C727F" />
      <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#EF4444', border: '2px solid #fff' }}></span>
    </button>
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <Icon name="User" size={18} color="var(--color-primary)" />
    </div>
  </div>
);

export const AppShell = ({ activePage, onNavigate, onLogout, children }) => (
  <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-surface)' }}>
    <Sidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
    <main style={{ flex: 1, marginLeft: 220, padding: '0 40px 40px', maxWidth: 960, minWidth: 0 }}>
      <TopBar />
      {children}
    </main>
  </div>
);
