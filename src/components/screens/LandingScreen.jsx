import React from 'react';
import { Icon } from '../../lib/icons';
import { Card } from '../ui/Card';
import heroDesktop from '../../assets/desktop.jpeg';
import heroMobile from '../../assets/mobile.png';
import '../../styles/screens/LandingScreen.css';

export const LandingScreen = ({ onStart, onLogin }) => {
  const [methodologyOpen, setMethodologyOpen] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState(null);

  const digitalBenefits = [
    { title: 'Apoio em tempo real', description: 'Ajuda imediata quando a vontade aperta.', icon: 'Bell' },
    { title: 'Plano guiado', description: 'Passo a passo simples, sem pressão.', icon: 'Shield' },
  ];

  const relapseTools = [
    { title: 'Mapeamento de Gatilhos', description: 'Entenda o que te faz acender o cigarro e desarme esses momentos antes que eles aconteçam.', icon: 'Target' },
    { title: 'Prevenção de Recaídas', description: 'Estratégias rápidas para segurar a vontade.', icon: 'Zap' },
    { title: 'Diário de Progresso', description: 'Registros curtos, progresso claro.', icon: 'BarChart3' },
  ];

  const wellbeingTools = [
    { title: 'Respiração e foco', description: 'Acalme a ansiedade em minutos.', icon: 'Heart' },
    { title: 'Bem-estar no dia a dia', description: 'Mais humor, mais leveza.', icon: 'Smile' },
  ];

  const progressItems = [
    { title: 'Recuperação de Expectativa de Vida', description: 'Anos de vida recuperados ao longo do tempo.', icon: 'TrendingUp' },
    { title: 'Impacto Financeiro', description: 'Economia real no bolso.', icon: 'Globe' },
    { title: 'Capacidade Pulmonar', description: 'Respiração mais leve, dia após dia.', icon: 'Wind' },
    { title: 'Produtividade', description: 'Mais foco e disposição.', icon: 'Coffee' },
  ];

  const authorityItems = [
    'Cochrane Library: Validação de eficácia mHealth.',
    'British Medical Journal (BMJ): Dados sobre recuperação mental e física.',
    'Journal of Consulting and Clinical Psychology: Estratégias de monitoramento de comportamento.',
  ];

  const faqItems = [
    { question: 'O aplicativo realmente funciona melhor que métodos tradicionais?', answer: 'Sim. O suporte digital mantém você engajado e melhora as chances de sucesso.' },
    { question: 'Vou ficar mais ansioso ao parar?', answer: 'Os primeiros dias são desafiadores, mas a ansiedade cai com o tempo e o bem-estar aumenta.' },
  ];

  const handleToggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  return (
    <div className="landing">
      <div className="landing__bg">
        <div className="landing__bg-blob--top" />
        <div className="landing__bg-mesh" />
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
              Metodologia científica
            </div>
            <h1 className="landing__hero-title">Livre-se do cigarro com a ciência, não apenas com a força de vontade.</h1>
            <p className="landing__hero-desc">Vença a vontade de fumar com um plano personalizado. Baseado em ciência, focado na sua liberdade.</p>
            <div className="landing__hero-actions">
              <button onClick={onStart} className="landing__cta-btn">Começar minha jornada gratuita</button>
            </div>
            <p className="landing__cta-proof">Livre de riscos. Baseado em protocolos reais.</p>
          </div>

          <div className="landing-fade landing-stagger-2 landing__hero-media">
            <div className="landing__hero-img-wrap">
              <picture className="landing__hero-picture">
                <source media="(min-width: 768px)" srcSet={heroDesktop} />
                <img src={heroMobile} alt="Tela do aplicativo 0 Fumo" className="landing__hero-img" />
              </picture>
            </div>
            <div className="landing__hero-card">
              <div className="landing__hero-card-icon">
                <Icon name="Heart" size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div className="landing__hero-card-title">Mais calma, mais controle</div>
                <div className="landing__hero-card-sub">Um plano diário que guia suas escolhas com leveza.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing__section">
          <div className="landing-fade landing-stagger-3 landing__section-header">
            <div className="landing__section-eyebrow">Por que um acompanhamento digital?</div>
            <h2 className="landing__section-title">O seu aliado de bolso, 24 horas por dia.</h2>
            <p className="landing__section-desc">Suporte imediato quando a vontade aperta. Rotina simples, orientação clara.</p>
          </div>
          <div className="landing__cards-grid">
            {digitalBenefits.map(item => (
              <Card key={item.title} className="card--pad-sm landing__card">
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
            <p className="landing__section-desc">Entenda o que te faz acender o cigarro e aprenda a desarmar esses momentos antes que eles aconteçam.</p>
          </div>
          <div className="landing__cards-grid">
            {relapseTools.map(item => (
              <Card key={item.title} className="card--pad-sm landing__card">
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

        <section className="landing__section landing__section--warm">
          <div className="landing__section-header">
            <div className="landing__section-eyebrow">O Mito do "Cigarro Relaxante"</div>
            <h2 className="landing__section-title">Menos cigarro, muito menos ansiedade.</h2>
          </div>
          <div className="landing__myth-table">
            <div className="landing__myth-header">
              <span className="landing__myth-col-label landing__myth-col-label--myth">Mito</span>
              <span className="landing__myth-col-label landing__myth-col-label--fact">Fato</span>
            </div>
            {[
              { myth: 'O cigarro relaxa e reduz o estresse.', fact: 'A nicotina cria tensão basal. Parar reduz o estresse crônico em semanas.' },
              { myth: 'Vou ganhar muito peso ao parar.', fact: 'O ganho é mínimo e temporário. Os ganhos em saúde superam em muito.' },
              { myth: 'É tarde demais para o meu corpo se recuperar.', fact: 'Em 20 minutos a pressão arterial já cai. Em 1 ano, o risco cardíaco cai 50%.' },
            ].map((row, i) => (
              <div key={i} className="landing__myth-row">
                <div className="landing__myth-cell landing__myth-cell--myth">
                  <Icon name="X" size={14} color="#EF4444" />
                  <span>{row.myth}</span>
                </div>
                <div className="landing__myth-cell landing__myth-cell--fact">
                  <Icon name="Check" size={14} color="var(--color-primary)" />
                  <span>{row.fact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="landing__section">
          <div className="landing__section-header">
            <div className="landing__section-eyebrow">Seu Progresso em Números</div>
            <h2 className="landing__section-title">O que você ganha ao dizer adeus ao tabaco.</h2>
            <p className="landing__section-desc">Veja sua evolução em saúde, dinheiro e energia.</p>
          </div>
          <div className="landing__cards-grid landing__cards-grid--4col">
            {progressItems.map(item => (
              <Card key={item.title} className="card--pad-sm landing__card">
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

        <section className="landing__section landing__faq">
          <div className="landing__faq-header">
            <h2 className="landing__faq-title">Perguntas frequentes</h2>
          </div>
          <div className="landing__faq-accordion">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.question} className={`landing__faq-item${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="landing__faq-trigger"
                    onClick={() => handleToggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className="landing__faq-question">{item.question}</span>
                    <span className="landing__faq-icon">
                      <Icon name="ChevronDown" size={16} color={isOpen ? '#fff' : '#D7E3DD'} />
                    </span>
                  </button>
                  {isOpen && (
                    <div id={`faq-panel-${index}`} className="landing__faq-answer">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="landing__cta-section">
            <div>
              <div className="landing__cta-section-title">Inicie sua jornada agora.</div>
              <div className="landing__cta-section-sub">Suporte personalizado e gratuito, começando hoje.</div>
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
