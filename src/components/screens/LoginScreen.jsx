import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../lib/icons';
import { Auth, saveSession } from '../../lib/api';
import '../../styles/screens/LoginScreen.css';

const GoogleIcon = () => (
  <svg className="login__social-icon" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="login__social-icon" viewBox="0 0 18 18" fill="none">
    <path d="M13.197 9.558c-.02-2.117 1.73-3.144 1.809-3.194-.988-1.443-2.52-1.64-3.065-1.658-1.302-.133-2.55.769-3.212.769-.662 0-1.677-.752-2.762-.731-1.415.021-2.72.826-3.446 2.094-1.47 2.549-.377 6.322 1.055 8.39.7 1.013 1.534 2.147 2.627 2.107 1.057-.042 1.455-.682 2.733-.682 1.278 0 1.638.682 2.752.659 1.137-.02 1.853-1.026 2.546-2.044.806-1.172 1.136-2.308 1.155-2.367-.025-.01-2.214-.848-2.192-3.343Z" fill="currentColor"/>
    <path d="M11.07 3.19C11.628 2.52 12.006 1.593 11.9.65c-.795.033-1.757.53-2.327 1.2-.512.59-.96 1.534-.84 2.44.884.068 1.786-.449 2.337-1.1Z" fill="currentColor"/>
  </svg>
);

export const LoginScreen = ({ onSuccess, onBack, isDarkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const [email,        setEmail]        = React.useState('');
  const [password,     setPassword]     = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading,      setLoading]      = React.useState(false);
  const [error,        setError]        = React.useState('');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit  = emailValid && password.length >= 1 && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setLoading(true);
    try {
      const data = await Auth.login(email, password);
      saveSession(data);
      onSuccess(data);
    } catch (err) {
      if (err.status === 401)             setError('E-mail ou senha inválidos.');
      else if (err.status === 400 && err.body) setError(Object.values(err.body).join(' '));
      else                                setError('Erro ao entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">

      {/* ── Painel esquerdo ──────────────────────────── */}
      <div className="login__left">
        <div className="login__left-bg-circle login__left-bg-circle--1" />
        <div className="login__left-bg-circle login__left-bg-circle--2" />

        <div className="login__brand-wrap">
          <span className="login__brand-name">0 Fumo</span>
          <span className="login__brand-dot" />
        </div>

        <h1 className="login__headline">
          Bem-vindo <em>de volta</em> à sua jornada.
        </h1>
        <p className="login__left-sub">
          Cada dia que você voltou conta. A consistência é mais poderosa do que a perfeição.
        </p>

        <div className="login__stats">
          {[
            { icon: 'TrendingUp', label: 'Progresso acumulado',   value: 'Ainda salvo' },
            { icon: 'Target',     label: 'Seus gatilhos mapeados', value: 'Prontos para revisar' },
            { icon: 'Heart',      label: 'Sua recuperação',        value: 'Continua onde parou' },
          ].map(s => (
            <div key={s.label} className="login__stat-card">
              <div className="login__stat-icon">
                <Icon name={s.icon} size={15} color="#6ee0ad" />
              </div>
              <div>
                <div className="login__stat-label">{s.label}</div>
                <div className="login__stat-value">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Painel direito ───────────────────────────── */}
      <div className="login__right">
        <div className="login__form-wrap">

          {/* Topbar */}
          <div className="login__form-topbar">
            <button onClick={onBack} className="login__back">
              <Icon name="ArrowLeft" size={15} color="var(--color-text-secondary)" />
              Voltar
            </button>
            <button onClick={onToggleDarkMode} className="login__theme-btn" aria-label="Alternar modo escuro">
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={17} color="var(--color-text-secondary)" />
            </button>
          </div>

          {/* Header */}
          <div className="login__form-header">
            <h2 className="login__form-title">Entre na sua conta</h2>
            <p className="login__form-sub">Continue de onde parou.</p>
          </div>

          {/* Social */}
          <div className="login__social">
            <button type="button" className="login__social-btn">
              <GoogleIcon />
              Continuar com Google
            </button>
            <button type="button" className="login__social-btn">
              <AppleIcon />
              Continuar com Apple
            </button>
          </div>

          {/* Divider */}
          <div className="login__divider">
            <div className="login__divider-line" />
            <span className="login__divider-text">ou</span>
            <div className="login__divider-line" />
          </div>

          {/* Error */}
          {error && (
            <div className="login__error">
              <Icon name="AlertCircle" size={15} color="#DC2626" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__field">
              <label className="login__label">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="seu@email.com"
                className={`login__input${email && !emailValid ? ' login__input--error' : email && emailValid ? ' login__input--success' : ''}`}
                autoComplete="email"
              />
            </div>

            <div className="login__field">
              <div className="login__label-row">
                <label className="login__label">Senha</label>
                <button type="button" className="login__forgot">Esqueceu a senha?</button>
              </div>
              <div className="login__password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Sua senha"
                  className="login__input login__input--password"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="login__password-toggle">
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} color="var(--color-muted)" />
                </button>
              </div>
            </div>

            <button type="submit" disabled={!canSubmit} className="login__submit">
              {loading
                ? <><span className="login__spinner" />Entrando...</>
                : <>Entrar <Icon name="ArrowRight" size={16} color="#fff" /></>}
            </button>
          </form>

          <div className="login__signup-link">
            Não tem conta?{' '}
            <button type="button" onClick={() => navigate('/register')}>Criar conta gratuita</button>
          </div>
        </div>
      </div>
    </div>
  );
};
