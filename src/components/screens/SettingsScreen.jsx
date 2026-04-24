import React from 'react';
import { Icon } from '../../lib/icons';
import { Card, PageTitle } from '../ui/Card';

const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)} style={{
    width: 48, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer',
    background: checked ? 'var(--color-primary)' : '#DCDFE4', position: 'relative',
    transition: 'background 0.2s', padding: 0,
  }}>
    <div style={{
      width: 24, height: 24, borderRadius: '50%', background: '#fff',
      position: 'absolute', top: 2, left: checked ? 22 : 2, transition: 'left 0.2s',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }} />
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
    <div style={{ display: 'flex', gap: 24 }}>
      <aside style={{ width: 200, minHeight: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button onClick={() => setTab('privacidade')} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14,
            background: tab === 'privacidade' ? 'var(--color-primary-light)' : 'transparent',
            color: tab === 'privacidade' ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
          }}>
            <Icon name="Lock" size={18} color={tab === 'privacidade' ? 'var(--color-primary)' : '#999'} />
            Privacidade
          </button>
          <button onClick={() => setTab('notificacoes')} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14,
            background: tab === 'notificacoes' ? 'var(--color-primary-light)' : 'transparent',
            color: tab === 'notificacoes' ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
          }}>
            <Icon name="Bell" size={18} color={tab === 'notificacoes' ? 'var(--color-primary)' : '#999'} />
            Notificações
          </button>
          <button onClick={() => setTab('conta')} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 8,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14,
            background: tab === 'conta' ? 'var(--color-primary-light)' : 'transparent',
            color: tab === 'conta' ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
          }}>
            <Icon name="User" size={18} color={tab === 'conta' ? 'var(--color-primary)' : '#999'} />
            Conta
          </button>
        </div>
      </aside>

      <div style={{ flex: 1 }}>
        {tab === 'privacidade' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon name="Eye" size={20} color="var(--color-primary)" />
                    <div>
                      <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Modo Anônimo</h4>
                      <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--color-text-secondary)' }}>Participe da comunidade sem revelar sua identidade real.</p>
                    </div>
                  </div>
                  <Toggle checked={settings.modoAnonimo} onChange={() => updateSetting('modoAnonimo', !settings.modoAnonimo)} />
                </div>
                {settings.modoAnonimo && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #ECEEF1' }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>Seu apelido visível</label>
                    <div style={{ padding: '12px 16px', borderRadius: 8, background: '#F5F6F8', fontSize: 14, fontWeight: 500 }}>BuscadorDePaz_99</div>
                  </div>
                )}
              </Card>
            </div>

            <div style={{ marginBottom: 32 }}>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon name="Lock" size={20} color="var(--color-primary)" />
                    <div>
                      <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Diário Privado</h4>
                      <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--color-text-secondary)' }}>Seus registros de sentimentos e gatilhos são criptografados e visíveis apenas para você.</p>
                    </div>
                  </div>
                  <Toggle checked={settings.diarioPrivado} onChange={() => updateSetting('diarioPrivado', !settings.diarioPrivado)} />
                </div>
              </Card>
            </div>

            <div>
              <Card>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <Icon name="Users" size={20} color="var(--color-primary)" />
                    <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Buddy System</h4>
                  </div>
                  <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--color-text-secondary)' }}>Gerencie quem pode receber alertas de SOS quando você estiver enfrentando uma fissura forte.</p>
                </div>

                {guardians.map(guardian => (
                  <div key={guardian.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #ECEEF1' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', background: guardian.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 600, color: '#fff',
                    }}>
                      {guardian.avatar}
                    </div>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{guardian.name}</span>
                    <button onClick={() => removeGuardian(guardian.id)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
                    }}>
                      <Icon name="X" size={18} color="#999" />
                    </button>
                  </div>
                ))}

                <button style={{
                  marginTop: 16, padding: '12px 16px', borderRadius: 8, border: '2px dashed #ECEEF1',
                  background: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: 14,
                  display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit', fontWeight: 500,
                }}>
                  <Icon name="UserPlus" size={16} color="var(--color-primary)" />
                  Adicionar Guardião
                </button>
              </Card>
            </div>
          </div>
        )}

        {tab === 'notificacoes' && (
          <div>
            <Card style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600 }}>Notificações</h3>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBottom: 16, borderBottom: '1px solid #ECEEF1', marginBottom: 16,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Ativar notificações</div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Receba lembretes e motivação</div>
                </div>
                <Toggle checked={settings.notificacoes} onChange={() => updateSetting('notificacoes', !settings.notificacoes)} />
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Som nas notificações</div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Toque sonoro ao receber alertas</div>
                </div>
                <Toggle checked={settings.som} onChange={() => updateSetting('som', !settings.som)} />
              </div>
            </Card>
          </div>
        )}

        {tab === 'conta' && (
          <div>
            <Card style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600 }}>Informações da Conta</h3>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                padding: '12px 0', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 14, color: 'var(--color-text-primary)', textAlign: 'left',
              }}>
                <Icon name="Mail" size={18} color="var(--color-text-secondary)" />
                <div>
                  <div style={{ fontWeight: 500 }}>Email</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>usuario@example.com</div>
                </div>
              </button>
            </Card>

            <Card style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600 }}>Seus Dados</h3>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>Faça download do seu histórico ou solicite a exclusão permanente.</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8,
                  border: '1.5px solid #ECEEF1', background: '#fff', cursor: 'pointer', fontSize: 14,
                  fontWeight: 500, color: 'var(--color-text-primary)', fontFamily: 'inherit',
                }}>
                  <Icon name="Download" size={16} color="var(--color-text-secondary)" />
                  Exportar
                </button>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8,
                  border: 'none', background: '#FEE2E2', cursor: 'pointer', fontSize: 14,
                  fontWeight: 500, color: '#DC2626', fontFamily: 'inherit',
                }}>
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
