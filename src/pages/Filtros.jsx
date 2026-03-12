import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import '../styles/app-layout.css'
import '../styles/conta.css'
import '../styles/filtros.css'

const COMPANHIAS = ['Virgin Atlantic', 'LATAM', 'Azul', 'GOL', 'TAP Air Portugal']

export default function Filtros({ onBack }) {
  const { filters, setFilters } = useApp()
  const [selectedAirlines, setSelectedAirlines] = useState(filters.airlines || [])
  const [milesMin, setMilesMin] = useState(filters.milesMin ?? 0)
  const [milesMax, setMilesMax] = useState(filters.milesMax ?? 500000)

  useEffect(() => {
    setSelectedAirlines(filters.airlines || [])
    setMilesMin(filters.milesMin ?? 0)
    setMilesMax(filters.milesMax ?? 500000)
  }, [filters])

  const toggleAirline = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]
    )
  }

  const handleApply = () => {
    setFilters({ airlines: selectedAirlines, milesMin, milesMax })
    onBack()
  }

  const handleClear = () => {
    setSelectedAirlines([])
    setMilesMin(0)
    setMilesMax(500000)
    setFilters({ airlines: [], milesMin: 0, milesMax: 500000 })
  }

  return (
    <div className="filtros-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Filtros</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="filtros-content">
        <section className="filtros-section">
          <h3 className="filtros-section-title">Companhias Aéreas</h3>
          <div className="filtros-checkbox-list">
            {COMPANHIAS.map((airline) => (
              <label key={airline} className="filtros-checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedAirlines.includes(airline)}
                  onChange={() => toggleAirline(airline)}
                  className="filtros-checkbox"
                />
                <span className="filtros-checkbox-text">{airline}</span>
              </label>
            ))}
          </div>
        </section>
        <section className="filtros-section">
          <h3 className="filtros-section-title">Quantidade de Milhas</h3>
          <div className="filtros-range-box">
            <div className="filtros-range-values">
              <span>{(milesMin / 1000).toLocaleString('pt-BR')}k</span>
              <span>{(milesMax / 1000).toLocaleString('pt-BR')}k</span>
            </div>
            <input
              type="range"
              min="0"
              max="500000"
              step="10000"
              value={milesMax}
              onChange={(e) => setMilesMax(Number(e.target.value))}
              className="filtros-range"
            />
            <input
              type="range"
              min="0"
              max="500000"
              step="10000"
              value={milesMin}
              onChange={(e) => setMilesMin(Number(e.target.value))}
              className="filtros-range"
            />
          </div>
        </section>
        <div className="filtros-actions">
          <button type="button" className="filtros-btn-primary" onClick={handleApply}>
            Aplicar
          </button>
          <button type="button" className="filtros-btn-skip" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </div>
  )
}
