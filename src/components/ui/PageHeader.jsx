import './ui.css'

export default function PageHeader({
  title,
  onBack,
  rightAction,
  centered = false,
  transparent = false,
  className = '',
}) {
  return (
    <header className={`page-header ${transparent ? 'page-header--transparent' : ''} ${className}`}>
      <div className={`page-header__row ${centered ? 'page-header__row--centered' : ''}`}>
        {onBack ? (
          <button
            type="button"
            className="btn-back-circle"
            onClick={onBack}
            aria-label="Voltar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <span aria-hidden="true" style={{ width: 44 }} />
        )}
        <h1 className="page-header__title">{title}</h1>
        {rightAction || <span aria-hidden="true" style={{ width: 44 }} />}
      </div>
    </header>
  )
}
