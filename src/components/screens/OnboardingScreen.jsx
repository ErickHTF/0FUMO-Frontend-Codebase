import React from 'react';
import { Icon } from '../../lib/icons';
import { Card } from '../ui/Card';
import '../../styles/screens/OnboardingScreen.css';

// ── Data constants ─────────────────────────────────────────
const TIMES = ['Menos de 1 ano', '1 a 5 anos', 'Mais de 5 anos'];

const MOTIVOS = [
  { id: 'saude',     label: 'Saúde',      icon: 'Heart' },
  { id: 'familia',   label: 'Família',    icon: 'Users' },
  { id: 'economia',  label: 'Economia',   icon: 'TrendingUp' },
  { id: 'liberdade', label: 'Liberdade',  icon: 'Wind' },
];

const PACK_COSTS = [
  { id: 'r5_8',    label: 'R$ 5,00 a R$ 8,00' },
  { id: 'r9_12',   label: 'R$ 9,00 a R$ 12,00' },
  { id: 'r13_16',  label: 'R$ 13,00 a R$ 16,00' },
  { id: 'r17plus', label: 'Acima de R$ 17,00' },
];

const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentário (não pratico)' },
  { id: '1_2x',      label: '1 a 2 vezes por semana' },
  { id: '3x_plus',   label: '3 ou mais vezes por semana' },
];

const SYMPTOMS = [
  { id: 'cough',   label: 'Tosse persistente (principalmente ao acordar)' },
  { id: 'breath',  label: 'Falta de ar ao subir escadas ou caminhar rápido' },
  { id: 'fatigue', label: 'Cansaço excessivo ou falta de energia' },
  { id: 'smell',   label: 'Diminuição no olfato ou paladar' },
  { id: 'none',    label: 'Nenhum desses sintomas' },
];

const TRIGGER_MOMENTS = [
  { id: 'morning',    label: 'Logo ao acordar (antes de 30 min)' },
  { id: 'stress',     label: 'Situações de estresse ou pressão' },
  { id: 'social',     label: 'Momentos sociais acompanhados de bebida' },
  { id: 'after_meal', label: 'Imediatamente após as refeições' },
  { id: 'boredom',    label: 'Momentos de tédio ou espera' },
];

const RITUALS = [
  { id: 'coffee',      label: 'Beber café' },
  { id: 'driving',     label: 'Dirigir ou enfrentar o trânsito' },
  { id: 'work_break',  label: 'Pausa no trabalho (o momento "social")' },
  { id: 'phone',       label: 'Falar ao telefone ou usar o computador' },
  { id: 'alcohol',     label: 'Consumo de álcool' },
];

const MONEY_DESTINATIONS = [
  { id: 'travel',  label: 'Viagem de férias' },
  { id: 'gadget',  label: 'Comprar um novo gadget (MacBook, celular, etc.)' },
  { id: 'gastro',  label: 'Jantares e experiências gastronômicas' },
  { id: 'invest',  label: 'Investimentos ou reserva de emergência' },
];

const STRESS_COPINGS = [
  { id: 'food',      label: 'Desconto na comida (doces/lanches)' },
  { id: 'distract',  label: 'Tento me distrair com o celular' },
  { id: 'irritated', label: 'Fico irritado e não consigo focar' },
  { id: 'breathing', label: 'Uso técnicas de respiração ou meditação' },
  { id: 'water',     label: 'Bebo água ou café' },
];

const QUIT_ATTEMPTS = [
  { id: 'never', label: 'Nunca tentei antes' },
  { id: '1_2',   label: '1 a 2 vezes' },
  { id: '3_5',   label: '3 a 5 vezes' },
  { id: '5plus', label: 'Mais de 5 vezes' },
];

const LONGEST_QUIT = [
  { id: 'never',       label: 'Nunca tentei parar' },
  { id: 'week',        label: 'Menos de 1 semana' },
  { id: 'month',       label: '1 semana a 1 mês' },
  { id: '6months',     label: '1 mês a 6 meses' },
  { id: '6months_plus',label: 'Mais de 6 meses' },
];

const QUIT_DIFFICULTIES = [
  { id: 'mood',           label: 'Mudanças de humor e irritabilidade extrema' },
  { id: 'weight',         label: 'Ganho de peso e aumento do apetite' },
  { id: 'social_pressure',label: 'Pressão de amigos ou familiares que fumam' },
  { id: 'physical',       label: 'Sintomas físicos (dor de cabeça, tontura, insônia)' },
  { id: 'leisure',        label: 'Vontade súbita em momentos de lazer' },
];

// ── Toast messages ─────────────────────────────────────────
function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

function getToastMessage(nextStep, packCost, moneyDestination) {
  if (nextStep === 4) {
    if (packCost === 'r17plus') {
      return 'R$ 17 por maço? Em 1 ano sem fumar você economiza mais de R$ 6.000 — dá pra pagar uma viagem internacional.';
    }
    return 'Cada maço que você não comprar vai direto pro seu bolso. Vamos calcular isso juntos.';
  }
  if (nextStep === 6) {
    const msgs = {
      travel: [
        'O passaporte já está coçando? Seu próximo check-in está sendo financiado agora.',
        'Troque o cinzeiro por milhas. A brisa do mar está mais perto do que você imagina.',
        'Sua próxima viagem está sendo paga pela sua saúde. Belo trade-off.',
      ],
      gadget: [
        'Seu novo setup agradece cada maço evitado. O upgrade está chegando.',
        'Hardware novo com o dinheiro do cigarro? Um investimento justo no seu trabalho.',
        'A cada dia sem fumar, você chega mais perto do dispositivo dos seus sonhos.',
      ],
      gastro: [
        'Menos nicotina, mais paladar. Sua reserva para jantares incríveis está crescendo.',
        'Alta gastronomia financiada pela sua disciplina. Aproveite cada sabor.',
        'O paladar recuperado e a conta paga: a combinação perfeita para o seu próximo jantar.',
      ],
      invest: [
        'O melhor aporte do mês é a sua longevidade. Juros compostos de saúde e dinheiro.',
        'Saúde no verde, gastos no vermelho. O gráfico do seu futuro está excelente.',
        'Sua carteira de investimentos agradece. O aporte na sua saúde rende 100% de lucro.',
      ],
      default: [
        'Um dia de cada vez, um real de cada vez. O progresso é constante.',
        'Você está construindo um novo hábito e um saldo muito mais saudável.',
        'Foco no objetivo. Cada escolha de hoje constrói o seu resultado de amanhã.',
      ],
    };

    const categoryMsgs = msgs[moneyDestination] || msgs.default;
    return getRandomMessage(categoryMsgs);
  }
  return null;
}

// ── Shared sub-components ──────────────────────────────────
const EtapaHeader = ({ etapa, title }) => (
  <div className="onboarding__etapa-header">
    <span className="onboarding__etapa-label">{etapa}</span>
    <h3 className="onboarding__etapa-title">{title}</h3>
  </div>
);

const RadioBtn = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`onboarding__radio-btn ${active ? 'onboarding__radio-btn--active' : 'onboarding__radio-btn--inactive'}`}>
    <span className={`onboarding__radio-dot${active ? ' onboarding__radio-dot--active' : ''}`} />
    {label}
  </button>
);

const CheckBtn = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`onboarding__check-btn ${active ? 'onboarding__check-btn--active' : 'onboarding__check-btn--inactive'}`}>
    <span className={`onboarding__check-box${active ? ' onboarding__check-box--active' : ''}`}>
      {active && <Icon name="Check" size={11} color="#fff" />}
    </span>
    {label}
  </button>
);

// ── Main component ─────────────────────────────────────────
const TOTAL_STEPS = 8;

export const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = React.useState(0);
  const [toast, setToast] = React.useState(null);

  // Step 0–1
  const [cigs, setCigs] = React.useState('');
  const [smokingTime, setSmokingTime] = React.useState('');
  const [motivosSel, setMotivosSel] = React.useState(new Set());

  // Etapa 1 — Perfil físico e financeiro
  const [physioData, setPhysioData] = React.useState({
    birthDate: '',
    packCost: '',
    activity: '',
    symptoms: new Set(),
  });

  // Etapa 2 — Hábitos e gatilhos
  const [behavioralData, setBehavioralData] = React.useState({
    triggerMoment: '',
    rituals: new Set(),
    moneyDestination: '',
  });

  // Etapa 3 — Resiliência mental
  const [mentalData, setMentalData] = React.useState({
    stressScale: 5,
    stressCoping: new Set(),
    quitAttempts: '',
    longestQuit: '',
    quitDifficulties: new Set(),
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 5500);
  };

  const goTo = (nextStep) => {
    const msg = getToastMessage(nextStep, physioData.packCost, behavioralData.moneyDestination);
    if (msg) showToast(msg);
    setStep(nextStep);
  };

  // Toggle an id inside a Set that lives inside a state object
  const toggleSetIn = (setter, key, id, exclusiveId = null) => {
    setter(prev => {
      const next = new Set(prev[key]);
      if (id === exclusiveId) return { ...prev, [key]: new Set([exclusiveId]) };
      if (exclusiveId) next.delete(exclusiveId);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, [key]: next };
    });
  };

  const toggleBehavioralSet = (key, id) =>
    setBehavioralData(prev => {
      const next = new Set(prev[key]);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, [key]: next };
    });

  const toggleMentalSet = (key, id) =>
    setMentalData(prev => {
      const next = new Set(prev[key]);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, [key]: next };
    });

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const step7Valid =
    mentalData.quitAttempts &&
    mentalData.longestQuit &&
    (mentalData.quitAttempts === 'never' || mentalData.quitDifficulties.size > 0);

  // Final JSON payload (ready for Spring Boot)
  const buildPayload = () => ({
    profile: {
      cigsPerDay: Number(cigs),
      smokingTime,
      motives: [...motivosSel],
    },
    physio: {
      birthDate: physioData.birthDate,
      packCost: physioData.packCost,
      activity: physioData.activity,
      symptoms: [...physioData.symptoms],
    },
    behavioral: {
      triggerMoment: behavioralData.triggerMoment,
      rituals: [...behavioralData.rituals],
      moneyDestination: behavioralData.moneyDestination,
    },
    mental: {
      stressScale: mentalData.stressScale,
      stressCoping: [...mentalData.stressCoping],
      quitAttempts: mentalData.quitAttempts,
      longestQuit: mentalData.longestQuit,
      quitDifficulties: [...mentalData.quitDifficulties],
    },
  });

  return (
    <div className="onboarding">

      {toast && (
        <div className="onboarding__toast">
          <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
          <span className="onboarding__toast-text">{toast}</span>
          <button onClick={() => setToast(null)} className="onboarding__toast-close">
            <Icon name="X" size={13} color="#999" />
          </button>
        </div>
      )}

      <div className="onboarding__brand">
        <div className="onboarding__brand-name">0 Fumo</div>
        {step === 0 && <div className="onboarding__brand-sub">Sua jornada começa aqui. Vamos juntos.</div>}
      </div>

      {step < TOTAL_STEPS && (
        <div className="onboarding__progress">
          <div className="onboarding__progress-track">
            <div className="onboarding__progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="onboarding__progress-label">{progress}% concluído</span>
        </div>
      )}

      {/* ── Step 0: Cigarros + Tempo ─────────────────────── */}
      {step === 0 && (
        <Card className="card--pad-lg">
          <h2 className="onboarding__card-title">Personalize sua jornada</h2>
          <p className="onboarding__card-sub">Entender seu momento atual nos ajuda a criar um plano sob medida para você.</p>
          <label className="onboarding__field-label">Quantos cigarros por dia?</label>
          <input type="number" value={cigs} onChange={e => setCigs(e.target.value)} placeholder="Ex: 15" className="onboarding__input" />
          <label className="onboarding__field-label">Há quanto tempo fuma?</label>
          <div className="onboarding__time-row">
            {TIMES.map(t => (
              <button key={t} onClick={() => setSmokingTime(t)} className={`onboarding__time-btn ${smokingTime === t ? 'onboarding__time-btn--active' : 'onboarding__time-btn--inactive'}`}>{t}</button>
            ))}
          </div>
          <button onClick={() => goTo(1)} disabled={!cigs || !smokingTime} className={`onboarding__btn-primary ${cigs && smokingTime ? 'onboarding__btn-primary--active' : 'onboarding__btn-primary--disabled'}`}>Continuar</button>
        </Card>
      )}

      {/* ── Step 1: Motivos ──────────────────────────────── */}
      {step === 1 && (
        <Card className="card--pad-lg">
          <h2 className="onboarding__card-title">Quais os seus motivos para parar?</h2>
          <p className="onboarding__card-sub">Escolha quantos quiser. Vamos lembrar disso nos momentos difíceis.</p>
          <div className="onboarding__motivos-grid">
            {MOTIVOS.map(m => {
              const active = motivosSel.has(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => setMotivosSel(prev => { const n = new Set(prev); n.has(m.id) ? n.delete(m.id) : n.add(m.id); return n; })}
                  className={`onboarding__motivo-btn ${active ? 'onboarding__motivo-btn--active' : 'onboarding__motivo-btn--inactive'}`}
                >
                  <Icon name={m.icon} size={24} color={active ? 'var(--color-primary)' : '#999'} />
                  <span className={`onboarding__motivo-label ${active ? 'onboarding__motivo-label--active' : 'onboarding__motivo-label--inactive'}`}>{m.label}</span>
                </button>
              );
            })}
          </div>
          <div className="onboarding__actions">
            <button onClick={() => goTo(0)} className="onboarding__btn-secondary">Voltar</button>
            <button onClick={() => goTo(2)} disabled={motivosSel.size === 0} className={`onboarding__btn-continue ${motivosSel.size > 0 ? 'onboarding__btn-continue--active' : 'onboarding__btn-continue--disabled'}`}>Continuar</button>
          </div>
        </Card>
      )}

      {/* ── Step 2: Etapa 1 — Data + Custo do maço ──────── */}
      {step === 2 && (
        <Card className="card--pad-lg">
          <EtapaHeader etapa="Etapa 1 de 3 — Perfil" title="Impacto físico e financeiro" />
          <label className="onboarding__field-label">Qual sua data de nascimento?</label>
          <input type="date" value={physioData.birthDate} onChange={e => setPhysioData(p => ({ ...p, birthDate: e.target.value }))} className="onboarding__input" />
          <label className="onboarding__field-label">Quanto custa, em média, o maço que você fuma?</label>
          <div className="onboarding__options-col">
            {PACK_COSTS.map(opt => (
              <RadioBtn key={opt.id} label={opt.label} active={physioData.packCost === opt.id} onClick={() => setPhysioData(p => ({ ...p, packCost: opt.id }))} />
            ))}
          </div>
          <div className="onboarding__actions">
            <button onClick={() => goTo(1)} className="onboarding__btn-secondary">Voltar</button>
            <button onClick={() => goTo(3)} disabled={!physioData.birthDate || !physioData.packCost} className={`onboarding__btn-continue ${physioData.birthDate && physioData.packCost ? 'onboarding__btn-continue--active' : 'onboarding__btn-continue--disabled'}`}>Continuar</button>
          </div>
        </Card>
      )}

      {/* ── Step 3: Etapa 1 — Atividade + Sintomas ──────── */}
      {step === 3 && (
        <Card className="card--pad-lg">
          <EtapaHeader etapa="Etapa 1 de 3 — Perfil" title="Impacto físico e financeiro" />
          <label className="onboarding__field-label">Você pratica alguma atividade física regularmente?</label>
          <div className="onboarding__options-col">
            {ACTIVITY_LEVELS.map(opt => (
              <RadioBtn key={opt.id} label={opt.label} active={physioData.activity === opt.id} onClick={() => setPhysioData(p => ({ ...p, activity: opt.id }))} />
            ))}
          </div>
          <label className="onboarding__field-label">Você já sente algum desses sintomas com frequência?</label>
          <div className="onboarding__options-col">
            {SYMPTOMS.map(opt => (
              <CheckBtn key={opt.id} label={opt.label} active={physioData.symptoms.has(opt.id)} onClick={() => toggleSetIn(setPhysioData, 'symptoms', opt.id, 'none')} />
            ))}
          </div>
          <div className="onboarding__actions">
            <button onClick={() => goTo(2)} className="onboarding__btn-secondary">Voltar</button>
            <button onClick={() => goTo(4)} disabled={!physioData.activity || physioData.symptoms.size === 0} className={`onboarding__btn-continue ${physioData.activity && physioData.symptoms.size > 0 ? 'onboarding__btn-continue--active' : 'onboarding__btn-continue--disabled'}`}>Continuar</button>
          </div>
        </Card>
      )}

      {/* ── Step 4: Etapa 2 — Momentos + Rituais ────────── */}
      {step === 4 && (
        <Card className="card--pad-lg">
          <EtapaHeader etapa="Etapa 2 de 3 — Hábitos" title="Mapeamento de gatilhos" />
          <label className="onboarding__field-label">Quando a vontade de fumar é mais forte?</label>
          <div className="onboarding__options-col">
            {TRIGGER_MOMENTS.map(opt => (
              <RadioBtn key={opt.id} label={opt.label} active={behavioralData.triggerMoment === opt.id} onClick={() => setBehavioralData(p => ({ ...p, triggerMoment: opt.id }))} />
            ))}
          </div>
          <label className="onboarding__field-label">Quais são seus "rituais" associados ao fumo?</label>
          <div className="onboarding__options-col">
            {RITUALS.map(opt => (
              <CheckBtn key={opt.id} label={opt.label} active={behavioralData.rituals.has(opt.id)} onClick={() => toggleBehavioralSet('rituals', opt.id)} />
            ))}
          </div>
          <div className="onboarding__actions">
            <button onClick={() => goTo(3)} className="onboarding__btn-secondary">Voltar</button>
            <button onClick={() => goTo(5)} disabled={!behavioralData.triggerMoment || behavioralData.rituals.size === 0} className={`onboarding__btn-continue ${behavioralData.triggerMoment && behavioralData.rituals.size > 0 ? 'onboarding__btn-continue--active' : 'onboarding__btn-continue--disabled'}`}>Continuar</button>
          </div>
        </Card>
      )}

      {/* ── Step 5: Etapa 2 — Destino do dinheiro ───────── */}
      {step === 5 && (
        <Card className="card--pad-lg">
          <EtapaHeader etapa="Etapa 2 de 3 — Hábitos" title="Mapeamento de gatilhos" />
          <label className="onboarding__field-label">Para onde iria o dinheiro economizado em 1 ano sem fumar?</label>
          <div className="onboarding__options-col">
            {MONEY_DESTINATIONS.map(opt => (
              <RadioBtn key={opt.id} label={opt.label} active={behavioralData.moneyDestination === opt.id} onClick={() => setBehavioralData(p => ({ ...p, moneyDestination: opt.id }))} />
            ))}
          </div>
          <div className="onboarding__actions">
            <button onClick={() => goTo(4)} className="onboarding__btn-secondary">Voltar</button>
            <button onClick={() => goTo(6)} disabled={!behavioralData.moneyDestination} className={`onboarding__btn-continue ${behavioralData.moneyDestination ? 'onboarding__btn-continue--active' : 'onboarding__btn-continue--disabled'}`}>Continuar</button>
          </div>
        </Card>
      )}

      {/* ── Step 6: Etapa 3 — Escala + Coping ───────────── */}
      {step === 6 && (
        <Card className="card--pad-lg">
          <EtapaHeader etapa="Etapa 3 de 3 — Resiliência" title="Saúde mental e histórico" />
          <label className="onboarding__field-label">O quanto o cigarro é sua ferramenta para lidar com estresse ou ansiedade?</label>
          <p className="onboarding__field-hint">0 = Nada &nbsp;·&nbsp; 10 = Completamente dependente</p>
          <div className="onboarding__stress-scale">
            {[0,1,2,3,4,5,6,7,8,9,10].map(v => (
              <button key={v} onClick={() => setMentalData(p => ({ ...p, stressScale: v }))} className={`onboarding__stress-btn ${mentalData.stressScale === v ? 'onboarding__stress-btn--active' : 'onboarding__stress-btn--inactive'}`}>{v}</button>
            ))}
          </div>
          <label className="onboarding__field-label">O que você faz quando está estressado e não pode fumar?</label>
          <div className="onboarding__options-col">
            {STRESS_COPINGS.map(opt => (
              <CheckBtn key={opt.id} label={opt.label} active={mentalData.stressCoping.has(opt.id)} onClick={() => toggleMentalSet('stressCoping', opt.id)} />
            ))}
          </div>
          <div className="onboarding__actions">
            <button onClick={() => goTo(5)} className="onboarding__btn-secondary">Voltar</button>
            <button onClick={() => goTo(7)} disabled={mentalData.stressCoping.size === 0} className={`onboarding__btn-continue ${mentalData.stressCoping.size > 0 ? 'onboarding__btn-continue--active' : 'onboarding__btn-continue--disabled'}`}>Continuar</button>
          </div>
        </Card>
      )}

      {/* ── Step 7: Etapa 3 — Tentativas + Dificuldades ──── */}
      {step === 7 && (
        <Card className="card--pad-lg">
          <EtapaHeader etapa="Etapa 3 de 3 — Resiliência" title="Saúde mental e histórico" />
          <label className="onboarding__field-label">Quantas vezes você já tentou parar de fumar seriamente?</label>
          <div className="onboarding__options-col">
            {QUIT_ATTEMPTS.map(opt => (
              <RadioBtn key={opt.id} label={opt.label} active={mentalData.quitAttempts === opt.id} onClick={() => setMentalData(p => ({ ...p, quitAttempts: opt.id, quitDifficulties: new Set() }))} />
            ))}
          </div>
          <label className="onboarding__field-label">Qual foi o período mais longo sem fumar?</label>
          <div className="onboarding__options-col">
            {LONGEST_QUIT.map(opt => (
              <RadioBtn key={opt.id} label={opt.label} active={mentalData.longestQuit === opt.id} onClick={() => setMentalData(p => ({ ...p, longestQuit: opt.id }))} />
            ))}
          </div>
          {mentalData.quitAttempts && mentalData.quitAttempts !== 'never' && (
            <>
              <label className="onboarding__field-label">O que foi mais difícil nas tentativas anteriores?</label>
              <div className="onboarding__options-col">
                {QUIT_DIFFICULTIES.map(opt => (
                  <CheckBtn key={opt.id} label={opt.label} active={mentalData.quitDifficulties.has(opt.id)} onClick={() => toggleMentalSet('quitDifficulties', opt.id)} />
                ))}
              </div>
            </>
          )}
          <div className="onboarding__actions">
            <button onClick={() => goTo(6)} className="onboarding__btn-secondary">Voltar</button>
            <button
              onClick={() => { goTo(8); }}
              disabled={!step7Valid}
              className={`onboarding__btn-continue ${step7Valid ? 'onboarding__btn-continue--active' : 'onboarding__btn-continue--disabled'}`}
            >Finalizar</button>
          </div>
        </Card>
      )}

      {/* ── Step 8: Conclusão ────────────────────────────── */}
      {step === 8 && (
        <Card className="card--pad-lg card--text-center">
          <div className="onboarding__success-icon">
            <Icon name="Check" size={36} color="var(--color-primary)" />
          </div>
          <h2 className="onboarding__success-title">Tudo pronto!</h2>
          <p className="onboarding__success-text">
            Sua jornada de {cigs} cigarros por dia para zero começa agora. Estaremos com você em cada momento.
          </p>
          <button onClick={() => onComplete({ cigs, packCost: physioData.packCost })} className="onboarding__start-btn">Começar Jornada →</button>
          <div className="onboarding__privacy-note">Suas respostas são confidenciais</div>
        </Card>
      )}
     </div>
  );
};
