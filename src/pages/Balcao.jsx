import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { MOCK_BALCAO_COMPRA, MOCK_BALCAO_VENDA } from '../data/mocks'
import BackButton from '../components/BackButton'
import { TabToggle, BottomSheet } from '../components/ui'
import Verificacao from './Verificacao'
import TermosCompra from '../components/fluxo-compra/TermosCompra'
import PixCompra from '../components/fluxo-compra/PixCompra'
import ChatDadosCompra from '../components/fluxo-compra/ChatDadosCompra'
import AguardoCompra from '../components/fluxo-compra/AguardoCompra'
import ConfirmacaoCompra from '../components/fluxo-compra/ConfirmacaoCompra'
import TermosVenda from '../components/fluxo-venda/TermosVenda'
import AguardoVenda from '../components/fluxo-venda/AguardoVenda'
import StepperVenda from '../components/fluxo-venda/StepperVenda'
import ConfirmacaoVenda from '../components/fluxo-venda/ConfirmacaoVenda'
import MotivoDisputa from '../components/fluxo-disputa/MotivoDisputa'
import StatusDisputa from '../components/fluxo-disputa/StatusDisputa'
import '../styles/cards.css'
import '../styles/app-layout.css'
import '../styles/fluxo-balcao.css'

const FLOW_COMPRA_STEPS = ['Termos', 'PIX', 'Chat', 'Aguardo', 'Confirmação']
const FLOW_VENDA_STEPS = ['Termos', 'Aguardo comprador', 'Stepper', 'Confirmação']

export default function Balcao() {
  const { verified, completeVerification, setScreen, setSelectedOfferForMakeOffer, addToast } = useApp()
  const [tab, setTab] = useState('compra')
  const [view, setView] = useState('list') // list | verificacao | flow | dispute-reason | dispute-status
  const [flowType, setFlowType] = useState(null) // 'compra' | 'venda'
  const [disputeReason, setDisputeReason] = useState(null)
  const [flowStep, setFlowStep] = useState(1)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [pixConfirmed, setPixConfirmed] = useState(false)
  const [stepperDone, setStepperDone] = useState(false)
  const [filtroCompanhia, setFiltroCompanhia] = useState('')
  const [ordenacao, setOrdenacao] = useState('recentes')
  const [showChat, setShowChat] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState('filter') // 'filter' | 'sort'

  const rawList = tab === 'compra' ? MOCK_BALCAO_COMPRA : MOCK_BALCAO_VENDA
  const list = (() => {
    let l = [...rawList]
    if (filtroCompanhia) {
      l = l.filter((item) => (item.companhia || '') === filtroCompanhia)
    }
    if (ordenacao === 'preco') {
      l.sort((a, b) => (a.originalValue ?? 0) - (b.originalValue ?? 0))
    } else {
      l.sort((a, b) => (a.id || '').localeCompare(b.id || ''))
    }
    return l
  })()
  const primaryAction = tab === 'compra' ? 'Iniciar Compra' : 'Iniciar Venda'
  const flowSteps = flowType === 'compra' ? FLOW_COMPRA_STEPS : FLOW_VENDA_STEPS
  const totalSteps = flowSteps.length

  useEffect(() => {
    const key = 'milhas_flow_state'
    try {
      const raw = sessionStorage.getItem(key)
      if (raw) {
        const s = JSON.parse(raw)
        if (s.view === 'flow' && s.flowType && s.flowStep) {
          setView('flow')
          setFlowType(s.flowType)
          setFlowStep(s.flowStep)
          setSelectedOffer(s.selectedOffer || null)
          setTab(s.flowType)
        }
      }
    } catch (_) {}
  }, [])

  useEffect(() => {
    if (view === 'flow' && flowType && flowStep) {
      try {
        sessionStorage.setItem('milhas_flow_state', JSON.stringify({
          view: 'flow',
          flowType,
          flowStep,
          selectedOffer,
        }))
      } catch (_) {}
    } else {
      try {
        sessionStorage.removeItem('milhas_flow_state')
      } catch (_) {}
    }
  }, [view, flowType, flowStep, selectedOffer])

  const handleIniciarCompraVenda = (offer, type) => {
    setSelectedOffer(offer)
    setFlowType(type)
    if (verified) {
      setFlowStep(1)
      setTermsAccepted(false)
      setPixConfirmed(false)
      setStepperDone(false)
      setView('flow')
    } else {
      setView('verificacao')
    }
  }

  const handleVerificationComplete = () => {
    setView('flow')
    setFlowStep(1)
    setTermsAccepted(false)
    setPixConfirmed(false)
    setStepperDone(false)
  }

  const handleBackFromVerification = () => {
    setView('list')
    setFlowType(null)
    setSelectedOffer(null)
  }

  const goNextStep = () => {
    if (flowStep < totalSteps) setFlowStep(flowStep + 1)
    else {
      setView('list')
      setFlowType(null)
      setFlowStep(1)
      setSelectedOffer(null)
      setTermsAccepted(false)
      setPixConfirmed(false)
      setStepperDone(false)
    }
  }

  const exitFlow = () => {
    setView('list')
    setFlowType(null)
    setFlowStep(1)
    setSelectedOffer(null)
  }

  const handleFinishDisputeFlow = () => {
    setDisputeReason(null)
    setView('list')
    setFlowType(null)
    setFlowStep(1)
    setSelectedOffer(null)
  }


  if (view === 'verificacao') {
    return (
      <div className="fluxo-balcao-wrap">
        <Verificacao onComplete={handleVerificationComplete} onBack={handleBackFromVerification} />
      </div>
    )
  }

  if (view === 'dispute-reason' && selectedOffer) {
    return (
      <div className="fluxo-balcao-wrap">
        <MotivoDisputa
          offer={selectedOffer}
          onBack={() => setView('flow')}
          onConfirm={(reason) => {
            addToast('Disputa registada.', 'success')
            setDisputeReason(reason)
            setView('dispute-status')
          }}
        />
      </div>
    )
  }

  if (view === 'dispute-status' && selectedOffer) {
    return (
      <div className="fluxo-balcao-wrap">
        <StatusDisputa
          offer={selectedOffer}
          reason={disputeReason}
          onDone={handleFinishDisputeFlow}
        />
      </div>
    )
  }

  if (view === 'flow' && flowType) {
    return (
      <div className="fluxo-balcao-wrap">
        <header className="app-header">
          <div className="app-header-row">
            <BackButton onClick={exitFlow} ariaLabel="Sair do fluxo" />
            <h1 className="app-header-title">{flowType === 'compra' ? 'Compra' : 'Venda'}</h1>
            <button type="button" className="fluxo-back" onClick={() => setView('dispute-reason')} style={{ marginLeft: 'auto' }}>
              Abrir disputa
            </button>
          </div>
          <div className="fluxo-progress">
            <span className="fluxo-progress-text">Etapa {flowStep} de {totalSteps}</span>
            <div className="fluxo-progress-bar">
              <div className="fluxo-progress-fill" style={{ width: `${(flowStep / totalSteps) * 100}%` }} />
            </div>
          </div>
        </header>

        <div className="fluxo-content">
          {flowType === 'compra' && flowStep === 1 && (
            <TermosCompra termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} goNextStep={goNextStep} />
          )}
          {flowType === 'compra' && flowStep === 2 && (
            <PixCompra pixConfirmed={pixConfirmed} setPixConfirmed={setPixConfirmed} goNextStep={goNextStep} />
          )}
          {flowType === 'compra' && flowStep === 3 && (
            <ChatDadosCompra showChat={showChat} setShowChat={setShowChat} goNextStep={goNextStep} />
          )}
          {flowType === 'compra' && flowStep === 4 && <AguardoCompra goNextStep={goNextStep} />}
          {flowType === 'compra' && flowStep === 5 && (
            <ConfirmacaoCompra selectedOffer={selectedOffer} goNextStep={goNextStep} />
          )}

          {flowType === 'venda' && flowStep === 1 && (
            <TermosVenda termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} goNextStep={goNextStep} />
          )}
          {flowType === 'venda' && flowStep === 2 && <AguardoVenda goNextStep={goNextStep} />}
          {flowType === 'venda' && flowStep === 3 && (
            <StepperVenda stepperDone={stepperDone} setStepperDone={setStepperDone} showChat={showChat} setShowChat={setShowChat} goNextStep={goNextStep} />
          )}
          {flowType === 'venda' && flowStep === 4 && (
            <ConfirmacaoVenda selectedOffer={selectedOffer} goNextStep={goNextStep} />
          )}
        </div>
      </div>
    )
  }

  const companhiasUnicas = [...new Set(rawList.map((item) => item.companhia).filter(Boolean))]

  return (
    <div className="balcao-container">
      <header className="app-header">
        <div className="app-header-row app-header-row--no-margin">
          <h1 className="app-header-title">Negociar</h1>
          <span style={{ width: 40 }} aria-hidden />
        </div>
        <div style={{ paddingTop: 'var(--space-5)' }}>
          <TabToggle
            tabs={[{ id: 'compra', label: 'Comprar' }, { id: 'venda', label: 'Vender' }]}
            active={tab}
            onChange={(id) => { if (view !== 'flow' && !view.startsWith('dispute')) setTab(id) }}
          />
        </div>
      </header>
      <div className="app-subheader">
        <h2 className="app-subheader-title">Virgin Atlantic</h2>
        <span className="app-subheader-count">{list.length} {tab === 'compra' ? 'ofertas de compra' : 'ofertas de venda'}</span>
      </div>
      <div className="app-filters app-filters-balcao app-filters-balcao-toolbar">
        <div className="app-filters-balcao-buttons">
          <button
            type="button"
            className={`app-filter-sort-btn ${filtroCompanhia ? 'active' : ''}`}
            onClick={() => { setDrawerMode('filter'); setDrawerOpen(true); }}
            aria-label="Filtrar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Filtro</span>
          </button>
          <button
            type="button"
            className="app-filter-sort-btn"
            onClick={() => { setDrawerMode('sort'); setDrawerOpen(true); }}
            aria-label="Ordenar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="14" y2="12" />
              <line x1="4" y1="18" x2="8" y2="18" />
            </svg>
            <span>Ordenar</span>
          </button>
        </div>
      </div>

      <BottomSheet
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerMode === 'filter' ? 'Filtrar por companhia' : 'Ordenar'}
      >
        {drawerMode === 'filter' ? (
          <div className="balcao-drawer-options">
            <button type="button" className={`balcao-drawer-option ${!filtroCompanhia ? 'active' : ''}`} onClick={() => setFiltroCompanhia('')}>Todas</button>
            {companhiasUnicas.map((c) => (
              <button key={c} type="button" className={`balcao-drawer-option ${filtroCompanhia === c ? 'active' : ''}`} onClick={() => setFiltroCompanhia(c)}>{c}</button>
            ))}
          </div>
        ) : (
          <div className="balcao-drawer-options">
            <button type="button" className={`balcao-drawer-option ${ordenacao === 'recentes' ? 'active' : ''}`} onClick={() => setOrdenacao('recentes')}>Mais recentes primeiro</button>
            <button type="button" className={`balcao-drawer-option ${ordenacao === 'preco' ? 'active' : ''}`} onClick={() => setOrdenacao('preco')}>Preço</button>
          </div>
        )}
        <button type="button" className="balcao-drawer-apply btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={() => setDrawerOpen(false)}>Aplicar</button>
      </BottomSheet>
      <div className="app-list">
        {list.map((item) => {
          const milesMatch = (item.miles || '').match(/(\d+)\s*k/i)
          const milesK = milesMatch ? parseInt(milesMatch[1], 10) : 100
          const milheiro = milesK > 0 ? Math.round(item.originalValue / milesK) : 0
          const valorFormatado = typeof item.originalValue === 'number'
            ? `R$ ${item.originalValue.toLocaleString('pt-BR')}`
            : (item.approx || '—')
          const amountLabel = milesMatch ? `${milesMatch[1]}k` : (item.miles || '—')

          return (
            <article key={item.id} className="card-balcao-list">
              <div className="card-balcao-list-top">
                <div className="card-balcao-list-avatar-wrap">
                  <img src={item.avatar} alt="" className="card-balcao-list-avatar" />
                </div>
                <div className="card-balcao-list-info">
                  <span className="card-balcao-list-name">{item.name}</span>
                  <span className="card-balcao-list-meta">{item.rating} • {item.negociacoes}</span>
                </div>
              </div>
              <div className="card-balcao-list-logo-metrics">
                {item.airlineLogo && (
                  <img src={item.airlineLogo} alt="" className="card-balcao-list-logo" />
                )}
                <div className="card-balcao-list-metrics">
                  <div className="card-balcao-list-metric">
                    <span className="card-balcao-list-metric-label">{item.companhia || 'Programa'}</span>
                    <span className="card-balcao-list-metric-value">{amountLabel}</span>
                  </div>
                  <div className="card-balcao-list-metric">
                    <span className="card-balcao-list-metric-label">Milheiro</span>
                    <span className="card-balcao-list-metric-value">R$ {milheiro}</span>
                  </div>
                  <div className="card-balcao-list-metric">
                    <span className="card-balcao-list-metric-label">Valor</span>
                    <span className="card-balcao-list-metric-value">{valorFormatado}</span>
                  </div>
                </div>
              </div>
              <div className="card-balcao-list-actions">
                <button type="button" className="btn-outline" onClick={(e) => { e.stopPropagation(); setSelectedOfferForMakeOffer(item); setScreen('make-offer') }}>Fazer oferta</button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={(e) => { e.stopPropagation(); handleIniciarCompraVenda(item, tab === 'compra' ? 'compra' : 'venda') }}
                >
                  {primaryAction}
                </button>
              </div>
            </article>
          )
        })}
      </div>

    </div>
  )
}
