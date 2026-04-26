import React from 'react';
import { Icon } from '../../lib/icons';
import { Auth, saveSession } from '../../lib/api';
import '../../styles/screens/LoginScreen.css';

export const LoginScreen = ({ onSuccess, onBack }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = emailValid && password.length >= 1 && !loading;

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
        const msgs = Object.values(err.body).join(' ');
        setError(msgs);
      } else {
        setError('Erro ao entrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <button onClick={onBack} className="login__back">
          <Icon name="ArrowLeft" size={16} color="var(--color-text-secondary)" />
          Voltar
        </button>

        <div className="login__brand">0 Fumo</div>
        <h2 className="login__title">Entre na sua conta</h2>
        <p className="login__sub">Continue sua jornada de onde parou.</p>

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
              className={`login__input${email && !emailValid ? ' login__input--error' : ''}`}
              autoComplete="email"
            />
          </div>

          <div className="login__field">
            <label className="login__label">Senha</label>
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
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} color="#9CA3AF" />
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
  );
};
