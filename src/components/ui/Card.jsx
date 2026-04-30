import './Card.css';

export const Card = ({ children, className = '', style }) => (
  <div style={style} className={`card${className ? ` ${className}` : ''}`}>
    {children}
  </div>
);

export const PageTitle = ({ title, subtitle }) => (
  <div className="page-title">
    <h1 className="page-title__heading">{title}</h1>
    {subtitle && <p className="page-title__sub">{subtitle}</p>}
  </div>
);
