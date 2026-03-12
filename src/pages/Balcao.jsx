import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { MOCK_BALCAO_COMPRA, MOCK_BALCAO_VENDA } from '../data/mocks'
import Verificacao from './Verificacao'
import '../styles/cards.css'
import '../styles/app-layout.css'
import '../styles/fluxo-balcao.css'

const FLOW_COMPRA_STEPS = ['Termos', 'PIX', 'Chat', 'Aguardo', 'Confirmação']
const FLOW_VENDA_STEPS = ['Termos', 'Aguardo comprador', 'Stepper', 'Confirmação']

export default function Balcao() {
  const { verified, completeVerification } = useApp()
  const [tab, setTab] = useState('compra')
  const [view, setView] = useState('list') // list | verificacao | flow
  const [flowType, setFlowType] = useState(null) // 'compra' | 'venda'
  const [flowStep, setFlowStep] = useState(1)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [pixConfirmed, setPixConfirmed] = useState(false)
  const [stepperDone, setStepperDone] = useState(false)
  const [contraproposta, setContraproposta] = useState({ open: false, offerId: null, originalValue: 100 })
  const [contrapropostaValor, setContrapropostaValor] = useState('')
  const [contrapropostaError, setContrapropostaError] = useState('')

  const list = tab === 'compra' ? MOCK_BALCAO_COMPRA : MOCK_BALCAO_VENDA
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

  if (view === 'flow' && flowType) {
    return (
      <div className="fluxo-balcao-wrap">
        <header className="app-header">
          <div className="app-header-row">
            <button type="button" className="fluxo-back" onClick={exitFlow} aria-label="Sair do fluxo">
              ← Voltar
            </button>
            <h1 className="app-header-title">{flowType === 'compra' ? 'Compra' : 'Venda'}</h1>
            <span style={{ width: 80 }} />
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
            <section className="fluxo-card">
              <h2>Aceite dos termos</h2>
              <p className="fluxo-desc">Leia e aceite os termos da compra para continuar.</p>
              <label className="fluxo-check">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <span>Aceito os termos e condições (simulado)</span>
              </label>
              <button type="button" className="btn btn-primary" disabled={!termsAccepted} onClick={goNextStep}>
                Continuar
              </button>
            </section>
          )}

          {flowType === 'compra' && flowStep === 2 && (
            <section className="fluxo-card">
              <h2>Pagamento PIX</h2>
              <p className="fluxo-desc">Simulação: use o QR ou o código abaixo. Após pagar, clique em Confirmar.</p>
              <div className="fluxo-pix-placeholder">
                <div className="fluxo-pix-qr">QR CODE</div>
                <p className="fluxo-pix-code">Código PIX: 00020126580014br.gov.bcb.pix...</p>
              </div>
              <label className="fluxo-check">
                <input type="checkbox" checked={pixConfirmed} onChange={(e) => setPixConfirmed(e.target.checked)} />
                <span>Confirmo que realizei o pagamento (simulado)</span>
              </label>
              <button type="button" className="btn btn-primary" disabled={!pixConfirmed} onClick={goNextStep}>
                Confirmar pagamento
              </button>
            </section>
          )}

          {flowType === 'compra' && flowStep === 3 && (
            <section className="fluxo-card">
              <h2>Envio de dados no chat</h2>
              <p className="fluxo-desc">Envie os dados solicitados no chat com o vendedor. Quando terminar, clique em Continuar.</p>
              <button type="button" className="btn btn-outline" onClick={() => alert('Abrir chat (simulado).')}>Abrir chat</button>
              <button type="button" className="btn btn-primary" onClick={goNextStep}>Continuar</button>
            </section>
          )}

          {flowType === 'compra' && flowStep === 4 && (
            <section className="fluxo-card">
              <h2>Aguardo da emissão</h2>
              <p className="fluxo-desc">Aguardando confirmação da emissão da passagem. Você será notificado.</p>
              <button type="button" className="btn btn-primary" onClick={goNextStep}>Simular conclusão</button>
            </section>
          )}

          {flowType === 'compra' && flowStep === 5 && (
            <section className="fluxo-card">
              <h2>Compra concluída</h2>
              <p className="fluxo-desc">Resumo da compra (simulado). Oferta: {selectedOffer?.miles || '—'}.</p>
              <button type="button" className="btn btn-primary" onClick={goNextStep}>Voltar ao Balcão</button>
            </section>
          )}

          {flowType === 'venda' && flowStep === 1 && (
            <section className="fluxo-card">
              <h2>Aceite dos termos de venda</h2>
              <p className="fluxo-desc">Leia e aceite os termos da venda para continuar.</p>
              <label className="fluxo-check">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <span>Aceito os termos de venda (simulado)</span>
              </label>
              <button type="button" className="btn btn-primary" disabled={!termsAccepted} onClick={goNextStep}>
                Continuar
              </button>
            </section>
          )}

          {flowType === 'venda' && flowStep === 2 && (
            <section className="fluxo-card">
              <h2>Aguardo do comprador</h2>
              <p className="fluxo-desc">Sua oferta está listada. Aguardando o comprador iniciar a transação.</p>
              <button type="button" className="btn btn-primary" onClick={goNextStep}>Simular comprador ativo</button>
            </section>
          )}

          {flowType === 'venda' && flowStep === 3 && (
            <section className="fluxo-card">
              <h2>Stepper – Análise e emissão</h2>
              <ul className="fluxo-stepper">
                <li className="done">Análise de Segurança</li>
                <li className="done">Confirmação de Pagamento</li>
                <li>Obter dados no chat</li>
                <li>
                  <label className="fluxo-check">
                    <input type="checkbox" checked={stepperDone} onChange={(e) => setStepperDone(e.target.checked)} />
                    <span>Confirmar a emissão da passagem</span>
                  </label>
                </li>
              </ul>
              <button type="button" className="btn btn-outline" onClick={() => alert('Abrir chat (simulado).')}>Abrir chat</button>
              <button type="button" className="btn btn-primary" disabled={!stepperDone} onClick={goNextStep}>Continuar</button>
            </section>
          )}

          {flowType === 'venda' && flowStep === 4 && (
            <section className="fluxo-card">
              <h2>Venda concluída</h2>
              <p className="fluxo-desc">Resumo da venda (simulado). Oferta: {selectedOffer?.miles || '—'}.</p>
              <button type="button" className="btn btn-primary" onClick={goNextStep}>Voltar ao Balcão</button>
            </section>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <h1 className="app-header-title" style={{ padding: '24px 20px 0' }}>Balcão</h1>
      <div className="app-tabs">
        <button type="button" className={`app-tab ${tab === 'compra' ? 'active' : ''}`} onClick={() => setTab('compra')}>Compra</button>
        <button type="button" className={`app-tab ${tab === 'venda' ? 'active' : ''}`} onClick={() => setTab('venda')}>Venda</button>
      </div>
      <div className="app-subheader">
        <h2 className="app-subheader-title">Virgin Atlantic</h2>
        <span className="app-subheader-count">{tab === 'compra' ? '1400 ofertas de compra' : '320 ofertas de venda'}</span>
      </div>
      <div className="app-list">
        {list.map((item) => (
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
              <button type="button" className="btn-outline" onClick={(e) => { e.stopPropagation(); handleOpenContraproposta(item); }}>Fazer oferta</button>
              <button
                type="button"
                className="btn-primary"
                onClick={(e) => { e.stopPropagation(); handleIniciarCompraVenda(item, tab === 'compra' ? 'compra' : 'venda'); }}
              >
                {primaryAction}
              </button>
            </div>
          </article>
        ))}
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
    </>
  )
}
