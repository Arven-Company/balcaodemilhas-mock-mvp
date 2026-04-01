/**
 * Botão voltar padronizado: chevron esquerda dentro de um círculo.
 * Light mode: círculo cinza claro; dark mode: adaptado via variáveis.
 */
function IconChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export default function BackButton({ onClick, ariaLabel = 'Voltar', className = '' }) {
  return (
    <button
      type="button"
      className={`btn-back-circle ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <IconChevronLeft />
    </button>
  )
}
