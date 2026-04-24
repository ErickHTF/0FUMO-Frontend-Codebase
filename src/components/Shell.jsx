import React from 'react';
import { Icon } from '../lib/icons';
import { Card } from './ui/Card';
import '../styles/components/Shell.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'saude', label: 'Saúde', icon: 'Heart' },
  { id: 'gatilhos', label: 'Gatilhos', icon: 'Target' },
  { id: 'relaxar', label: 'Relaxar', icon: 'Wind' },
  { id: 'comunidade', label: 'Comunidade', icon: 'Users' },
];

export const LogCravingButton = ({ onClick }) => (
  <button onClick={onClick} className="log-craving-btn">
    <Icon name="Flame" size={20} color="#fff" />
    <span>Registrar Desejo</span>
  </button>
);

export const CravingLogModal = ({ open, onClose }) => {
  const [intensity, setIntensity] = React.useState(3);
  const [trigger, setTrigger] = React.useState('');
  const [note, setNote] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const triggers = ['Ansiedade', 'Hábito', 'Social', 'Cansaço', 'Estresse', 'Tédio'];

  React.useEffect(() => {
    if (open) { setSubmitted(false); setIntensity(3); setTrigger(''); setNote(''); }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="modal-box">
        {submitted ? (
          <div className="modal-success">
            <div className="modal-success__icon">
              <Icon name="Check" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="modal-success__title">Registrado!</h3>
            <p className="modal-success__text">Você reconheceu o desejo e isso é uma vitória. A fissura passa em poucos minutos.</p>
            <button onClick={onClose} className="modal-success__close">Fechar</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h3 className="modal-header__title">Como você está se sentindo?</h3>
              <button onClick={onClose} className="modal-icon-btn">
                <Icon name="X" size={20} color="#999" />
              </button>
            </div>
            <label className="modal-field-label">Intensidade do desejo</label>
            <div className="modal-intensity-row">
              {[1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  onClick={() => setIntensity(v)}
                  className={`modal-intensity-btn ${v <= intensity ? 'modal-intensity-btn--active' : 'modal-intensity-btn--inactive'}`}
                >{v}</button>
              ))}
            </div>
            <label className="modal-field-label">O que provocou?</label>
            <div className="modal-triggers-row">
              {triggers.map(t => (
                <button
                  key={t}
                  onClick={() => setTrigger(t)}
                  className={`modal-trigger-btn ${trigger === t ? 'modal-trigger-btn--active' : 'modal-trigger-btn--inactive'}`}
                >{t}</button>
              ))}
            </div>
            <label className="modal-field-label">Quer anotar algo? (opcional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Como foi o momento..."
              className="modal-textarea"
            />
            <button onClick={() => setSubmitted(true)} className="modal-submit-btn">Registrar</button>
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
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="sidebar__brand-name">0 Fumo</div>
          <div className="sidebar__brand-tagline">Sua nova jornada</div>
        </div>
        <div className="sidebar__cta">
          <LogCravingButton onClick={() => setModalOpen(true)} />
        </div>
        <nav className="sidebar__nav">
          {NAV_ITEMS.map(item => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`sidebar__nav-btn${active ? ' sidebar__nav-btn--active' : ''}`}
              >
                <Icon name={item.icon} size={18} color={active ? 'var(--color-primary)' : '#999'} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="sidebar__footer">
          <button
            onClick={() => onNavigate('config')}
            className={`sidebar__footer-btn${activePage === 'config' ? ' sidebar__footer-btn--active' : ''}`}
          >
            <Icon name="Settings" size={18} color={activePage === 'config' ? 'var(--color-primary)' : '#999'} />
            Configurações
          </button>
          <button onClick={onLogout} className="sidebar__footer-btn">
            <Icon name="LogOut" size={18} color="#999" />
            Sair
          </button>
        </div>
      </aside>
      <CravingLogModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

const TopBar = () => (
  <div className="topbar">
    <button className="topbar__notif-btn">
      <Icon name="Bell" size={20} color="#6C727F" />
      <span className="topbar__notif-badge"></span>
    </button>
    <div className="topbar__avatar">
      <Icon name="User" size={18} color="var(--color-primary)" />
    </div>
  </div>
);

export const AppShell = ({ activePage, onNavigate, onLogout, children }) => (
  <div className="app-shell">
    <Sidebar activePage={activePage} onNavigate={onNavigate} onLogout={onLogout} />
    <main className="app-shell__main">
      <TopBar />
      {children}
    </main>
  </div>
);
