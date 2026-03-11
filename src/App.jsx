import { useApp } from './context/AppContext'
import Verificacao from './pages/Verificacao'
import Emissoes from './pages/Emissoes'
import Balcao from './pages/Balcao'
import Promocoes from './pages/Promocoes'
import Conta from './pages/Conta'
import BottomNav from './components/BottomNav'
import './App.css'

function AppContent() {
  const { verified, module } = useApp()

  if (!verified) {
    return <Verificacao />
  }

  return (
    <div className="app-shell">
      <main className="app-main">
        {module === 'emissoes' && <Emissoes />}
        {module === 'balcao' && <Balcao />}
        {module === 'promocoes' && <Promocoes />}
        {module === 'conta' && <Conta />}
      </main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return <AppContent />
}
