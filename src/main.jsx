import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context/AppContext'
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
    <AppProvider>
      <ThemeSync />
      <App />
    </AppProvider>
  </StrictMode>,
)
