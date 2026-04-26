import React from 'react';
import { Icon } from '../../lib/icons';
import { Auth } from '../../lib/api';
import '../../styles/screens/SignUpScreen.css';

const getPasswordStrength = (pw) => {
  if (pw.length === 0) return 0;
  if (pw.length < 8) return 1;
  if (pw.length < 10 || !/[0-9]/.test(pw)) return 2;
  return 3;
};

const getStrengthLabel = (s) => ['', 'Senha curta', 'Quase lá', 'Senha forte'][s];

const GoogleIcon = () => (
  <svg className="signup__social-icon" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="signup__social-icon" viewBox="0 0 18 18" fill="none">
    <path d="M13.197 9.558c-.02-2.117 1.73-3.144 1.809-3.194-.988-1.443-2.52-1.64-3.065-1.658-1.302-.133-2.55.769-3.212.769-.662 0-1.677-.752-2.762-.731-1.415.021-2.72.826-3.446 2.094-1.47 2.549-.377 6.322 1.055 8.39.7 1.013 1.534 2.147 2.627 2.107 1.057-.042 1.455-.682 2.733-.682 1.278 0 1.638.682 2.752.659 1.137-.02 1.853-1.026 2.546-2.044.806-1.172 1.136-2.308 1.155-2.367-.025-.01-2.214-.848-2.192-3.343Z" fill="currentColor"/>
    <path d="M11.07 3.19C11.628 2.52 12.006 1.593 11.9.65c-.795.033-1.757.53-2.327 1.2-.512.59-.96 1.534-.84 2.44.884.068 1.786-.449 2.337-1.1Z" fill="currentColor"/>
  </svg>
);

export const SignUpScreen = ({ onComplete, onLogin, onboardingData }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [globalError, setGlobalError] = React.useState('');

  const strength = getPasswordStrength(password);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = name.trim().length > 0 && emailValid && strength >= 2 && !loading;

  const savings = React.useMemo(() => {
    const cigs = Number(onboardingData?.cigs) || 15;
    const packCostId = onboardingData?.packCost || 'r9_12';
    const packMap = { r5_8: 6.5, r9_12: 10.5, r13_16: 14.5, r17plus: 19 };
    const pricePerPack = packMap[packCostId] || 10.5;
    const dailyCost = (cigs / 20) * pricePerPack;
    return Math.round(dailyCost * 365);
  }, [onboardingData]);

  const extraMonths = React.useMemo(() => {
    const cigs = Number(onboardingData?.cigs) || 15;
    return Math.round(cigs * 11 / 60);
  }, [onboardingData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setFieldErrors({});
    setGlobalError('');
    setLoading(true);

    try {
      const data = await Auth.register(name.trim(), email, password);
      onComplete(data);
    } catch (err) {
      if (err.status === 400 && err.body) {
        setFieldErrors(err.body);
      } else if (err.status === 409) {
        setFieldErrors({ email: err.body?.error || 'E-mail já utilizado' });
      } else {
        setGlobalError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">

      {/* ── Left panel ─────────────────────────────────── */}
      <div className="signup__left">
        <div className="signup__left-bg-circle signup__left-bg-circle--1" />
        <div className="signup__left-bg-circle signup__left-bg-circle--2" />

        <div className="signup__brand">
          <span className="signup__brand-name">0 Fumo</span>
          <span className="signup__brand-dot" />
        </div>

        <h1 className="signup__headline">
          Sua nova jornada para uma vida <em>livre</em> começa agora.
        </h1>
        <p className="signup__sub">
          Já calculamos seu plano personalizado com base nas suas respostas. Crie sua conta para acessar tudo.
        </p>

        <div className="signup__plan-label">Seu resumo de impacto</div>
        <div className="signup__plan-cards">
          <div className="signup__plan-card">
            <div className="signup__plan-card-icon">
              <Icon name="TrendingUp" size={16} color="#6ee0ad" />
            </div>
            <div>
              <div className="signup__plan-card-label">Economia estimada</div>
              <div className="signup__plan-card-value">R$ {savings.toLocaleString('pt-BR')} no 1º ano</div>
            </div>
          </div>
          <div className="signup__plan-card">
            <div className="signup__plan-card-icon">
              <Icon name="Heart" size={16} color="#6ee0ad" />
            </div>
            <div>
              <div className="signup__plan-card-label">Tempo recuperado para o que importa</div>
              <div className="signup__plan-card-value">+{extraMonths} meses recuperados</div>
            </div>
          </div>
          <div className="signup__plan-card">
            <div className="signup__plan-card-icon">
              <Icon name="Shield" size={16} color="#6ee0ad" />
            </div>
            <div>
              <div className="signup__plan-card-label">Plano ativo</div>
              <div className="signup__plan-card-value">Pronto para começar</div>
            </div>
          </div>
        </div>

        <p className="signup__plan-cta">Crie sua conta para acessar seu cronograma completo.</p>
      </div>

      {/* ── Right panel ────────────────────────────────── */}
      <div className="signup__right">
        <div className="signup__form-wrap">
          <div className="signup__form-header">
            <h2 className="signup__form-title">Crie sua conta gratuita</h2>
            <p className="signup__form-sub">Tudo pronto. Só falta você.</p>
          </div>

          <div className="signup__social">
            <button type="button" className="signup__social-btn">
              <GoogleIcon />
              Continuar com Google
            </button>
            <button type="button" className="signup__social-btn">
              <AppleIcon />
              Continuar com Apple
            </button>
          </div>

          <div className="signup__divider">
            <div className="signup__divider-line" />
            <span className="signup__divider-text">ou</span>
            <div className="signup__divider-line" />
          </div>

          {globalError && (
            <div className="signup__global-error">
              <Icon name="AlertCircle" size={15} color="#DC2626" />
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="signup__fields">

              <div className="signup__field">
                <label className="signup__field-label">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setFieldErrors(p => ({ ...p, name: '' })); }}
                  placeholder="Seu nome"
                  className={`signup__field-input${fieldErrors.name ? ' signup__field-input--error' : name.trim() ? ' signup__field-input--success' : ''}`}
                  autoComplete="name"
                />
                {fieldErrors.name && (
                  <div className="signup__field-hint signup__field-hint--warn">{fieldErrors.name}</div>
                )}
              </div>

              <div className="signup__field">
                <label className="signup__field-label">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: '' })); }}
                  placeholder="seu@email.com"
                  className={`signup__field-input${fieldErrors.email ? ' signup__field-input--error' : email && emailValid ? ' signup__field-input--success' : email ? ' signup__field-input--error' : ''}`}
                  autoComplete="email"
                />
                {(fieldErrors.email || (email && !emailValid)) && (
                  <div className="signup__field-hint signup__field-hint--warn">
                    {fieldErrors.email || 'Verifique o formato do e-mail'}
                  </div>
                )}
              </div>

              <div className="signup__field">
                <label className="signup__field-label">Senha</label>
                <div className="signup__password-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: '' })); }}
                    placeholder="Mínimo 8 caracteres"
                    className={`signup__field-input${password && strength === 1 ? ' signup__field-input--error' : password && strength >= 2 ? ' signup__field-input--success' : ''}`}
                    style={{ paddingRight: '44px' }}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="signup__password-toggle">
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} color="#9CA3AF" />
                  </button>
                </div>
                {password.length > 0 && (
                  <>
                    <div className="signup__strength">
                      {[1, 2, 3].map(n => (
                        <div
                          key={n}
                          className={`signup__strength-bar${strength >= n ? strength === 1 ? ' signup__strength-bar--weak' : strength === 2 ? ' signup__strength-bar--medium' : ' signup__strength-bar--strong' : ''}`}
                        />
                      ))}
                    </div>
                    <div className={`signup__field-hint${strength <= 1 ? ' signup__field-hint--warn' : ' signup__field-hint--ok'}`}>
                      {getStrengthLabel(strength)}
                    </div>
                  </>
                )}
                {fieldErrors.password && (
                  <div className="signup__field-hint signup__field-hint--warn">{fieldErrors.password}</div>
                )}
              </div>
            </div>

            <div className="signup__security">
              <Icon name="Lock" size={14} color="var(--color-primary)" />
              <span className="signup__security-text">
                Seus dados são confidenciais e criptografados conforme protocolos de saúde.
              </span>
            </div>

            <button type="submit" disabled={!canSubmit} className="signup__submit">
              {loading ? (
                <>
                  <span className="signup__spinner" />
                  Criando seu plano...
                </>
              ) : (
                <>
                  Ver meu plano personalizado
                  <Icon name="ArrowRight" size={16} color="#fff" />
                </>
              )}
            </button>
          </form>

          <div className="signup__login-link">
            Já tem uma conta?{' '}
            <button type="button" onClick={onLogin}>Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};


