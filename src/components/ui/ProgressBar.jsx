import './ui.css'

export default function ProgressBar({ steps, current, className = '' }) {
  return (
    <div className={`progress-bar ${className}`} role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={steps.length}>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={{ width: `${((current) / steps.length) * 100}%` }}
        />
      </div>
      <div className="progress-bar__labels">
        {steps.map((label, i) => (
          <span
            key={label}
            className={`progress-bar__step ${i < current ? 'progress-bar__step--done' : ''} ${i === current - 1 ? 'progress-bar__step--current' : ''}`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
