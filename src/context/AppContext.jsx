import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)

let toastId = 0
function nextToastId() {
  return `toast-${++toastId}`
}

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const addToast = useCallback((message, type = 'success') => {
    const id = nextToastId()
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

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
  const [screen, setScreen] = useState('') // '' | contrato | configuracoes | editar-perfil | planos | plan-success | filtros
  const [contractAccepted, setContractAccepted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('milhas_contract_accepted') ?? 'false')
    } catch {
      return false
    }
  })
  const [filters, setFilters] = useState({ airlines: [], milesMin: 0, milesMax: 500000 })
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('milhas_profile')
      if (raw) return JSON.parse(raw)
    } catch {}
    return { name: 'Marcelo Campos', avatarUrl: '' }
  })
  const [purchasedPlanName, setPurchasedPlanName] = useState(null)
  const [hideBottomNav, setHideBottomNav] = useState(false)
  const [selectedFlightForOffer, setSelectedFlightForOffer] = useState(null)
  const [selectedOfferForMakeOffer, setSelectedOfferForMakeOffer] = useState(null)

  useEffect(() => {
    localStorage.setItem('milhas_verified', JSON.stringify(verified))
  }, [verified])

  useEffect(() => {
    try {
      localStorage.setItem('milhas_contract_accepted', JSON.stringify(contractAccepted))
    } catch (_) {}
  }, [contractAccepted])

  useEffect(() => {
    try {
      localStorage.setItem('milhas_profile', JSON.stringify(profile))
    } catch (_) {}
  }, [profile])

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
        toasts,
        addToast,
        removeToast,
        verified,
        completeVerification,
        theme,
        toggleTheme,
        module,
        setModule,
        screen,
        setScreen,
        contractAccepted,
        setContractAccepted,
        filters,
        setFilters,
        profile,
        setProfile,
        purchasedPlanName,
        setPurchasedPlanName,
        hideBottomNav,
        setHideBottomNav,
        selectedFlightForOffer,
        setSelectedFlightForOffer,
        selectedOfferForMakeOffer,
        setSelectedOfferForMakeOffer,
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
