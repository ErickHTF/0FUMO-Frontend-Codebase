import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';
import { Events, getStoredUser } from '../../lib/api';
import '../../styles/screens/DashboardScreen.css';

const PACK_PRICE = { r5_8: 6.5, r9_12: 10.5, r13_16: 14.5, r17plus: 19 };
const CIGS_PER_PACK = 20;

function getDaysAndHours(isoString) {
  if (!isoString) return { days: 0, hours: 0, totalHours: 0 };
  const diff = Date.now() - new Date(isoString).getTime();
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return { days, hours, totalHours };
}

export const DashboardScreen = () => {
  const user = getStoredUser();
  const { days, hours, totalHours } = getDaysAndHours(user?.createdAt);

  const onboardingData = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('0fumo_onboarding_data')); } catch { return null; }
  }, []);

  const cigsPerDay = Number(onboardingData?.cigs) || 15;
  const pricePerCig = (PACK_PRICE[onboardingData?.packCost] || 10.5) / CIGS_PER_PACK;

  const [stats, setStats] = React.useState({ totalCravings: 0, cigarettesSmoked: 0, mostFrequentContext: null });

  React.useEffect(() => {
    Events.stats().then(setStats).catch(() => {});
  }, []);

  const cigsAvoided = Math.max(0, cigsPerDay * days - stats.cigarettesSmoked);
  const money = Math.round(cigsAvoided * pricePerCig);

  const bloodCleanPct = Math.min(100, Math.round((totalHours / 8) * 100));
  const tastePct = Math.min(100, Math.round((days / 2) * 100));

  return (
    <>
      <PageTitle
        title={`Olá, ${user?.name?.split(' ')[0] || 'Usuário'}`}
        subtitle="Um dia de cada vez. Você está indo muito bem."
      />
      <div className="dashboard__grid">
        <Card className="progress-card">
          <div className="progress-card__label">Seu Progresso</div>
          <div className="progress-card__time">
            <span className="progress-card__number">{days}</span>
            <span className="progress-card__unit">dias</span>
            <span className="progress-card__number--spaced">{hours}</span>
            <span className="progress-card__unit">hrs</span>
          </div>
          <div className="progress-card__sub">Livre do cigarro</div>
          <div className="progress-card__badge">
            <Icon name="Clock" size={14} color="var(--color-primary)" />
            {totalHours} horas totais
          </div>
        </Card>

        <div className="dashboard__side-col">
          <Card>
            <div className="stat-card__header">
              <div className="stat-card__icon stat-card__icon--primary">
                <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
              </div>
              <span className="stat-card__label">Economizado</span>
            </div>
            <div className="stat-card__value">R$ {money},00</div>
            <div className="stat-card__desc">{cigsAvoided} cigarros a menos</div>
          </Card>

          <Card>
            <div className="stat-card__header">
              <div className="stat-card__icon stat-card__icon--danger">
                <Icon name="Zap" size={16} color="#EF4444" />
              </div>
              <span className="stat-card__label">Cigarros Evitados</span>
            </div>
            <div className="stat-card__value">{cigsAvoided}</div>
            <div className="stat-card__desc">
              {stats.cigarettesSmoked > 0
                ? `${stats.cigarettesSmoked} registrado${stats.cigarettesSmoked > 1 ? 's' : ''} como fumado`
                : 'Seus pulmões agradecem'}
            </div>
          </Card>
        </div>
      </div>

      <div className="dashboard__bottom-grid">
        <Card>
          <div className="recovery__header">
            <Icon name="Heart" size={18} color="#EF4444" />
            <h3 className="recovery__title">Recuperação Física</h3>
          </div>
          {[
            { label: 'Seu sangue está mais limpo', pct: bloodCleanPct, desc: `Baseado em ${totalHours}h sem fumar` },
            { label: 'Sabores e aromas voltando', pct: tastePct, desc: 'Nervos se regenerando' },
          ].map((item, i) => (
            <div key={i} className="recovery__item">
              <div className="recovery__item-row">
                <span>{item.label}</span>
                <span className={`recovery__item-status ${item.pct >= 100 ? 'recovery__item-status--done' : 'recovery__item-status--partial'}`}>
                  {item.pct >= 100 ? 'Normalizado' : `${Math.min(item.pct, 99)}%`}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{
                    '--progress-width': `${Math.min(item.pct, 100)}%`,
                    '--progress-color': item.pct >= 100 ? 'var(--color-primary)' : '#F59E0B',
                  }}
                />
              </div>
              <div className="recovery__item-desc">{item.desc}</div>
            </div>
          ))}
        </Card>

        <Card>
          <div className="achievements__header">
            <div className="achievements__header-left">
              <Icon name="Trophy" size={18} color="#F59E0B" />
              <h3 className="achievements__title">Conquistas</h3>
            </div>
            <span className="achievements__see-all">Ver todas</span>
          </div>
          <div className="achievements__row">
            {[
              { label: '1 Dia Limpo', unlocked: days >= 1, color: 'var(--color-primary)' },
              { label: '1 Semana Limpa', unlocked: days >= 7, color: '#3B82F6' },
              { label: '1 Mês Limpo', unlocked: days >= 30, color: '#9CA3AF' },
            ].map((a, i) => (
              <div key={i} className="achievement-badge">
                <div
                  className={`achievement-badge__circle${!a.unlocked ? ' achievement-badge__circle--locked' : ''}`}
                  style={{ '--badge-color': a.unlocked ? a.color : undefined }}
                >
                  {a.unlocked
                    ? <Icon name="Award" size={24} color="#fff" />
                    : <Icon name="Lock" size={20} color="var(--color-muted)" />}
                </div>
                <div className={`achievement-badge__label ${a.unlocked ? 'achievement-badge__label--unlocked' : 'achievement-badge__label--locked'}`}>
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};
