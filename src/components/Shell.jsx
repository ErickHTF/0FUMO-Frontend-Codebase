import React from 'react';
import { Icon } from '../lib/icons';
import { Card } from './ui/Card';
import { Events } from '../lib/api';
import '../styles/components/Shell.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'saude', label: 'Saúde', icon: 'Heart' },
  { id: 'gatilhos', label: 'Gatilhos', icon: 'Target' },
  { id: 'relaxar', label: 'Relaxar', icon: 'Wind' },
  { id: 'comunidade', label: 'Comunidade', icon: 'Users' },
];

const TRIGGERS = ['Ansiedade', 'Hábito', 'Social', 'Cansaço', 'Estresse', 'Tédio'];

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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setSubmitted(false);
      setIntensity(3);
      setTrigger('');
      setNote('');
      setError('');
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!trigger) { setError('Selecione o que provocou o desejo'); return; }
    setError('');
    setLoading(true);
    try {
      await Events.create('CRAVING', intensity, trigger, note || null);
      setSubmitted(true);
    } catch {
      setError('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
                <Icon name="X" size={20} color="var(--color-muted)" />
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
              {TRIGGERS.map(t => (
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
            {error && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
            <button onClick={handleSubmit} disabled={loading} className="modal-submit-btn">
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

function nowLocalISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export const CigaretteModal = ({ open, onClose }) => {
  const [occurredAt, setOccurredAt] = React.useState('');
  const [trigger, setTrigger] = React.useState('');
  const [note, setNote] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setSubmitted(false);
      setOccurredAt(nowLocalISO());
      setTrigger('');
      setNote('');
      setError('');
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!trigger) { setError('Selecione o que provocou'); return; }
    setError('');
    setLoading(true);
    try {
      const isoDateTime = occurredAt ? new Date(occurredAt).toISOString().slice(0, 19) : null;
      await Events.create('CIGARETTE_SMOKED', null, trigger, note || null, isoDateTime);
      setSubmitted(true);
    } catch {
      setError('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="modal-box">
        {submitted ? (
          <div className="modal-success">
            <div className="modal-success__icon">
              <Icon name="Check" size={32} color="var(--color-primary)" />
            </div>
            <h3 className="modal-success__title">Registrado</h3>
            <p className="modal-success__text">Recaídas fazem parte. O que importa é continuar. Seu progresso foi atualizado.</p>
            <button onClick={onClose} className="modal-success__close">Fechar</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h3 className="modal-header__title">Registrar cigarro fumado</h3>
              <button onClick={onClose} className="modal-icon-btn">
                <Icon name="X" size={20} color="var(--color-muted)" />
              </button>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
              Isso nos ajuda a ajustar seu progresso com precisão. Sem julgamentos.
            </p>
            <label className="modal-field-label">Quando foi?</label>
            <input
              type="datetime-local"
              value={occurredAt}
              max={nowLocalISO()}
              onChange={e => setOccurredAt(e.target.value)}
              className="modal-datetime-input"
            />
            <label className="modal-field-label" style={{ marginTop: '16px' }}>O que provocou?</label>
            <div className="modal-triggers-row">
              {TRIGGERS.map(t => (
                <button
                  key={t}
                  onClick={() => setTrigger(prev => prev === t ? '' : t)}
                  className={`modal-trigger-btn ${trigger === t ? 'modal-trigger-btn--active' : 'modal-trigger-btn--inactive'}`}
                >{t}</button>
              ))}
            </div>
            <label className="modal-field-label">Quer anotar algo? (opcional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="O que aconteceu antes..."
              className="modal-textarea"
            />
            {error && <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
            <button onClick={handleSubmit} disabled={loading} className="modal-submit-btn">
              {loading ? 'Registrando...' : 'Confirmar registro'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const Sidebar = ({ activePage, onNavigate, onLogout, open, onClose }) => {
  const [cravingModalOpen, setCravingModalOpen] = React.useState(false);
  const [cigaretteModalOpen, setCigaretteModalOpen] = React.useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    onClose?.();
  };

  return (
    <>
      <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-name">0 Fumo</div>
          <div className="sidebar__brand-tagline">Sua nova jornada</div>
        </div>
        <div className="sidebar__cta">
          <LogCravingButton onClick={() => setCravingModalOpen(true)} />
          <button
            onClick={() => setCigaretteModalOpen(true)}
            className="sidebar__cigarette-btn"
          >
            <Icon name="AlertCircle" size={15} color="var(--color-text-secondary)" />
            <span>Fumei um cigarro</span>
          </button>
        </div>
        <nav className="sidebar__nav">
          {NAV_ITEMS.map(item => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`sidebar__nav-btn${active ? ' sidebar__nav-btn--active' : ''}`}
              >
                <Icon name={item.icon} size={18} color={active ? 'var(--color-primary)' : 'var(--color-muted)'} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="sidebar__footer">
          <button
            onClick={() => handleNavigate('config')}
            className={`sidebar__footer-btn${activePage === 'config' ? ' sidebar__footer-btn--active' : ''}`}
          >
            <Icon name="Settings" size={18} color={activePage === 'config' ? 'var(--color-primary)' : 'var(--color-muted)'} />
            Configurações
          </button>
          <button onClick={onLogout} className="sidebar__footer-btn">
            <Icon name="LogOut" size={18} color="var(--color-muted)" />
            Sair
          </button>
        </div>
      </aside>
      <CravingLogModal open={cravingModalOpen} onClose={() => setCravingModalOpen(false)} />
      <CigaretteModal open={cigaretteModalOpen} onClose={() => setCigaretteModalOpen(false)} />
    </>
  );
};

const TopBar = ({ onMenuClick, onToggleDarkMode, isDarkMode }) => (
  <div className="topbar">
    <button className="topbar__menu-btn" onClick={onMenuClick} aria-label="Abrir menu">
      <Icon name="Menu" size={22} color="#6C727F" />
    </button>
    <div className="topbar__right">
      <button className="topbar__notif-btn">
        <Icon name="Bell" size={20} color="#6C727F" />
        <span className="topbar__notif-badge"></span>
      </button>
      <button className="topbar__theme-btn" onClick={onToggleDarkMode} aria-label="Alternar modo escuro">
        <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} color="#6C727F" />
      </button>
      <div className="topbar__avatar">
        <Icon name="User" size={18} color="var(--color-primary)" />
      </div>
    </div>
  </div>
);

export const AppShell = ({ activePage, onNavigate, onLogout, onToggleDarkMode, isDarkMode, children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        onLogout={onLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="app-shell__main">
        <TopBar onMenuClick={() => setSidebarOpen(true)} onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode} />
        {children}
      </main>
    </div>
  );
};
