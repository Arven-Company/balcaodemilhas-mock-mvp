import './ui.css'

export default function Card({
  children,
  variant = 'default',
  onClick,
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const isClickable = !!onClick
  return (
    <Tag
      className={`card card--${variant} ${isClickable ? 'card--clickable' : ''} ${className}`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e) } } : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function CardImage({ src, alt = '', overlay, className = '' }) {
  return (
    <div className={`card__image-wrap ${className}`}>
      <img src={src} alt={alt} className="card__image" loading="lazy" />
      {overlay && <div className="card__image-overlay">{overlay}</div>}
      <div className="card__image-scrim" />
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return <div className={`card__body ${className}`}>{children}</div>
}
