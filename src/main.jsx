import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UIProvider } from './context/UIContext'
import './index.css'
import App from './App.jsx'

function ThemeSync() {
  useEffect(() => {
    const theme = localStorage.getItem('milhas_theme') ?? 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <ThemeSync />
          <App />
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
