import { useApp } from './context/AppContext'
import Emissoes from './pages/Emissoes'
import Balcao from './pages/Balcao'
import Promocoes from './pages/Promocoes'
import Conta from './pages/Conta'
import Contrato from './pages/Contrato'
import Planos from './pages/Planos'
import PlanSuccess from './pages/PlanSuccess'
import Filtros from './pages/Filtros'
import Configuracoes from './pages/Configuracoes'
import EditarPerfil from './pages/EditarPerfil'
import BottomNav from './components/BottomNav'
import './App.css'

export default function App() {
  const {
    module,
    setModule,
    screen,
    setScreen,
    contractAccepted,
    setContractAccepted,
    purchasedPlanName,
    setPurchasedPlanName,
  } = useApp()

  const showContractGate = !contractAccepted && (module === 'conta' || module === 'balcao')
  const showBottomNav = !showContractGate && screen === ''

  const handleContractFinish = () => {
    setContractAccepted(true)
    setModule('balcao')
  }

  const handleContractSkip = () => {
    setContractAccepted(true)
    setModule('conta')
  }

  const renderContent = () => {
    if (showContractGate) {
      return (
        <Contrato
          onFinish={handleContractFinish}
          onSkip={handleContractSkip}
        />
      )
    }

    if (screen === 'filtros') {
      return <Filtros onBack={() => setScreen('')} />
    }
    if (screen === 'configuracoes') {
      return <Configuracoes onBack={() => setScreen('')} />
    }
    if (screen === 'editar-perfil') {
      return <EditarPerfil onBack={() => setScreen('')} />
    }
    if (screen === 'planos') {
      return <Planos onBack={() => setScreen('')} />
    }
    if (screen === 'plan-success') {
      return (
        <PlanSuccess
          onDone={() => {
            setScreen('')
            setPurchasedPlanName(null)
          }}
        />
      )
    }

    if (module === 'emissoes') return <Emissoes />
    if (module === 'balcao') return <Balcao />
    if (module === 'promocoes') return <Promocoes />
    if (module === 'conta') return <Conta />

    return <Emissoes />
  }

  return (
    <div className="app-shell">
      <main className="app-main">
        {renderContent()}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  )
}
