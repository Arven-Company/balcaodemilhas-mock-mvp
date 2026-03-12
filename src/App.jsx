import { useApp } from './context/AppContext'
import Emissoes from './pages/Emissoes'
import Balcao from './pages/Balcao'
import Promocoes from './pages/Promocoes'
import Conta from './pages/Conta'
import BottomNav from './components/BottomNav'
import './App.css'

export default function App() {
  const { module } = useApp()

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
