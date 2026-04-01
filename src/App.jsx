import { useState } from 'react'
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
import AdminPanel from './pages/admin/AdminPanel'
import AdminAddEmission from './pages/admin/AdminAddEmission'
import AdminSelectDates from './pages/admin/AdminSelectDates'
import AdminAddPromotion from './pages/admin/AdminAddPromotion'
import AdminAddSuccess from './pages/admin/AdminAddSuccess'
import CreateAd from './pages/conta/CreateAd'
import SelectAdPlan from './pages/conta/SelectAdPlan'
import AdSuccess from './pages/conta/AdSuccess'
import MinhasVendas from './pages/conta/MinhasVendas'
import DetalheVenda from './pages/conta/DetalheVenda'
import CreatePurchaseOffer from './pages/emissoes/CreatePurchaseOffer'
import MakeOffer from './pages/balcao/MakeOffer'
import BottomNav from './components/BottomNav'
import ToastContainer from './components/Toast'
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
    hideBottomNav,
    selectedFlightForOffer,
    setSelectedFlightForOffer,
    selectedOfferForMakeOffer,
    setSelectedOfferForMakeOffer,
    toasts,
    removeToast,
    addToast,
  } = useApp()
  const [adminNewEmission, setAdminNewEmission] = useState(null)
  const [adminSuccessInfo, setAdminSuccessInfo] = useState(null)
  const [adDetails, setAdDetails] = useState(null)
  const [selectedSale, setSelectedSale] = useState(null)

  const showContractGate = !contractAccepted && (module === 'conta' || module === 'balcao')
  const showBottomNav = !showContractGate && screen === '' && !hideBottomNav

  const handleContractFinish = () => {
    addToast('Contrato aceite.', 'success')
    setContractAccepted(true)
    setModule('balcao')
  }

  const handleContractSkip = () => {
    addToast('Contrato ignorado.', 'info')
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

    if (screen === 'contrato') {
      return <Contrato onBack={() => setScreen('')} mode="consult" />
    }
    if (screen === 'filtros') {
      return <Filtros onBack={() => setScreen('')} />
    }
    if (screen === 'configuracoes') {
      return (
        <Configuracoes
          onBack={() => setScreen('')}
          onOpenAdmin={() => setScreen('admin-panel')}
          onOpenTestEmissoes={() => setScreen('test-emissoes')}
        />
      )
    }
    if (screen === 'test-emissoes') {
      return (
        <Emissoes
          testMode={{ onBack: () => setScreen('configuracoes') }}
        />
      )
    }
    if (screen === 'admin-panel') {
      return (
        <AdminPanel
          onBack={() => setScreen('configuracoes')}
          onNavigate={(s) => setScreen(s)}
        />
      )
    }
    if (screen === 'admin-add-emission') {
      return (
        <AdminAddEmission
          onBack={() => setScreen('admin-panel')}
          onSelectDates={(data) => {
            setAdminNewEmission(data)
            setScreen('admin-select-dates')
          }}
        />
      )
    }
    if (screen === 'admin-select-dates' && adminNewEmission) {
      return (
        <AdminSelectDates
          emissionData={adminNewEmission}
          onBack={() => setScreen('admin-add-emission')}
          onConfirm={(type, title) => {
            addToast(type === 'emission' ? 'Emissão adicionada com sucesso.' : 'Promoção adicionada com sucesso.', 'success')
            setAdminSuccessInfo({ type, title })
            setAdminNewEmission(null)
            setScreen('admin-add-success')
          }}
        />
      )
    }
    if (screen === 'admin-add-promotion') {
      return (
        <AdminAddPromotion
          onBack={() => setScreen('admin-panel')}
          onConfirm={(type, title) => {
            addToast('Promoção adicionada com sucesso.', 'success')
            setAdminSuccessInfo({ type, title })
            setScreen('admin-add-success')
          }}
        />
      )
    }
    if (screen === 'admin-add-success' && adminSuccessInfo) {
      return (
        <AdminAddSuccess
          type={adminSuccessInfo.type}
          title={adminSuccessInfo.title}
          onBackToPanel={() => {
            setAdminSuccessInfo(null)
            setScreen('admin-panel')
          }}
          onViewList={() => {
            const type = adminSuccessInfo.type
            setAdminSuccessInfo(null)
            setModule(type === 'emission' ? 'emissoes' : 'promocoes')
            setScreen('')
          }}
        />
      )
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
            addToast('Tudo pronto.', 'success')
            setScreen('')
            setPurchasedPlanName(null)
          }}
        />
      )
    }
    if (screen === 'create-ad') {
      return (
        <CreateAd
          onBack={() => setScreen('')}
          onNext={(data) => {
            setAdDetails(data)
            setScreen('select-ad-plan')
          }}
        />
      )
    }
    if (screen === 'select-ad-plan') {
      return (
        <SelectAdPlan
          onBack={() => {
            setAdDetails(null)
            setScreen('')
          }}
          onConfirm={() => {
            addToast('Anúncio criado com sucesso.', 'success')
            setScreen('ad-success')
          }}
        />
      )
    }
    if (screen === 'ad-success') {
      return (
        <AdSuccess
          adDetails={adDetails}
          onDone={() => {
            setAdDetails(null)
            setScreen('')
          }}
          onViewEmissions={() => {
            setAdDetails(null)
            setModule('emissoes')
            setScreen('')
          }}
        />
      )
    }
    if (screen === 'my-sales') {
      return (
        <MinhasVendas
          onBack={() => setScreen('')}
          onSelectSale={(sale) => {
            setSelectedSale(sale)
            setScreen('sale-detail')
          }}
        />
      )
    }
    if (screen === 'sale-detail' && selectedSale) {
      return (
        <DetalheVenda
          sale={selectedSale}
          onBack={() => {
            setSelectedSale(null)
            setScreen('my-sales')
          }}
        />
      )
    }

    if (screen === 'create-purchase-offer' && selectedFlightForOffer) {
      return (
        <CreatePurchaseOffer
          flight={selectedFlightForOffer}
          onBack={() => {
            setSelectedFlightForOffer(null)
            setScreen('')
            setModule('emissoes')
          }}
        />
      )
    }
    if (screen === 'make-offer' && selectedOfferForMakeOffer) {
      return (
        <MakeOffer
          offer={selectedOfferForMakeOffer}
          onBack={() => {
            setSelectedOfferForMakeOffer(null)
            setScreen('')
            setModule('balcao')
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
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <main className="app-main">
        {renderContent()}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  )
}
