import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';
import '../../styles/screens/SettingsScreen.css';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`toggle ${checked ? 'toggle--on' : 'toggle--off'}`}
  >
    <div className={`toggle__thumb ${checked ? 'toggle__thumb--on' : 'toggle__thumb--off'}`} />
  </button>
);

export const SettingsScreen = () => {
  const [tab, setTab] = React.useState('privacidade');
  const [settings, setSettings] = React.useState({
    modoAnonimo: true,
    diarioPrivado: true,
    notificacoes: true,
    som: true,
    compartilharProgresso: false,
  });
  const [guardians, setGuardians] = React.useState([
    { id: 1, name: 'Mariana S.', avatar: 'M', color: '#3B82F6' },
    { id: 2, name: 'Carlos (Padrinho)', avatar: 'C', color: '#10B981' },
  ]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const removeGuardian = (id) => {
    setGuardians(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="settings">
      <aside className="settings__sidebar">
        <div className="settings__nav">
          {[
            { id: 'privacidade', label: 'Privacidade', icon: 'Lock' },
            { id: 'notificacoes', label: 'Notificações', icon: 'Bell' },
            { id: 'conta', label: 'Conta', icon: 'User' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`settings__nav-btn${tab === item.id ? ' settings__nav-btn--active' : ''}`}
            >
              <Icon name={item.icon} size={18} color={tab === item.id ? 'var(--color-primary)' : '#999'} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="settings__content">
        {tab === 'privacidade' && (
          <div>
            <div className="settings__section">
              <Card>
                <div className="setting-row">
                  <div className="setting-row__left">
                    <Icon name="Eye" size={20} color="var(--color-primary)" />
                    <div className="setting-row__info">
                      <h4>Modo Anônimo</h4>
                      <p>Participe da comunidade sem revelar sua identidade real.</p>
                    </div>
                  </div>
                  <Toggle checked={settings.modoAnonimo} onChange={() => updateSetting('modoAnonimo', !settings.modoAnonimo)} />
                </div>
                {settings.modoAnonimo && (
                  <div className="anon-section">
                    <label className="anon-section__label">Seu apelido visível</label>
                    <div className="anon-section__value">BuscadorDePaz_99</div>
                  </div>
                )}
              </Card>
            </div>

            <div className="settings__section">
              <Card>
                <div className="setting-row">
                  <div className="setting-row__left">
                    <Icon name="Lock" size={20} color="var(--color-primary)" />
                    <div className="setting-row__info">
                      <h4>Diário Privado</h4>
                      <p>Seus registros de sentimentos e gatilhos são criptografados e visíveis apenas para você.</p>
                    </div>
                  </div>
                  <Toggle checked={settings.diarioPrivado} onChange={() => updateSetting('diarioPrivado', !settings.diarioPrivado)} />
                </div>
              </Card>
            </div>

            <div>
              <Card>
                <div className="buddy__header">
                  <Icon name="Users" size={20} color="var(--color-primary)" />
                  <h4 className="buddy__title">Buddy System</h4>
                </div>
                <p className="buddy__desc">Gerencie quem pode receber alertas de SOS quando você estiver enfrentando uma fissura forte.</p>
                {guardians.map(guardian => (
                  <div key={guardian.id} className="buddy__row">
                    <div className="buddy__avatar" style={{ '--avatar-color': guardian.color }}>
                      {guardian.avatar}
                    </div>
                    <span className="buddy__name">{guardian.name}</span>
                    <button onClick={() => removeGuardian(guardian.id)} className="buddy__remove-btn">
                      <Icon name="X" size={18} color="#999" />
                    </button>
                  </div>
                ))}
                <button className="buddy__add-btn">
                  <Icon name="UserPlus" size={16} color="var(--color-primary)" />
                  Adicionar Guardião
                </button>
              </Card>
            </div>
          </div>
        )}

        {tab === 'notificacoes' && (
          <div>
            <Card className="card--mb-24">
              <h3 className="account__section-title">Notificações</h3>
              <div className="notif-row notif-row--border">
                <div>
                  <div className="notif-row__title">Ativar notificações</div>
                  <div className="notif-row__sub">Receba lembretes e motivação</div>
                </div>
                <Toggle checked={settings.notificacoes} onChange={() => updateSetting('notificacoes', !settings.notificacoes)} />
              </div>
              <div className="notif-row">
                <div>
                  <div className="notif-row__title">Som nas notificações</div>
                  <div className="notif-row__sub">Toque sonoro ao receber alertas</div>
                </div>
                <Toggle checked={settings.som} onChange={() => updateSetting('som', !settings.som)} />
              </div>
            </Card>
          </div>
        )}

        {tab === 'conta' && (
          <div>
            <Card className="card--mb-24">
              <h3 className="account__section-title">Informações da Conta</h3>
              <button className="account__email-btn">
                <Icon name="Mail" size={18} color="var(--color-text-secondary)" />
                <div>
                  <div className="account__email-label">Email</div>
                  <div className="account__email-value">usuario@example.com</div>
                </div>
              </button>
            </Card>

            <Card className="card--mb-24">
              <h3 className="account__section-title">Seus Dados</h3>
              <p className="account__data-desc">Faça download do seu histórico ou solicite a exclusão permanente.</p>
              <div className="account__actions">
                <button className="account__export-btn">
                  <Icon name="Download" size={16} color="var(--color-text-secondary)" />
                  Exportar
                </button>
                <button className="account__delete-btn">
                  <Icon name="Trash2" size={16} color="#DC2626" />
                  Excluir Conta
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
