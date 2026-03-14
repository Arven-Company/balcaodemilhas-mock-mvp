import { useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { MOCK_PLANOS } from '../data/mocks'
import BackButton from '../components/BackButton'
import '../styles/app-layout.css'
import '../styles/conta.css'

export default function Planos({ onBack }) {
  const { setPurchasedPlanName, setScreen, addToast } = useApp()
  const planosRef = useRef(null)

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

  return (
    <div className="conta-detalhe-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <BackButton onClick={onBack} />
          <h1 className="app-header-title">Planos</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="conta-detalhe">
        <p className="conta-section-title" style={{ marginBottom: 'var(--space-5)' }}>Compare os planos de assinatura</p>
        <div className="conta-planos-slider planos-slider-full" ref={planosRef}>
          {MOCK_PLANOS.map((pl) => (
            <div key={pl.id} className="conta-plano-card">
              <h4 className="conta-plano-name">{pl.name}</h4>
              <p className="conta-plano-price">{pl.price}</p>
              <ul className="conta-plano-features">
                {pl.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
                <button
                  type="button"
                  className="conta-plano-btn"
                  onClick={() => {
                    addToast('Plano adquirido com sucesso.', 'success')
                    setPurchasedPlanName(pl.name)
                    setScreen('plan-success')
                  }}
                >
                  Selecionar
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
