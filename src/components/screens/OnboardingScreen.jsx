import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';
import '../../styles/screens/OnboardingScreen.css';

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
      <div className="onboarding">
        <div className="onboarding__brand">
          <div className="onboarding__brand-name">0 Fumo</div>
          <div className="onboarding__brand-sub">Sua jornada começa aqui. Vamos juntos.</div>
        </div>
        <Card className="card--pad-lg">
          <div className="onboarding__steps">
            {[0, 1, 2].map(i => (
              <div key={i} className={`onboarding__step-dot ${i === 0 ? 'onboarding__step-dot--active' : 'onboarding__step-dot--inactive'}`} />
            ))}
          </div>
          <h2 className="onboarding__card-title">Personalize sua jornada</h2>
          <p className="onboarding__card-sub">Entender seu momento atual nos ajuda a criar um plano sob medida para você.</p>
          <label className="onboarding__field-label">Quantos cigarros por dia?</label>
          <input
            type="number"
            value={cigs}
            onChange={e => setCigs(e.target.value)}
            placeholder="Ex: 15"
            className="onboarding__input"
          />
          <label className="onboarding__field-label">Há quanto tempo fuma?</label>
          <div className="onboarding__time-row">
            {times.map(t => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`onboarding__time-btn ${time === t ? 'onboarding__time-btn--active' : 'onboarding__time-btn--inactive'}`}
              >{t}</button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            disabled={!cigs || !time}
            className={`onboarding__btn-primary ${cigs && time ? 'onboarding__btn-primary--active' : 'onboarding__btn-primary--disabled'}`}
          >Continuar</button>
        </Card>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="onboarding">
        <div className="onboarding__brand">
          <div className="onboarding__brand-name">0 Fumo</div>
        </div>
        <Card className="card--pad-lg">
          <div className="onboarding__steps">
            {[0, 1, 2].map(i => (
              <div key={i} className={`onboarding__step-dot ${i <= 1 ? 'onboarding__step-dot--active' : 'onboarding__step-dot--inactive'}`} />
            ))}
          </div>
          <h2 className="onboarding__card-title">Qual o seu principal motivo para parar?</h2>
          <p className="onboarding__card-sub">Vamos lembrar disso nos momentos difíceis.</p>
          <div className="onboarding__motivos-grid">
            {motivos.map(m => (
              <button
                key={m.id}
                onClick={() => setMotivo(m.id)}
                className={`onboarding__motivo-btn ${motivo === m.id ? 'onboarding__motivo-btn--active' : 'onboarding__motivo-btn--inactive'}`}
              >
                <Icon name={m.icon} size={24} color={motivo === m.id ? 'var(--color-primary)' : '#999'} />
                <span className={`onboarding__motivo-label ${motivo === m.id ? 'onboarding__motivo-label--active' : 'onboarding__motivo-label--inactive'}`}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>
          <div className="onboarding__actions">
            <button onClick={() => setStep(0)} className="onboarding__btn-secondary">Voltar</button>
            <button
              onClick={() => setStep(2)}
              disabled={!motivo}
              className={`onboarding__btn-continue ${motivo ? 'onboarding__btn-continue--active' : 'onboarding__btn-continue--disabled'}`}
            >Continuar</button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="onboarding">
      <Card className="card--pad-lg card--text-center">
        <div className="onboarding__steps">
          {[0, 1, 2].map(i => (
            <div key={i} className="onboarding__step-dot onboarding__step-dot--active" />
          ))}
        </div>
        <div className="onboarding__success-icon">
          <Icon name="Check" size={36} color="var(--color-primary)" />
        </div>
        <h2 className="onboarding__success-title">Tudo pronto!</h2>
        <p className="onboarding__success-text">
          Sua jornada de {cigs} cigarros por dia para zero começa agora. Estaremos com você em cada momento.
        </p>
        <button onClick={onComplete} className="onboarding__start-btn">Começar Jornada →</button>
        <div className="onboarding__privacy-note">Suas respostas são confidenciais</div>
      </Card>
    </div>
  );
};
