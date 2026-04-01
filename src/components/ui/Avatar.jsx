import './ui.css'

export default function Avatar({ src, alt = '', size = 'md', className = '' }) {
  const fallback = !src

  return (
    <div className={`avatar avatar--${size} ${className}`}>
      {fallback ? (
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="avatar__fallback">
          <circle cx="16" cy="12" r="5" fill="currentColor" />
          <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="currentColor" />
        </svg>
      ) : (
        <img src={src} alt={alt} className="avatar__img" loading="lazy" />
      )}
    </div>
  )
}
