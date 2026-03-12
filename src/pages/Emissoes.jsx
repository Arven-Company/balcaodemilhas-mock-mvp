import { useState, useEffect } from 'react'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import { MOCK_EMISSOES } from '../data/mocks'
import DetalheVoo from './DetalheVoo'
import '../styles/cards.css'
import '../styles/app-layout.css'

export default function Emissoes() {
  const [view, setView] = useState('list')
  const [selectedCard, setSelectedCard] = useState(null)

  const goToList = () => {
    setView('list')
    setSelectedCard(null)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setView('detalhe')
    window.history.pushState({ emissoesView: 'detalhe', cardId: card.id }, '', window.location.pathname || '/')
  }

  useEffect(() => {
    const onPopState = () => {
      if (view === 'detalhe') goToList()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [view])

  if (view === 'detalhe' && selectedCard) {
    return <DetalheVoo card={selectedCard} onBack={() => window.history.back()} />
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-row">
          <h1 className="app-header-title">Emissões</h1>
          <img src={FIGMA_ASSETS.avatar} alt="" className="app-header-avatar" />
        </div>
        <div className="app-filters">
          <button type="button" className="app-filter-pill active">Companhias</button>
          <button type="button" className="app-filter-pill">10.02.2025 - 12/03/2025</button>
          <button type="button" className="app-filter-pill">
            <img src={FIGMA_ASSETS.iconFilter} alt="" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 4 }} />
            Filtros
          </button>
        </div>
      </header>
      <div className="app-list">
        {MOCK_EMISSOES.map((card) => (
          <article key={card.id} className="card-emissao" role="button" tabIndex={0} onClick={() => handleCardClick(card)} onKeyDown={(e) => e.key === 'Enter' && handleCardClick(card)}>
            <div className="card-emissao-image">
              <img src={card.image} alt="" />
              <div className="card-emissao-image-content">
                <div className="card-emissao-image-left">
                  {card.executiva && <span className="badge-executiva">EXECUTIVA</span>}
                  {card.detail && <span>{card.detail}</span>}
                  {card.period && <span>{card.period}</span>}
                  <span className="route">{card.route}</span>
                </div>
                <div className="card-emissao-image-right">
                  {card.labelRight && <span>{card.labelRight}</span>}
                  <span className="price">{card.price}</span>
                </div>
              </div>
            </div>
            <div className="card-emissao-footer">
              <div className="card-emissao-agent">
                {card.agent ? (
                  <>
                    <img src={FIGMA_ASSETS.avatar} alt="" />
                    <div className="card-emissao-agent-info">
                      <div className="rating">{card.rating}</div>
                      <div className="name">{card.agent}</div>
                    </div>
                  </>
                ) : (
                  <>
                    {card.airlineLogo && <img src={card.airlineLogo} alt="" style={{ height: 18, width: 'auto', objectFit: 'contain' }} />}
                    <div className="card-emissao-agent-info">
                      <div className="type">{card.type}</div>
                    </div>
                  </>
                )}
              </div>
              {card.sponsor && <span className="card-emissao-sponsor">patrocinado</span>}
              {card.airlineLogo && !card.agent && (
                <div className="card-emissao-airline">
                  <span className="badge-executiva">EXECUTIVA</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
