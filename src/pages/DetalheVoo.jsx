import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import BackButton from '../components/BackButton'
import '../styles/cards.css'
import '../styles/app-layout.css'
import '../styles/detalhe-voo.css'

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTH_NAMES_FULL = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function CalendarMonth({ selectedDate, onSelectDate, availableDates, milesByDate }) {
  const [currentYear, setCurrentYear] = useState(2025)
  const [currentMonth, setCurrentMonth] = useState(2) // 0-indexed (Março)

  const dateKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const isAvailable = (d) => availableDates.includes(dateKey(currentYear, currentMonth, d))
  const getMiles = (d) => milesByDate[dateKey(currentYear, currentMonth, d)] ?? null
  const isSelected = (d) =>
    selectedDate &&
    selectedDate.getDate() === d &&
    selectedDate.getMonth() === currentMonth &&
    selectedDate.getFullYear() === currentYear

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyCells = Array.from({ length: firstDay }, (_, i) => ({ empty: true, key: `e-${i}` }))
  const dayCells = days.map((d) => ({ empty: false, day: d, key: `d-${d}` }))
  const allCells = [...emptyCells, ...dayCells]

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  return (
    <div className="detalhe-voo-calendar-month">
      <div className="detalhe-voo-calendar-month-nav">
        <button type="button" className="detalhe-voo-calendar-month-arrow" onClick={goPrevMonth} aria-label="Mês anterior">
          ‹
        </button>
        <span className="detalhe-voo-calendar-month-title">
          {MONTH_NAMES_FULL[currentMonth]} {currentYear}
        </span>
        <button type="button" className="detalhe-voo-calendar-month-arrow" onClick={goNextMonth} aria-label="Mês seguinte">
          ›
        </button>
      </div>
      <div className="detalhe-voo-calendar-month-weekdays">
        {WEEKDAYS.map((wd) => (
          <span key={wd} className="detalhe-voo-calendar-month-wd">{wd}</span>
        ))}
      </div>
      <div className="detalhe-voo-calendar-month-grid">
        {allCells.map((cell) => {
          if (cell.empty) {
            return <span key={cell.key} className="detalhe-voo-calendar-month-cell empty" />
          }
          const d = cell.day
          const avail = isAvailable(d)
          const sel = isSelected(d)
          const miles = getMiles(d)
          return (
            <button
              key={cell.key}
              type="button"
              className={`detalhe-voo-calendar-month-cell ${avail ? 'available' : 'unavailable'} ${sel ? 'selected' : ''}`}
              disabled={!avail}
              onClick={() => avail && onSelectDate(new Date(currentYear, currentMonth, d))}
            >
              <span className="detalhe-voo-calendar-day">{d}</span>
              {avail && miles != null && <span className="detalhe-voo-calendar-miles">{miles}</span>}
            </button>
          )
        })}
      </div>
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

export default function DetalheVoo({ card, onBack, onNavigateToCreateOffer }) {
  const { addToast } = useApp()
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
    addToast('Solicitação enviada.', 'success')
    onBack?.()
  }

  const handleCriarOferta = () => {
    setShowConfirmModal(false)
    addToast('Solicitação enviada.', 'success')
    onBack?.()
  }

  return (
    <div className={`detalhe-voo ${selectedDate ? 'detalhe-voo--has-ordem' : ''}`}>
      <header className="app-header detalhe-voo-header">
        <div className="app-header-row app-header-row--centered">
          <BackButton onClick={onBack} />
          <h1 className="app-header-title">Detalhe do voo</h1>
          <span style={{ width: 40 }} />
        </div>
      </header>

      <article className="card-emissao detalhe-voo-card">
        <div className="card-emissao-image">
          <img src={card.image} alt="" />
          <div className="card-emissao-image-content">
            <div className="card-emissao-image-left">
              {card.sponsor && <span className="card-emissao-sponsor-overlay">patrocinado</span>}
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
              <div className="card-emissao-agent">
                <div className="card-emissao-agent-meta">
                  <img src={card.airlineLogo} alt="" className="card-emissao-agent-logo" />
                  {card.type && <span className="card-emissao-agent-type">{card.type}</span>}
                </div>
              </div>
            )
          )}
          <div className="card-emissao-footer-right">
            {card.executiva && <span className="badge-executiva">EXECUTIVA</span>}
          </div>
        </div>
      </article>

      <section className="detalhe-voo-section">
        <h2 className="detalhe-voo-section-title">Selecione a data</h2>
        <p className="detalhe-voo-section-desc">Dias disponíveis para emissão.</p>
        <CalendarMonth
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
                onClick={() => (onNavigateToCreateOffer ? onNavigateToCreateOffer(card) : handleSolicitar())}
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
