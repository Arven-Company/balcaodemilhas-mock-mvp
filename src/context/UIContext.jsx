import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const UIContext = createContext(null)

let toastId = 0
function nextToastId() {
  return `toast-${++toastId}`
}

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = nextToastId()
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('milhas_theme') ?? 'light' } catch { return 'light' }
  })

  const [filters, setFilters] = useState({ airlines: [], milesMin: 0, milesMax: 500000 })

  useEffect(() => {
    try { localStorage.setItem('milhas_theme', theme) } catch {}
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), [])

  return (
    <UIContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      theme,
      toggleTheme,
      filters,
      setFilters,
    }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
