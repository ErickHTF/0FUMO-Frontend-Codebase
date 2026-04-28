import React from 'react';
import { Icon } from '../../lib/icons';
import { Auth, saveSession } from '../../lib/api';
import '../../styles/screens/LoginScreen.css';

export const LoginScreen = ({ onSuccess, onBack, isDarkMode, onToggleDarkMode }) => {
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
      if (err.status === 401) {
        setError('E-mail ou senha inválidos.');
      } else if (err.status === 400 && err.body) {
        setError(Object.values(err.body).join(' '));
      } else {
        setError('Erro ao entrar. Tente novamente.');
      }
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

          <div className="login__form-topbar">
            <button onClick={onBack} className="login__back">
              <Icon name="ArrowLeft" size={15} color="var(--color-text-secondary)" />
              Voltar
            </button>
            <button onClick={onToggleDarkMode} className="login__theme-btn" aria-label="Alternar modo escuro">
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={17} color="var(--color-text-secondary)" />
            </button>
          </div>

          <div className="login__form-header">
            <h2 className="login__form-title">Entre na sua conta</h2>
            <p className="login__form-sub">Continue de onde parou.</p>
          </div>

          {error && (
            <div className="login__error">
              <Icon name="AlertCircle" size={15} color="#DC2626" />
              {error}
            </div>
          )}

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
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="login__password-toggle"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} color="var(--color-muted)" />
                </button>
              </div>
            </div>

            <button type="submit" disabled={!canSubmit} className="login__submit">
              {loading ? (
                <><span className="login__spinner" />Entrando...</>
              ) : (
                <>Entrar <Icon name="ArrowRight" size={16} color="#fff" /></>
              )}
            </button>
          </form>

          <div className="login__signup-link">
            Não tem conta?{' '}
            <button type="button" onClick={onBack}>Criar conta gratuita</button>
          </div>
        </div>
      </div>
    </div>
  );
};
