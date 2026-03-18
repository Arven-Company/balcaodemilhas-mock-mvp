import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { MOCK_BALCAO_COMPRA, MOCK_BALCAO_VENDA } from '../data/mocks'
import BackButton from '../components/BackButton'
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
  const [contraproposta, setContraproposta] = useState({ open: false, offerId: null, originalValue: 100 })
  const [contrapropostaValor, setContrapropostaValor] = useState('')
  const [contrapropostaError, setContrapropostaError] = useState('')
  const [filtroCompanhia, setFiltroCompanhia] = useState('')
  const [ordenacao, setOrdenacao] = useState('recentes') // 'recentes' | 'preco'
  const [layoutBalcao, setLayoutBalcao] = useState('list') // 'list' | 'grid'
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

  const minContraproposta = Math.ceil(contraproposta.originalValue * 0.85)
  const handleOpenContraproposta = (offer) => {
    const originalValue = offer?.originalValue ?? 100
    setContraproposta({ open: true, offerId: offer?.id, originalValue })
    setContrapropostaValor('')
    setContrapropostaError('')
  }
  const handleCloseContraproposta = () => {
    setContraproposta({ open: false, offerId: null, originalValue: 100 })
    setContrapropostaValor('')
    setContrapropostaError('')
  }
  const handleContrapropostaSubmit = () => {
    const num = Number(contrapropostaValor.replace(/\D/g, '')) / 100 || 0
    if (num < minContraproposta) {
      setContrapropostaError(`O valor não pode ser mais de 15% inferior ao original. Mínimo: R$ ${minContraproposta.toLocaleString('pt-BR')}`)
      return
    }
    setContrapropostaError('')
    alert('Contraproposta enviada (simulado).')
    handleCloseContraproposta()
  }
  const handleContrapropostaChange = (e) => {
    const v = e.target.value
    setContrapropostaValor(v)
    const num = Number(String(v).replace(/\D/g, '')) / 100 || 0
    if (num > 0 && num < minContraproposta) {
      setContrapropostaError(`Mínimo: R$ ${minContraproposta.toLocaleString('pt-BR')} (15% do original)`)
    } else {
      setContrapropostaError('')
    }
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
          <h1 className="app-header-title">Balcão</h1>
          <span style={{ width: 40 }} aria-hidden />
        </div>
      </header>
      <div className="app-tabs">
        <button
          type="button"
          className={`app-tab ${tab === 'compra' ? 'active' : ''}`}
          onClick={() => { if (view !== 'flow' && !view.startsWith('dispute')) setTab('compra') }}
          disabled={view === 'flow' || view.startsWith('dispute')}
          aria-disabled={view === 'flow' || view.startsWith('dispute')}
        >
          Compra
        </button>
        <button
          type="button"
          className={`app-tab ${tab === 'venda' ? 'active' : ''}`}
          onClick={() => { if (view !== 'flow' && !view.startsWith('dispute')) setTab('venda') }}
          disabled={view === 'flow' || view.startsWith('dispute')}
          aria-disabled={view === 'flow' || view.startsWith('dispute')}
        >
          Venda
        </button>
      </div>
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
        <div className="app-layout-toggle">
          <button type="button" className={`app-layout-btn ${layoutBalcao === 'list' ? 'active' : ''}`} onClick={() => setLayoutBalcao('list')} aria-label="Lista">Lista</button>
          <button type="button" className={`app-layout-btn ${layoutBalcao === 'grid' ? 'active' : ''}`} onClick={() => setLayoutBalcao('grid')} aria-label="Compacto">Compacto</button>
        </div>
      </div>

      {drawerOpen && (
        <div className="balcao-drawer-overlay" onClick={() => setDrawerOpen(false)} aria-hidden>
          <div className="balcao-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={drawerMode === 'filter' ? 'Filtros' : 'Ordenação'}>
            <div className="balcao-drawer-handle" aria-hidden />
            <h2 className="balcao-drawer-title">{drawerMode === 'filter' ? 'Filtrar por companhia' : 'Ordenar'}</h2>
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
            <button type="button" className="balcao-drawer-apply btn btn-primary" onClick={() => setDrawerOpen(false)}>Aplicar</button>
          </div>
        </div>
      )}
      <div className="app-list">
        {list.map((item) => {
          const milesMatch = (item.miles || '').match(/(\d+)\s*k/i)
          const milesK = milesMatch ? parseInt(milesMatch[1], 10) : 100
          const milheiro = milesK > 0 ? Math.round(item.originalValue / milesK) : 0
          const valorFormatado = typeof item.originalValue === 'number'
            ? `R$ ${item.originalValue.toLocaleString('pt-BR')}`
            : (item.approx || '—')
          const amountLabel = milesMatch ? `${milesMatch[1]}k` : (item.miles || '—')

          if (layoutBalcao === 'list') {
            return (
              <article key={item.id} className="card-balcao-list">
                <div className="card-balcao-list-top">
                  <img src={item.avatar} alt="" className="card-balcao-list-avatar" />
                  <div className="card-balcao-list-info">
                    <span className="card-balcao-list-name">{item.name}</span>
                    <span className="card-balcao-list-meta">{item.rating} • {item.negociacoes}</span>
                  </div>
                </div>
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
                <div className="card-balcao-list-actions">
                  <button type="button" className="btn-outline" onClick={(e) => { e.stopPropagation(); setSelectedOfferForMakeOffer(item); setScreen('make-offer'); }}>Fazer oferta</button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={(e) => { e.stopPropagation(); handleIniciarCompraVenda(item, tab === 'compra' ? 'compra' : 'venda'); }}
                  >
                    {primaryAction}
                  </button>
                </div>
              </article>
            )
          }
          /* Compacto: card original (ex-Lista), igual ao anterior */
          return (
            <article key={item.id} className="card-balcao">
              <div className="card-balcao-body">
                <div className="card-balcao-left">
                  <img src={item.avatar} alt="" className="card-balcao-avatar" />
                  <span className="card-balcao-name">{item.name}</span>
                  <span className="card-balcao-meta">{item.rating}  •  {item.negociacoes}</span>
                </div>
                <div className="card-balcao-right">
                  <span className="card-balcao-miles">{item.miles}</span>
                  {item.approx && <span className="card-balcao-approx">{item.approx}</span>}
                </div>
              </div>
              <div className="card-balcao-actions">
                <button type="button" className="btn-outline" onClick={(e) => { e.stopPropagation(); setSelectedOfferForMakeOffer(item); setScreen('make-offer'); }}>Fazer oferta</button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={(e) => { e.stopPropagation(); handleIniciarCompraVenda(item, tab === 'compra' ? 'compra' : 'venda'); }}
                >
                  {primaryAction}
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {contraproposta.open && (
        <div className="fluxo-modal-overlay" onClick={handleCloseContraproposta}>
          <div className="fluxo-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="fluxo-modal-title">Fazer oferta (contraproposta)</h2>
            <p className="fluxo-modal-desc">Valor original: R$ {contraproposta.originalValue.toLocaleString('pt-BR')}. O valor não pode ser mais de 15% inferior (mín. R$ {minContraproposta.toLocaleString('pt-BR')}).</p>
            <input
              type="text"
              className="fluxo-modal-input"
              placeholder="R$ 0,00"
              value={contrapropostaValor}
              onChange={handleContrapropostaChange}
              aria-invalid={!!contrapropostaError}
              aria-describedby={contrapropostaError ? 'contraproposta-err' : undefined}
            />
            {contrapropostaError && <p id="contraproposta-err" className="fluxo-modal-error">{contrapropostaError}</p>}
            <div className="fluxo-modal-actions">
              <button type="button" className="btn btn-outline" onClick={handleCloseContraproposta}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleContrapropostaSubmit}>Enviar oferta</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
