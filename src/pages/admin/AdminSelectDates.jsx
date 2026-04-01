import { useState } from 'react'
import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'

const MONTH_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function YearCalendar({ selectedDates, onToggleDate }) {
  const year = 2025
  const isSelected = (date) => selectedDates.some((d) => d.getTime() === date.getTime())

  return (
    <div className="admin-dates-calendar">
      {MONTH_NAMES.map((monthName, monthIndex) => {
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
        const firstDay = new Date(year, monthIndex, 1).getDay()
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
        const emptyCells = Array.from({ length: firstDay }, (_, i) => ({ empty: true, key: `e-${monthIndex}-${i}` }))
        const dayCells = days.map((d) => ({ empty: false, day: d, key: `d-${monthIndex}-${d}` }))
        const allCells = [...emptyCells, ...dayCells]
        return (
          <div key={monthIndex} className="admin-dates-month">
            <h4 className="admin-dates-month-title">{monthName}</h4>
            <div className="admin-dates-grid">
              {allCells.map((cell) => {
                if (cell.empty) return <span key={cell.key} className="admin-dates-cell admin-dates-cell--empty" />
                const date = new Date(year, monthIndex, cell.day)
                const sel = isSelected(date)
                return (
                  <button
                    key={cell.key}
                    type="button"
                    className={`admin-dates-cell ${sel ? 'admin-dates-cell--selected' : ''}`}
                    onClick={() => onToggleDate(date)}
                  >
                    {cell.day}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function AdminSelectDates({ emissionData, onBack, onConfirm }) {
  const [selectedDates, setSelectedDates] = useState([])

  const toggleDate = (date) => {
    setSelectedDates((prev) => {
      if (prev.some((d) => d.getTime() === date.getTime())) {
        return prev.filter((d) => d.getTime() !== date.getTime())
      }
      return [...prev, date]
    })
  }

  const handleConfirm = () => {
    if (selectedDates.length === 0) return
    const title = emissionData?.from && emissionData?.to ? `${emissionData.from} → ${emissionData.to}` : 'Emissão'
    onConfirm('emission', title)
  }

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Selecionar Datas</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content">
        <div className="conta-detalhe admin-dates-wrap">
          <YearCalendar selectedDates={selectedDates} onToggleDate={toggleDate} />
        </div>
        <div className="contrato-actions">
          <button
            type="button"
            className="contrato-btn-primary"
            onClick={handleConfirm}
            disabled={selectedDates.length === 0}
          >
            Confirmar e Adicionar Emissão ({selectedDates.length} {selectedDates.length === 1 ? 'data' : 'datas'})
          </button>
        </div>
      </div>
    </div>
  )
}
