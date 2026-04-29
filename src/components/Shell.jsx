import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../lib/icons';
import { Card } from './ui/Card';
import { Events, Messages, getStoredUser } from '../lib/api';
import './Shell.css';

const ACTION_ICONS = {
  breathing: 'Wind',
  water: 'Droplet',
  register_trigger: 'Target',
  walking: 'MapPin',
  celebrate: 'Star',
};

function calcDays(quitDate) {
  if (!quitDate) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(quitDate).getTime()) / 86400000));
}

function normalizeGatilho(g) {
  if (!g) return null;
  return g.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'saude', label: 'Saúde', icon: 'Heart' },
  { id: 'gatilhos', label: 'Gatilhos', icon: 'Target' },
  { id: 'relaxar', label: 'Relaxar', icon: 'Wind' },
  { id: 'laboratorio', label: 'Laboratório', icon: 'BarChart3' },
  { id: 'comunidade', label: 'Comunidade', icon: 'Users' },
];

export const LogCravingButton = ({ onClick }) => (
  <button onClick={onClick} className="log-craving-btn">
    <Icon name="Flame" size={20} color="#fff" />
    <span>Registrar Desejo</span>
  </button>
);

const LogCigaretteButton = ({ onClick }) => (
  <button onClick={onClick} className="log-cigarette-btn">
    <Icon name="Cigarette" size={16} />
    <span>Registrar Fumada</span>
  </button>
);

export const CravingLogModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [intensity, setIntensity] = React.useState(3);
  const [ansiedade, setAnsiedade] = React.useState(3);
  const [trigger, setTrigger] = React.useState('');
  const [note, setNote] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [messageData, setMessageData] = React.useState(null);
  const triggers = ['Ansiedade', 'Hábito', 'Social', 'Cansaço', 'Estresse', 'Tédio'];

  React.useEffect(() => {
    if (open) {
      setSubmitted(false); setIntensity(3); setAnsiedade(3);
      setTrigger(''); setNote(''); setError(''); setMessageData(null);
    }
  }, [open]);

  const handleRegister = async () => {
    if (!trigger) { setError('Selecione o que provocou o desejo'); return; }
    setLoading(true);
    setError('');
    try {
      await Events.create('CRAVING', intensity, trigger, note, new Date().toISOString());
      window.dispatchEvent(new CustomEvent('craving-logged'));
      const user = getStoredUser();
      try {
        const msg = await Messages.select({
          craving: intensity * 2,
          anxiety: ansiedade * 2,
          trigger: normalizeGatilho(trigger),
          daysSmokeFree: calcDays(user?.quitDate),
          recaida: false,
        });
        setMessageData(msg);
      } catch { }
      setSubmitted(true);
    } catch {
      setError('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (foiUtil) => {
    if (messageData?.historyId) {
      try { await Messages.feedback(messageData.historyId, foiUtil); } catch { }
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="modal-box">
        {submitted ? (
          messageData ? (
            <MessageCard
              messageData={messageData}
              title="Registrado!"
              onFeedback={handleFeedback}
              onClose={onClose}
              navigate={navigate}
            />
          ) : (
            <div className="modal-success">
              <div className="modal-success__icon">
                <Icon name="Check" size={32} color="var(--color-primary)" />
              </div>
              <h3 className="modal-success__title">Registrado!</h3>
              <p className="modal-success__text">Você reconheceu o desejo e isso é uma vitória. A fissura passa em poucos minutos.</p>
              <button onClick={onClose} className="modal-success__close">Fechar</button>
            </div>
          )
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
                <button key={v} onClick={() => setIntensity(v)}
                  className={`modal-intensity-btn ${v <= intensity ? 'modal-intensity-btn--active' : 'modal-intensity-btn--inactive'}`}
                >{v}</button>
              ))}
            </div>
            <label className="modal-field-label">Nível de ansiedade</label>
            <div className="modal-intensity-row">
              {[1, 2, 3, 4, 5].map(v => (
                <button key={v} onClick={() => setAnsiedade(v)}
                  className={`modal-intensity-btn ${v <= ansiedade ? 'modal-intensity-btn--active' : 'modal-intensity-btn--inactive'}`}
                >{v}</button>
              ))}
            </div>
            <label className="modal-field-label">O que provocou?</label>
            <div className="modal-triggers-row">
              {triggers.map(t => (
                <button key={t} onClick={() => setTrigger(t)}
                  className={`modal-trigger-btn ${trigger === t ? 'modal-trigger-btn--active' : 'modal-trigger-btn--inactive'}`}
                >{t}</button>
              ))}
            </div>
            <label className="modal-field-label">Quer anotar algo? (opcional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)}
              placeholder="Como foi o momento..." className="modal-textarea" />
            {error && (
              <div className="modal-error">
                <Icon name="AlertCircle" size={14} color="#DC2626" />{error}
              </div>
            )}
            <button onClick={handleRegister} disabled={loading || !trigger} className="modal-submit-btn">
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const MessageCard = ({ messageData, title, onFeedback, onClose, navigate }) => (
  <div className="modal-message">
    <div className="modal-message__header">
      <Icon name="Check" size={16} color="var(--color-primary)" />
      <span className="modal-message__registered">{title}</span>
    </div>
    <p className="modal-message__text">{messageData.text}</p>
    {messageData.nextAction && (
      <div className="modal-message__action">
        <Icon name={ACTION_ICONS[messageData.nextAction.type] || 'Zap'} size={16} color="var(--color-primary)" />
        <div>
          <span className="modal-message__action-label">Next action</span>
          <p className="modal-message__action-desc">{messageData.nextAction.description}</p>
          {messageData.nextAction.type === 'breathing' && (
            <button className="modal-message__action-btn" onClick={() => { onClose(); navigate('/relaxar'); }}>
              Breathe now →
            </button>
          )}
          {messageData.nextAction.type === 'register_trigger' && (
            <button className="modal-message__action-btn" onClick={() => { onClose(); navigate('/gatilhos'); }}>
              View triggers →
            </button>
          )}
        </div>
      </div>
    )}
    <div className="modal-message__feedback">
      <span className="modal-message__feedback-label">Isso ajudou?</span>
      <div className="modal-message__feedback-btns">
        <button onClick={() => onFeedback(true)} className="modal-message__feedback-btn modal-message__feedback-btn--yes">Sim</button>
        <button onClick={() => onFeedback(false)} className="modal-message__feedback-btn modal-message__feedback-btn--no">Não agora</button>
      </div>
    </div>
  </div>
);

const CigaretteLogModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [context, setContext] = React.useState('');
  const [note, setNote] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [messageData, setMessageData] = React.useState(null);
  const contexts = ['Ansiedade', 'Hábito', 'Social', 'Cansaço', 'Estresse', 'Tédio'];

  React.useEffect(() => {
    if (open) { setSubmitted(false); setContext(''); setNote(''); setError(''); setMessageData(null); }
  }, [open]);

  const handleRegister = async () => {
    if (!context) { setError('Selecione o contexto'); return; }
    setLoading(true);
    setError('');
    try {
      await Events.create('CIGARETTE_SMOKED', null, context, note, new Date().toISOString());
      window.dispatchEvent(new CustomEvent('craving-logged'));
      const user = getStoredUser();
      try {
        const msg = await Messages.select({
          craving: 5,
          anxiety: 5,
          trigger: normalizeGatilho(context),
          daysSmokeFree: calcDays(user?.quitDate),
          recaida: true,
        });
        setMessageData(msg);
      } catch { }
      setSubmitted(true);
    } catch {
      setError('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (foiUtil) => {
    if (messageData?.historyId) {
      try { await Messages.feedback(messageData.historyId, foiUtil); } catch { }
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="modal-box">
        {submitted ? (
          messageData ? (
            <MessageCard
              messageData={messageData}
              title="Registrado."
              onFeedback={handleFeedback}
              onClose={onClose}
              navigate={navigate}
            />
          ) : (
            <div className="modal-success">
              <div className="modal-success__icon">
                <Icon name="Check" size={32} color="var(--color-primary)" />
              </div>
              <h3 className="modal-success__title">Registrado.</h3>
              <p className="modal-success__text">Sem julgamentos. Cada registro é um dado que te ajuda a entender seus padrões.</p>
              <button onClick={onClose} className="modal-success__close">Fechar</button>
            </div>
          )
        ) : (
          <>
            <div className="modal-header">
              <h3 className="modal-header__title">O que aconteceu?</h3>
              <button onClick={onClose} className="modal-icon-btn">
                <Icon name="X" size={20} color="#999" />
              </button>
            </div>
            <label className="modal-field-label">Contexto</label>
            <div className="modal-triggers-row">
              {contexts.map(c => (
                <button key={c} onClick={() => setContext(c)}
                  className={`modal-trigger-btn ${context === c ? 'modal-trigger-btn--active' : 'modal-trigger-btn--inactive'}`}
                >{c}</button>
              ))}
            </div>
            <label className="modal-field-label">Observação (opcional)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)}
              placeholder="O que estava acontecendo..." className="modal-textarea" />
            {error && (
              <div className="modal-error">
                <Icon name="AlertCircle" size={14} color="#DC2626" />{error}
              </div>
            )}
            <button onClick={handleRegister} disabled={loading || !context} className="modal-submit-btn modal-submit-btn--danger">
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const Sidebar = ({ activePage, onNavigate, onLogout, open, onClose }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
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
          <LogCravingButton onClick={() => setModalOpen(true)} />
          <LogCigaretteButton onClick={() => setCigaretteModalOpen(true)} />
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
                <Icon name={item.icon} size={18} color={active ? 'var(--color-primary)' : '#999'} />
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
      <CigaretteLogModal open={cigaretteModalOpen} onClose={() => setCigaretteModalOpen(false)} />
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
