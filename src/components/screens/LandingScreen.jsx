import React from 'react';
import { Icon } from '../../lib/icons';
import { Card } from '../ui/Card';
import heroImage from '../../assets/hero.png';
import '../../styles/screens/LandingScreen.css';

export const LandingScreen = ({ onStart, onLogin }) => {
  const [methodologyOpen, setMethodologyOpen] = React.useState(false);

  const digitalBenefits = [
    { title: 'Apoio em tempo real', description: 'No momento em que a vontade aperta, estamos lá.', icon: 'Bell' },
    { title: 'Protocolos validados', description: 'Metodologia baseada em revisões sistemáticas de milhares de casos reais.', icon: 'Shield' },
  ];

  const relapseTools = [
    { title: 'Mapeamento de Gatilhos', description: 'Identifique padrões emocionais e situações que levam ao desejo de fumar.', icon: 'Target' },
    { title: 'Prevenção de Recaídas', description: 'Antecipe-se aos sintomas de abstinência com estratégias personalizadas de enfrentamento.', icon: 'Zap' },
    { title: 'Diário de Progresso', description: 'Transforme dados em consciência e controle sobre sua rotina.', icon: 'BarChart3' },
  ];

  const wellbeingTools = [
    { title: 'Terapia de Aceitação e Compromisso (ACT)', description: 'Use ferramentas de relaxamento e foco para lidar com a ansiedade de forma saudável.', icon: 'Heart' },
    { title: 'Foco no Bem-estar', description: 'Melhora comprovada no humor e na qualidade de vida logo nas primeiras semanas.', icon: 'Smile' },
  ];

  const progressItems = [
    { title: 'Recuperação de Expectativa de Vida', description: 'Veja os anos de vida que você "ganha de volta" conforme o tempo passa, com base em estudos longitudinais.', icon: 'TrendingUp' },
    { title: 'Impacto Financeiro', description: 'Calcule a economia direta e a redução de custos futuros com tratamentos de saúde.', icon: 'Globe' },
    { title: 'Capacidade Pulmonar', description: 'Gráficos que mostram a desintoxicação do seu organismo em tempo real.', icon: 'Wind' },
    { title: 'Produtividade', description: 'Sinta a melhora na sua energia diária e foco no trabalho.', icon: 'Coffee' },
  ];

  const authorityItems = [
    'Cochrane Library: Validação de eficácia mHealth.',
    'British Medical Journal (BMJ): Dados sobre recuperação mental e física.',
    'Journal of Consulting and Clinical Psychology: Estratégias de monitoramento de comportamento.',
  ];

  const faqItems = [
    { question: 'O aplicativo realmente funciona melhor que métodos tradicionais?', answer: 'Sim. Segundo a revisão da Cochrane (2019), o suporte digital personalizado oferece uma camada de engajamento que métodos passivos (como panfletos ou apenas força de vontade) não conseguem atingir.' },
    { question: 'Vou ficar mais ansioso ao parar?', answer: 'É um mito comum. Embora os primeiros dias sejam desafiadores, estudos de longo prazo mostram que ex-fumantes ficam significativamente menos ansiosos e mais felizes do que quando fumavam.' },
  ];

  return (
    <div className="landing">
      <div className="landing__bg">
        <div className="landing__bg-blob--top" />
        <div className="landing__bg-blob--bottom" />
      </div>

      <div className="landing__container">
        <header className="landing__header">
          <div>
            <div className="landing__logo-name">0 Fumo</div>
            <div className="landing__logo-tagline">Sua nova jornada</div>
          </div>
          <button onClick={onLogin} className="landing__login-btn">Entrar com minha conta</button>
        </header>

        <section className="landing__hero">
          <div className="landing-fade landing-stagger-1">
            <div className="landing__hero-badge">
              <Icon name="Shield" size={14} color="var(--color-primary)" />
              Baseado em evidências clínicas
            </div>
            <h1 className="landing__hero-title">Liberte-se do cigarro com o suporte da ciência, não apenas da força de vontade.</h1>
            <p className="landing__hero-desc">Um guia digital personalizado que utiliza protocolos validados por Harvard e Cochrane para ajudar você a vencer a fissura, reduzir a ansiedade e retomar sua saúde.</p>
            <div className="landing__hero-actions">
              <button onClick={onStart} className="landing__cta-btn">Começar minha jornada gratuita</button>
            </div>
          </div>

          <div className="landing-fade landing-stagger-2 landing__hero-media">
            <div className="landing__hero-img-wrap">
              <img src={heroImage} alt="Pessoa respirando ao ar livre com o app 0 Fumo" className="landing__hero-img" />
            </div>
            <div className="landing__hero-card">
              <div className="landing__hero-card-icon">
                <Icon name="Heart" size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div className="landing__hero-card-title">Mais calma, mais controle</div>
                <div className="landing__hero-card-sub">Um plano diario que guia suas escolhas com leveza.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing__section">
          <div className="landing-fade landing-stagger-3 landing__section-header">
            <div className="landing__section-eyebrow">Por que um acompanhamento digital?</div>
            <h2 className="landing__section-title">O seu aliado de bolso, 24 horas por dia.</h2>
            <p className="landing__section-desc">Estudos da Cochrane Database, a fonte mais respeitada na medicina mundial, comprovam: o uso de intervenções via aplicativo aumenta significativamente as taxas de sucesso na cessação do tabagismo em comparação com quem tenta parar sozinho.</p>
          </div>
          <div className="landing__cards-grid">
            {digitalBenefits.map(item => (
              <Card key={item.title} className="card--pad-sm">
                <div className="landing__feature-header">
                  <div className="landing__feature-icon landing__feature-icon--primary">
                    <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <span className="landing__feature-title">{item.title}</span>
                </div>
                <p className="landing__feature-desc">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="landing__section">
          <div className="landing__section-header">
            <div className="landing__section-eyebrow">Recursos Principais: Inteligência contra a Recaída</div>
            <h2 className="landing__section-title">Entenda seus gatilhos antes que eles dominem você.</h2>
            <p className="landing__section-desc">Não é apenas sobre "parar", é sobre entender o porquê. Nosso sistema de Avaliação Momentânea Ecológica (EMA) permite que você registre humor e estresse no exato momento da fissura.</p>
          </div>
          <div className="landing__cards-grid">
            {relapseTools.map(item => (
              <Card key={item.title} className="card--pad-sm">
                <div className="landing__feature-header">
                  <div className="landing__feature-icon landing__feature-icon--green">
                    <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <span className="landing__feature-title">{item.title}</span>
                </div>
                <p className="landing__feature-desc">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="landing__section">
          <div className="landing__section-header">
            <div className="landing__section-eyebrow">O Mito do "Cigarro Relaxante"</div>
            <h2 className="landing__section-title">Menos cigarro, muito menos ansiedade.</h2>
            <p className="landing__section-desc">Você sente que o cigarro acalma? A ciência mostra o contrário. Estudos publicados no British Medical Journal (BMJ) revelam que parar de fumar tem um efeito na saúde mental comparável ao de antidepressivos, reduzindo drasticamente os níveis de estresse e depressão.</p>
          </div>
          <div className="landing__cards-grid">
            {wellbeingTools.map(item => (
              <Card key={item.title} className="card--pad-sm">
                <div className="landing__feature-header">
                  <div className="landing__feature-icon landing__feature-icon--warm">
                    <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <span className="landing__feature-title">{item.title}</span>
                </div>
                <p className="landing__feature-desc">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="landing__section">
          <div className="landing__section-header">
            <div className="landing__section-eyebrow">Seu Progresso em Números</div>
            <h2 className="landing__section-title">O que você ganha ao dizer adeus ao tabaco.</h2>
            <p className="landing__section-desc">Acompanhe visualmente sua evolução através de indicadores baseados em 50 anos de observações clínicas.</p>
          </div>
          <div className="landing__tags">
            <span className="landing__tag--health">Saúde</span>
            <span className="landing__tag--economy">Economia</span>
          </div>
          <div className="landing__cards-grid landing__cards-grid--4col">
            {progressItems.map(item => (
              <Card key={item.title} className="card--pad-sm">
                <div className="landing__feature-header">
                  <div className="landing__feature-icon landing__feature-icon--mint">
                    <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <span className="landing__feature-title">{item.title}</span>
                </div>
                <p className="landing__feature-desc">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="landing__section">
          <div className="landing__faq-header">
            <h2 className="landing__faq-title">Perguntas frequentes</h2>
          </div>
          <div className="landing__faq-grid">
            {faqItems.map(item => (
              <Card key={item.question} className="card--pad-sm">
                <div className="landing__faq-question">{item.question}</div>
                <div className="landing__faq-answer">{item.answer}</div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="landing__cta-section">
            <div>
              <div className="landing__cta-section-title">Pronto para começar?</div>
              <div className="landing__cta-section-sub">Sua jornada gratuita pode iniciar agora, com suporte personalizado.</div>
            </div>
            <button onClick={onStart} className="landing__cta-section-btn">Começar minha jornada gratuita</button>
          </div>
        </section>

        <footer className="landing__footer">
          <div className="landing__footer-text">Nosso compromisso é com a evidência.</div>
          <button onClick={() => setMethodologyOpen(true)} className="landing__footer-link">Saiba mais sobre nossa metodologia</button>
        </footer>

        {methodologyOpen && (
          <div className="methodology-overlay" onClick={() => setMethodologyOpen(false)}>
            <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} className="methodology-box">
              <div className="methodology-header">
                <div className="methodology-header__title">Nossa metodologia em detalhes</div>
                <button onClick={() => setMethodologyOpen(false)} className="methodology-header__close">
                  <Icon name="X" size={18} color="#667085" />
                </button>
              </div>
              <p className="methodology-desc">As fontes abaixo embasam nossos protocolos e comunicação clínica.</p>
              <div className="methodology-list">
                {authorityItems.map(item => (
                  <div key={item} className="methodology-list__item">
                    <Icon name="Check" size={14} color="var(--color-primary)" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
