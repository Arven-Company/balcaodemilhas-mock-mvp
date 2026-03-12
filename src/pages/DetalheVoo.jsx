import { useState } from 'react'
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

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function Calendar({ selectedDate, onSelectDate, availableDates }) {
  const year = 2025
  const month = 2 // março
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const isAvailable = (d) => {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    return availableDates.includes(key)
  }
  const isSelected = (d) => selectedDate && selectedDate.getDate() === d && selectedDate.getMonth() === month && selectedDate.getFullYear() === year

  return (
    <div className="detalhe-voo-calendar">
      <div className="detalhe-voo-calendar-header">
        {DAYS.map((d) => (
          <span key={d} className="detalhe-voo-calendar-weekday">{d}</span>
        ))}
      </div>
      <div className="detalhe-voo-calendar-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {Array.from({ length: firstDay }, (_, i) => (
          <span key={`empty-${i}`} className="detalhe-voo-calendar-cell empty" />
        ))}
        {days.map((d) => {
          const avail = isAvailable(d)
          const sel = isSelected(d)
          return (
            <button
              key={d}
              type="button"
              className={`detalhe-voo-calendar-cell ${avail ? 'available' : 'unavailable'} ${sel ? 'selected' : ''}`}
              disabled={!avail}
              onClick={() => avail && onSelectDate(new Date(year, month, d))}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function DetalheVoo({ card, onBack }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const availableDates = [
    '2025-03-05', '2025-03-08', '2025-03-12', '2025-03-15', '2025-03-19', '2025-03-22', '2025-03-26',
  ]

  return (
    <div className="detalhe-voo">
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
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          availableDates={availableDates}
        />
        <div className="detalhe-voo-legend">
          <span className="detalhe-voo-legend-item available">Disponível</span>
          <span className="detalhe-voo-legend-item unavailable">Indisponível</span>
        </div>
      </section>

      <div className="detalhe-voo-actions">
        <button
          type="button"
          className="btn-primary detalhe-voo-btn"
          onClick={() => selectedDate && alert('Solicitação enviada ao balcão (simulado).')}
          disabled={!selectedDate}
        >
          Solicitar no balcão
        </button>
      </div>
    </div>
  )
}
