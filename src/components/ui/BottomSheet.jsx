import { useEffect, useRef } from 'react'
import './ui.css'

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  className = '',
}) {
  const sheetRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="sheet-backdrop" onClick={onClose} role="presentation">
      <div
        ref={sheetRef}
        className={`sheet ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="sheet__handle" />
        {title && <h2 className="sheet__title">{title}</h2>}
        <div className="sheet__content">
          {children}
        </div>
      </div>
    </div>
  )
}
