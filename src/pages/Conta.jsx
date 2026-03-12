import { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import { MOCK_HISTORICO_VENDAS, MOCK_PLANOS } from '../data/mocks'
import Planos from './Planos'
import '../styles/app-layout.css'
import '../styles/conta.css'

export default function Conta() {
  const { theme, toggleTheme } = useApp()
  const [historicoView, setHistoricoView] = useState('list') // list | detail
  const [contaView, setContaView] = useState('painel') // painel | planos
  const [selectedTransacao, setSelectedTransacao] = useState(null)
  const planosRef = useRef(null)

  const handleHistoricoClick = (t) => {
    setSelectedTransacao(t)
    setHistoricoView('detail')
    window.history.pushState({ contaView: 'transacao', id: t.id }, '', window.location.pathname || '/')
  }

  const handleBackHistorico = () => {
    setHistoricoView('list')
    setSelectedTransacao(null)
  }

  useEffect(() => {
    const onPopState = () => {
      if (historicoView === 'detail') handleBackHistorico()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [historicoView])

  useEffect(() => {
    const container = planosRef.current
    if (!container) return
    const cards = container.querySelectorAll('.conta-plano-card')
    const onScroll = () => {
      if (!cards.length) return
      const center = container.scrollLeft + container.clientWidth / 2
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const cardCenter = rect.left - containerRect.left + rect.width / 2 + container.scrollLeft
        const distance = Math.abs(center - cardCenter)
        const scale = Math.max(0.92, 1 - distance / 800)
        card.style.transform = `scale(${scale})`
      })
    }
    container.addEventListener('scroll', onScroll)
    onScroll()
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  if (contaView === 'planos') {
    return <Planos onBack={() => setContaView('painel')} />
  }

  if (historicoView === 'detail' && selectedTransacao) {
    return (
      <div className="conta-detalhe-wrap">
        <header className="app-header">
          <div className="app-header-row">
            <button type="button" className="conta-back" onClick={() => window.history.back()}>← Voltar</button>
            <h1 className="app-header-title">Transação</h1>
            <span style={{ width: 60 }} />
          </div>
        </header>
        <div className="conta-detalhe">
          <div className="conta-detalhe-card">
            <p><strong>Data:</strong> {selectedTransacao.date}</p>
            <p><strong>Tipo:</strong> {selectedTransacao.type}</p>
            <p><strong>Milhas:</strong> {selectedTransacao.miles}</p>
            <p><strong>Valor:</strong> {selectedTransacao.value}</p>
            <p><strong>Status:</strong> {selectedTransacao.status}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-row">
          <h1 className="app-header-title">Conta</h1>
        </div>
      </header>
      <div className="app-list conta-list">
        <section className="conta-painel card-balcao">
          <div className="conta-painel-inner">
            <img src={FIGMA_ASSETS.avatar} alt="" className="conta-avatar" />
            <div>
              <h2 className="conta-nome">Marcelo Campos</h2>
              <p className="conta-plano-label">Plano Básico</p>
            </div>
          </div>
        </section>

        <section className="conta-section">
          <h3 className="conta-section-title">Histórico de vendas</h3>
          <ul className="conta-historico">
            {MOCK_HISTORICO_VENDAS.map((t) => (
              <li key={t.id} className="conta-historico-item" role="button" tabIndex={0} onClick={() => handleHistoricoClick(t)} onKeyDown={(e) => e.key === 'Enter' && handleHistoricoClick(t)}>
                <span className="conta-historico-date">{t.date}</span>
                <span className="conta-historico-type">{t.type}</span>
                <span className="conta-historico-miles">{t.miles}</span>
                <span className="conta-historico-value">{t.value}</span>
                <span className="conta-historico-status">{t.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="conta-section">
          <h3 className="conta-section-title">Planos de assinatura</h3>
          <div className="conta-planos-slider" ref={planosRef}>
            {MOCK_PLANOS.map((pl) => (
              <div key={pl.id} className="conta-plano-card">
                <h4 className="conta-plano-name">{pl.name}</h4>
                <p className="conta-plano-price">{pl.price}</p>
                <ul className="conta-plano-features">
                  {pl.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <button type="button" className="conta-plano-btn">Selecionar</button>
              </div>
            ))}
          </div>
          <button type="button" className="conta-planos-link" onClick={() => setContaView('planos')}>Comparar planos</button>
        </section>

        <section className="conta-section card-balcao">
          <h3 className="conta-section-title">Configurações</h3>
          <label className="conta-config-row">
            <span className="conta-config-label">Tema escuro</span>
            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} className="conta-config-toggle" aria-label="Alternar tema escuro" />
          </label>
        </section>
      </div>
    </>
  )
}
