import './ui.css'

export function Skeleton({ width, height, radius = 'md', className = '' }) {
  return (
    <div
      className={`skeleton skeleton--${radius} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`skeleton-card ${className}`} aria-hidden="true">
      <Skeleton width="100%" height="var(--card-image-height)" radius="lg" />
      <div className="skeleton-card__body">
        <Skeleton width="70%" height="1rem" />
        <Skeleton width="50%" height="0.875rem" />
        <Skeleton width="40%" height="1.25rem" />
      </div>
    </div>
  )
}
