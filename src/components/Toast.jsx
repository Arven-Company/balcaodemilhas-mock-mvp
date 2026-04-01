import { useEffect } from 'react'
import '../styles/toast.css'

export function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 3500)
    return () => clearTimeout(t)
  }, [toast.id, onDismiss])

  return (
    <div
      className={`toast-item toast-item--${toast.type}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast-message">{toast.message}</span>
    </div>
  )
}

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container" aria-label="Notificações">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  )
}
