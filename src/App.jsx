import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useUI } from './context/UIContext'
import BottomNav from './components/BottomNav'
import ToastContainer from './components/Toast'

/* Lazy-loaded pages */
const Emissoes = lazy(() => import('./pages/Emissoes'))
const DetalheVoo = lazy(() => import('./pages/DetalheVoo'))
const CreatePurchaseOffer = lazy(() => import('./pages/emissoes/CreatePurchaseOffer'))
const Balcao = lazy(() => import('./pages/Balcao'))
const MakeOffer = lazy(() => import('./pages/balcao/MakeOffer'))
const Promocoes = lazy(() => import('./pages/Promocoes'))
const Conta = lazy(() => import('./pages/Conta'))
const MinhasVendas = lazy(() => import('./pages/conta/MinhasVendas'))
const DetalheVenda = lazy(() => import('./pages/conta/DetalheVenda'))
const CreateAd = lazy(() => import('./pages/conta/CreateAd'))
const SelectAdPlan = lazy(() => import('./pages/conta/SelectAdPlan'))
const AdSuccess = lazy(() => import('./pages/conta/AdSuccess'))
const EditarPerfil = lazy(() => import('./pages/EditarPerfil'))
const Planos = lazy(() => import('./pages/Planos'))
const PlanSuccess = lazy(() => import('./pages/PlanSuccess'))
const Contrato = lazy(() => import('./pages/Contrato'))
const Filtros = lazy(() => import('./pages/Filtros'))
const Configuracoes = lazy(() => import('./pages/Configuracoes'))
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel'))
const AdminAddEmission = lazy(() => import('./pages/admin/AdminAddEmission'))
const AdminSelectDates = lazy(() => import('./pages/admin/AdminSelectDates'))
const AdminAddPromotion = lazy(() => import('./pages/admin/AdminAddPromotion'))
const AdminAddSuccess = lazy(() => import('./pages/admin/AdminAddSuccess'))
const Verificacao = lazy(() => import('./pages/Verificacao'))

const TABS = ['/emissoes', '/balcao', '/promocoes', '/conta']

function PageFallback() {
  return <div className="page-loading" />
}

export default function App() {
  const { toasts, removeToast } = useUI()
  const location = useLocation()

  const isTabRoute = TABS.some((t) => location.pathname === t || location.pathname === t + '/')
  const showBottomNav = isTabRoute

  return (
    <div className="app-shell">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <main className="app-main">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Tab routes */}
            <Route path="/emissoes" element={<Emissoes />} />
            <Route path="/balcao" element={<Balcao />} />
            <Route path="/promocoes" element={<Promocoes />} />
            <Route path="/conta" element={<Conta />} />

            {/* Emissoes detail routes */}
            <Route path="/emissoes/:id" element={<DetalheVoo />} />
            <Route path="/emissoes/:id/oferta" element={<CreatePurchaseOffer />} />

            {/* Balcao routes */}
            <Route path="/balcao/oferta/:id" element={<MakeOffer />} />

            {/* Conta sub-routes */}
            <Route path="/conta/vendas" element={<MinhasVendas />} />
            <Route path="/conta/vendas/:id" element={<DetalheVenda />} />
            <Route path="/conta/editar" element={<EditarPerfil />} />
            <Route path="/conta/planos" element={<Planos />} />
            <Route path="/conta/planos/sucesso" element={<PlanSuccess />} />
            <Route path="/conta/anunciar" element={<CreateAd />} />
            <Route path="/conta/anunciar/plano" element={<SelectAdPlan />} />
            <Route path="/conta/anunciar/sucesso" element={<AdSuccess />} />

            {/* Supporting screens */}
            <Route path="/contrato" element={<Contrato />} />
            <Route path="/filtros" element={<Filtros />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/verificacao" element={<Verificacao />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/emissao" element={<AdminAddEmission />} />
            <Route path="/admin/emissao/datas" element={<AdminSelectDates />} />
            <Route path="/admin/promocao" element={<AdminAddPromotion />} />
            <Route path="/admin/sucesso" element={<AdminAddSuccess />} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/emissoes" replace />} />
          </Routes>
        </Suspense>
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  )
}
