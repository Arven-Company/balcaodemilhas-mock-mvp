import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [verified, setVerified] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('milhas_verified') ?? 'false')
    } catch {
      return false
    }
  })

  const [contractAccepted, setContractAccepted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('milhas_contract_accepted') ?? 'false')
    } catch {
      return false
    }
  })

  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('milhas_profile')
      if (raw) return JSON.parse(raw)
    } catch {}
    return { name: 'Marcelo Campos', avatarUrl: '' }
  })

  useEffect(() => {
    localStorage.setItem('milhas_verified', JSON.stringify(verified))
  }, [verified])

  useEffect(() => {
    try { localStorage.setItem('milhas_contract_accepted', JSON.stringify(contractAccepted)) } catch {}
  }, [contractAccepted])

  useEffect(() => {
    try { localStorage.setItem('milhas_profile', JSON.stringify(profile)) } catch {}
  }, [profile])

  const completeVerification = useCallback(() => setVerified(true), [])

  return (
    <AuthContext.Provider value={{
      verified,
      completeVerification,
      contractAccepted,
      setContractAccepted,
      profile,
      setProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
