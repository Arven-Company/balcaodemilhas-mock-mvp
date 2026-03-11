import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [verified, setVerified] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('milhas_verified') ?? 'false')
    } catch {
      return false
    }
  })
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('milhas_theme') ?? 'light'
    } catch {
      return 'light'
    }
  })
  const [module, setModule] = useState('emissoes') // emissoes | balcao | promocoes | conta

  useEffect(() => {
    localStorage.setItem('milhas_verified', JSON.stringify(verified))
  }, [verified])

  useEffect(() => {
    try {
      localStorage.setItem('milhas_theme', theme)
    } catch (_) {}
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const completeVerification = () => setVerified(true)
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <AppContext.Provider
      value={{
        verified,
        completeVerification,
        theme,
        toggleTheme,
        module,
        setModule,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
