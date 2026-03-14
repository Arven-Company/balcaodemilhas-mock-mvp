import { useState } from 'react'
import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'
import '../../styles/fluxo-balcao.css'

const AIRLINES = ['LATAM', 'Azul', 'GOL', 'TAP Air Portugal', 'Iberia']

export default function AdminAddEmission({ onBack, onSelectDates }) {
  const [emission, setEmission] = useState({
    airline: 'LATAM',
    to: '',
    from: '',
    tripType: 'ida-e-volta',
    priceMiles: 100000,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmission((prev) => ({
      ...prev,
      [name]: name === 'priceMiles' ? parseInt(value, 10) || 0 : value,
    }))
  }

  const handleNext = () => {
    if (!emission.from?.trim() || !emission.to?.trim() || emission.priceMiles <= 0) {
      return
    }
    onSelectDates({
      ...emission,
      id: `admin-emission-${Date.now()}`,
      airlineLogoUrl: '',
      imageUrl: '',
    })
  }

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Adicionar Emissão</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content">
        <div className="conta-detalhe">
          <div className="conta-section">
            <label className="admin-label">Companhia Aérea</label>
            <select
              name="airline"
              value={emission.airline}
              onChange={handleChange}
              className="fluxo-modal-input"
            >
              {AIRLINES.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="conta-section">
            <label className="admin-label">Origem</label>
            <input
              type="text"
              name="from"
              value={emission.from}
              onChange={handleChange}
              placeholder="Ex: São Paulo"
              className="fluxo-modal-input"
            />
          </div>
          <div className="conta-section">
            <label className="admin-label">Destino</label>
            <input
              type="text"
              name="to"
              value={emission.to}
              onChange={handleChange}
              placeholder="Ex: Lisboa"
              className="fluxo-modal-input"
            />
          </div>
          <div className="conta-section">
            <label className="admin-label">Tipo de Viagem</label>
            <select
              name="tripType"
              value={emission.tripType}
              onChange={handleChange}
              className="fluxo-modal-input"
            >
              <option value="ida-e-volta">Ida e Volta</option>
              <option value="ida">Só Ida</option>
            </select>
          </div>
          <div className="conta-section">
            <label className="admin-label">Milhas (trecho)</label>
            <input
              type="number"
              name="priceMiles"
              value={emission.priceMiles}
              onChange={handleChange}
              min={1}
              className="fluxo-modal-input"
            />
          </div>
        </div>
        <div className="contrato-actions">
          <button type="button" className="contrato-btn-primary" onClick={handleNext}>
            Selecionar Datas
          </button>
        </div>
      </div>
    </div>
  )
}
