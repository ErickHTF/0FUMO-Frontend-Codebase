import React from 'react';
import { Icon } from '../../lib/icons';
import { Card } from '../ui/Card';
import heroImage from '../../assets/hero.png';

export const LandingScreen = ({ onStart, onLogin }) => {
  const [methodologyOpen, setMethodologyOpen] = React.useState(false);
  const digitalBenefits = [
    {
      title: 'Apoio em tempo real',
      description: 'Ajuda no momento exato da fissura.',
      icon: 'Bell',
    },
    {
      title: 'Plano guiado',
      description: 'Passo a passo simples para você seguir.',
      icon: 'Shield',
    },
  ];

  const relapseTools = [
    {
      title: 'Mapeamento de Gatilhos',
      description: 'Veja quando e por que a vontade aparece.',
      icon: 'Target',
    },
    {
      title: 'Prevenção de Recaídas',
      description: 'Estratégias rápidas antes da recaída.',
      icon: 'Zap',
    },
    {
      title: 'Diário de Progresso',
      description: 'Registros curtos, progresso visível.',
      icon: 'BarChart3',
    },
  ];

  const wellbeingTools = [
    {
      title: 'Respiração e foco',
      description: 'Acalme a ansiedade em minutos.',
      icon: 'Heart',
    },
    {
      title: 'Bem-estar no dia a dia',
      description: 'Mais humor, mais energia.',
      icon: 'Smile',
    },
  ];

  const progressItems = [
    {
      title: 'Recuperação de Expectativa de Vida',
      description: 'Anos de vida recuperados ao longo do tempo.',
      icon: 'TrendingUp',
    },
    {
      title: 'Impacto Financeiro',
      description: 'Economia real no bolso.',
      icon: 'Globe',
    },
    {
      title: 'Capacidade Pulmonar',
      description: 'Pulmões mais limpos semana a semana.',
      icon: 'Wind',
    },
    {
      title: 'Produtividade',
      description: 'Mais foco e disposição.',
      icon: 'Coffee',
    },
  ];

  const authorityItems = [
    'Cochrane Library: Validação de eficácia mHealth.',
    'British Medical Journal (BMJ): Dados sobre recuperação mental e física.',
    'Journal of Consulting and Clinical Psychology: Estratégias de monitoramento de comportamento.',
  ];

  const faqItems = [
    {
      question: 'O aplicativo realmente funciona melhor que métodos tradicionais?',
      answer: 'Sim. O suporte digital mantém você engajado e melhora as chances de sucesso.',
    },
    {
      question: 'Vou ficar mais ansioso ao parar?',
      answer: 'Os primeiros dias são desafiadores, mas a ansiedade cai com o tempo e o bem-estar aumenta.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at top left, #e8f5f1 0%, #f5f6f8 45%, #f7f4ee 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: 'rgba(34,151,107,0.12)', top: -180, right: -120, filter: 'blur(10px)' }} />
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'rgba(15,118,110,0.08)', bottom: -160, left: -120, filter: 'blur(10px)' }} />
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px 96px', position: 'relative', zIndex: 1 }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-primary-dark)' }}>0 Fumo</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>Sua nova jornada</div>
          </div>
          <button onClick={onLogin} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 4 }}>Entrar com minha conta</button>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center', marginBottom: 80 }}>
          <div className="landing-fade landing-stagger-1">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 20, background: '#fff', border: '1px solid #E6ECEF', fontSize: 12, fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: 16 }}>
              <Icon name="Shield" size={14} color="var(--color-primary)" />Metodologia Científica
            </div>
            <h1 style={{ fontSize: 44, lineHeight: 1.12, marginBottom: 16, color: 'var(--color-text-primary)' }}>Liberte-se do cigarro com o suporte da ciência, não apenas da força de vontade.</h1>
            <p style={{ fontSize: 17, color: 'var(--color-text-secondary)', maxWidth: 560, marginBottom: 28 }}>Vença a vontade de fumar com um plano personalizado. Baseado em ciência, focado na sua liberdade.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={onStart} style={{ padding: '14px 22px', borderRadius: 12, border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, boxShadow: '0 10px 22px rgba(34,151,107,0.28)' }}>Começar minha jornada gratuita</button>
            </div>
          </div>

          <div className="landing-fade landing-stagger-2" style={{ display: 'grid', gap: 16 }}>
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: '#fff', border: '1px solid #E7ECEF', boxShadow: '0 24px 40px rgba(15, 23, 42, 0.08)' }}>
              <img
                src={heroImage}
                alt="Tela do aplicativo 0 Fumo"
                style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', left: 16, bottom: 16, padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(230,236,239,0.9)', fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Tela real do app 0 Fumo
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 16px', borderRadius: 16, background: '#fff', border: '1px solid #E7ECEF', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.06)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="Heart" size={18} color="var(--color-primary)" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Mais calma, mais controle</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Um plano diário que guia suas escolhas com leveza.</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 72 }}>
          <div className="landing-fade landing-stagger-3" style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>Por que um acompanhamento digital?</div>
            <h2 style={{ fontSize: 30, marginBottom: 12 }}>O seu aliado de bolso, 24 horas por dia.</h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 760 }}>Suporte imediato quando a vontade aperta. Rotina simples, orientação clara.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {digitalBenefits.map(item => (
              <Card key={item.title} style={{ padding: 20, borderRadius: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>Recursos Principais: Inteligência contra a Recaída</div>
            <h2 style={{ fontSize: 30, marginBottom: 12 }}>Entenda seus gatilhos antes que eles dominem você.</h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 760 }}>Registre o que sente, entenda padrões e aja antes da fissura crescer.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {relapseTools.map(item => (
              <Card key={item.title} style={{ padding: 20, borderRadius: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: '#EFF6F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>O Mito do "Cigarro Relaxante"</div>
            <h2 style={{ fontSize: 30, marginBottom: 12 }}>Menos cigarro, muito menos ansiedade.</h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 760 }}>O cigarro não relaxa. Parar reduz estresse, melhora o humor e dá mais controle.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {wellbeingTools.map(item => (
              <Card key={item.title} style={{ padding: 20, borderRadius: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: '#F5F4F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>Seu Progresso em Números</div>
            <h2 style={{ fontSize: 30, marginBottom: 12 }}>O que você ganha ao dizer adeus ao tabaco.</h2>
            <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', maxWidth: 760 }}>Veja sua evolução em saúde, dinheiro e energia.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
            <span style={{ padding: '6px 12px', borderRadius: 999, background: '#EEF5F2', fontSize: 12, fontWeight: 600, color: 'var(--color-primary-dark)' }}>Saúde</span>
            <span style={{ padding: '6px 12px', borderRadius: 999, background: '#EEF2F8', fontSize: 12, fontWeight: 600, color: '#2B4A6E' }}>Economia</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {progressItems.map(item => (
              <Card key={item.title} style={{ padding: 20, borderRadius: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: '#F0F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={item.icon} size={16} color="var(--color-primary)" />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.description}</p>
              </Card>
            ))}
          </div>
        </section>


        <section style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 30, marginBottom: 12 }}>Perguntas frequentes</h2>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            {faqItems.map(item => (
              <Card key={item.question} style={{ padding: 20, borderRadius: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{item.question}</div>
                <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{item.answer}</div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card style={{ padding: 28, borderRadius: 18, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'linear-gradient(135deg, #1e7d5e 0%, #22976B 60%, #1c8c64 100%)', color: '#fff' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Pronto para começar?</div>
              <div style={{ fontSize: 14, opacity: 0.9 }}>Sua jornada gratuita pode iniciar agora, com suporte personalizado.</div>
            </div>
            <button onClick={onStart} style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: '#fff', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>Começar minha jornada gratuita</button>
          </Card>
        </section>

        <footer style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid #E6ECEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Nosso compromisso é com a evidência.</div>
          <button onClick={() => setMethodologyOpen(true)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-primary)', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 4 }}>Saiba mais sobre nossa metodologia</button>
        </footer>

        {methodologyOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => setMethodologyOpen(false)}>
            <div role="dialog" aria-modal="true" onClick={event => event.stopPropagation()} style={{ width: 'min(560px, 92vw)', background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 24px 60px rgba(15, 23, 42, 0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Nossa metodologia em detalhes</div>
                <button onClick={() => setMethodologyOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
                  <Icon name="X" size={18} color="#667085" />
                </button>
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>As fontes abaixo embasam nossos protocolos e comunicação clínica.</p>
              <div style={{ display: 'grid', gap: 8 }}>
                {authorityItems.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--color-text-secondary)' }}>
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
