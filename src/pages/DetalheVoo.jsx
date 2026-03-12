import { useState, useRef } from 'react'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import '../styles/cards.css'
import '../styles/app-layout.css'
import '../styles/detalhe-voo.css'

function IconBack() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function CalendarHorizontal({ selectedDate, onSelectDate, availableDates, milesByDate }) {
  const year = 2025
  const month = 2 // março (0-indexed)
  const scrollRef = useRef(null)

  const dateKey = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const availableList = availableDates
    .map((key) => {
      const d = parseInt(key.slice(-2), 10)
      return { d, key, miles: milesByDate[key] ?? null }
    })
    .sort((a, b) => a.d - b.d)

  const isSelected = (d) =>
    selectedDate &&
    selectedDate.getDate() === d &&
    selectedDate.getMonth() === month &&
    selectedDate.getFullYear() === year

  const scroll = (dir) => {
    if (!scrollRef.current) return
    const step = 56 * 3
    scrollRef.current.scrollBy({ left: dir === 'prev' ? -step : step, behavior: 'smooth' })
  }

  return (
    <div className="detalhe-voo-calendar-h">
      <button
        type="button"
        className="detalhe-voo-calendar-h-arrow"
        onClick={() => scroll('prev')}
        aria-label="Datas anteriores"
      >
        ‹
      </button>
      <div className="detalhe-voo-calendar-h-scroll" ref={scrollRef}>
        {availableList.map(({ d, miles }) => {
          const sel = isSelected(d)
          return (
            <button
              key={d}
              type="button"
              className={`detalhe-voo-calendar-h-cell ${sel ? 'selected' : ''}`}
              onClick={() => onSelectDate(new Date(year, month, d))}
            >
              <span className="detalhe-voo-calendar-day">{d}</span>
              {miles != null && <span className="detalhe-voo-calendar-miles">{miles}</span>}
            </button>
          )
        })}
      </div>
      <button
        type="button"
        className="detalhe-voo-calendar-h-arrow"
        onClick={() => scroll('next')}
        aria-label="Próximas datas"
      >
        ›
      </button>
    </div>
  )
}

/* Mock: milhas por data (disponíveis para emissão) */
const DEFAULT_MILES_BY_DATE = {
  '2025-03-05': '120k',
  '2025-03-08': '95k',
  '2025-03-12': '110k',
  '2025-03-15': '98k',
  '2025-03-19': '125k',
  '2025-03-22': '88k',
  '2025-03-26': '102k',
}

export default function DetalheVoo({ card, onBack }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const availableDates = Object.keys(DEFAULT_MILES_BY_DATE)
  const milesByDate = DEFAULT_MILES_BY_DATE

  const handleSolicitar = () => {
    if (!selectedDate) return
    setShowConfirmModal(true)
  }

  const handleCloseModal = () => setShowConfirmModal(false)

  const handleNovaOrdem = () => {
    setShowConfirmModal(false)
    onBack?.()
  }

  const handleCriarOferta = () => {
    setShowConfirmModal(false)
    onBack?.()
  }

  return (
    <div className={`detalhe-voo ${selectedDate ? 'detalhe-voo--has-ordem' : ''}`}>
      <header className="app-header detalhe-voo-header">
        <div className="app-header-row">
          <button type="button" className="detalhe-voo-back" onClick={onBack} aria-label="Voltar">
            <IconBack />
          </button>
          <h1 className="app-header-title">Detalhe do voo</h1>
          <span style={{ width: 40 }} />
        </div>
      </header>

      <article className="card-emissao detalhe-voo-card">
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
          {card.agent ? (
            <div className="card-emissao-agent">
              <img src={FIGMA_ASSETS.avatar} alt="" />
              <div className="card-emissao-agent-info">
                <div className="rating">{card.rating}</div>
                <div className="name">{card.agent}</div>
              </div>
            </div>
          ) : (
            card.airlineLogo && (
              <div className="card-emissao-airline">
                <img src={card.airlineLogo} alt="" className="logo" />
                <span className="type">{card.type}</span>
              </div>
            )
          )}
        </div>
      </article>

      <section className="detalhe-voo-section">
        <h2 className="detalhe-voo-section-title">Selecione a data</h2>
        <p className="detalhe-voo-section-desc">Dias disponíveis para emissão.</p>
        <CalendarHorizontal
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          availableDates={availableDates}
          milesByDate={milesByDate}
        />
        <div className="detalhe-voo-legend">
          <span className="detalhe-voo-legend-item available">Disponível</span>
          <span className="detalhe-voo-legend-item unavailable">Indisponível</span>
        </div>
      </section>

      {selectedDate && (() => {
        const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
        const miles = milesByDate[key]
        const dayNames = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
        const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
        const dateLabel = `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]} de ${selectedDate.getFullYear()}`
        return (
          <div className="detalhe-voo-ordem-card">
            <h2 className="detalhe-voo-ordem-title">Nova Ordem de Balcão</h2>
            <div className="detalhe-voo-ordem-row">
              <div className="detalhe-voo-ordem-info">
                {card.airlineLogo && (
                  <img src={card.airlineLogo} alt="" className="detalhe-voo-ordem-logo" />
                )}
                <p className="detalhe-voo-ordem-date">{dateLabel}</p>
                <p className="detalhe-voo-ordem-route">{card.route}</p>
                <p className="detalhe-voo-ordem-miles">{miles ? `${miles.replace('k', '')}.000 milhas` : '—'}</p>
              </div>
              <button
                type="button"
                className="detalhe-voo-ordem-btn"
                onClick={handleSolicitar}
              >
                Criar Oferta de Compra
              </button>
            </div>
          </div>
        )
      })()}

      {showConfirmModal && (
        <div className="detalhe-voo-modal-overlay" onClick={handleCloseModal}>
          <div className="detalhe-voo-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="detalhe-voo-modal-title">Solicitação enviada</h2>
            <p className="detalhe-voo-modal-desc">Sua solicitação foi enviada ao balcão. O que deseja fazer agora?</p>
            <div className="detalhe-voo-modal-actions">
              <button type="button" className="detalhe-voo-modal-btn primary" onClick={handleNovaOrdem}>
                Nova Ordem de Balcão
              </button>
              <button type="button" className="detalhe-voo-modal-btn secondary" onClick={handleCriarOferta}>
                Criar Oferta de Compra
              </button>
              <button type="button" className="detalhe-voo-modal-btn outline" onClick={handleCloseModal}>
                Ficar nesta tela
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
