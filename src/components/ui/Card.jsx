export const Card = ({ children, style = {} }) => (
  <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #F0F1F3', ...style }}>
    {children}
  </div>
);

export const PageTitle = ({ title, subtitle }) => (
  <div style={{ marginBottom: 24 }}>
    <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>{title}</h1>
    {subtitle && <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', margin: '6px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
  </div>
);
