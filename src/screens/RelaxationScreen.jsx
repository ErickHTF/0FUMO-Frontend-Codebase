import React from 'react';
import { Icon } from '../lib/icons';
import { Card, PageTitle } from '../components/ui/Card';
import './RelaxationScreen.css';

export const RelaxationScreen = () => (
  <>
    <PageTitle title="Central de Relaxamento" subtitle="Encontre seu equilíbrio. Práticas rápidas e suaves para acalmar a mente e aliviar a tensão." />
    <div className="relaxation__top-grid">
      <Card className="breathing-card">
        <div className="relaxation__card-icon">
          <Icon name="Wind" size={22} color="var(--color-primary)" />
        </div>
        <h3 className="relaxation__card-title">Respiração 4-7-8</h3>
        <p className="relaxation__card-desc">Uma técnica simples e poderosa para reduzir a ansiedade. Inspire, segure, expire. Nós guiamos você no ritmo certo.</p>
        <div className="relaxation__action-row">
          <button className="relaxation__play-btn">
            <Icon name="Play" size={16} color="#fff" />Iniciar Prática
          </button>
          <span className="relaxation__duration">~ 2 minutos</span>
        </div>
      </Card>

      <Card>
        <div className="relaxation__card-icon relaxation__card-icon--blue">
          <Icon name="Headphones" size={22} color="#3B82F6" />
        </div>
        <h3 className="relaxation__card-title--sm">Meditação Curta (3 min)</h3>
        <p className="relaxation__card-desc--sm">Uma pausa rápida para reencontrar seu eixo e clarear a mente.</p>
        <button className="relaxation__play-btn--outline">
          <Icon name="Play" size={14} />Ouvir agora
        </button>
      </Card>
    </div>

    <Card>
      <div className="tips__header">
        <div className="tips__header-left">
          <Icon name="Lightbulb" size={18} color="#F59E0B" />
          <h3 className="tips__title">Dicas para a Fissura</h3>
        </div>
        <span className="tips__see-all">Ver todas →</span>
      </div>
      <div className="tips__grid">
        {[
          { icon: 'Droplets', title: 'Beba Água Gelada', desc: 'Pequenos goles ajudam a simular o gesto e refrescam a boca.' },
          { icon: 'Wind', title: 'Mude de Ambiente', desc: 'Levante, dê uma volta rápida. Quebre o padrão visual.' },
          { icon: 'Coffee', title: 'Aromaterapia Rápida', desc: 'Cheire um grão de café ou óleo essencial de lavanda.' },
        ].map((tip, i) => (
          <div key={i} className="tip-item">
            <Icon name={tip.icon} size={18} color="var(--color-primary)" />
            <h4 className="tip-item__title">{tip.title}</h4>
            <p className="tip-item__desc">{tip.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  </>
);
