import './ui.css'

export default function FilterChip({ label, active = false, onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`filter-chip ${active ? 'filter-chip--active' : ''} ${className}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

export function FilterChipRow({ children, className = '' }) {
  return (
    <div className={`filter-chip-row ${className}`} role="group">
      {children}
    </div>
  )
}
