import './ui.css'

export default function TabToggle({ tabs, active, onChange, className = '' }) {
  return (
    <div className={`tab-toggle ${className}`} role="tablist">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          className={`tab-toggle__item ${active === id ? 'tab-toggle__item--active' : ''}`}
          aria-selected={active === id}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
