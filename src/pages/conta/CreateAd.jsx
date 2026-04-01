import { useState } from 'react'
import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'
import '../../styles/fluxo-balcao.css'

export default function CreateAd({ onBack, onNext }) {
  const [ad, setAd] = useState({
    sponsorName: '',
    from: '',
    to: '',
    priceBRL: '',
    imageUrl: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAd((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (!ad.sponsorName?.trim() || !ad.from?.trim() || !ad.to?.trim() || !ad.priceBRL?.trim()) return
    onNext({
      ...ad,
      priceBRL: parseFloat(ad.priceBRL) || 0,
    })
  }

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Anunciar Emissão</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content">
        <div className="conta-detalhe">
          <h3 className="conta-section-title">Detalhes do Anúncio</h3>
          <div className="conta-section">
            <label className="admin-label">Nome da Agência / Anunciante</label>
            <input
              type="text"
              name="sponsorName"
              value={ad.sponsorName}
              onChange={handleChange}
              placeholder="Ex: Agência Turismo"
              className="fluxo-modal-input"
            />
          </div>
          <div className="conta-section">
            <label className="admin-label">Origem</label>
            <input type="text" name="from" value={ad.from} onChange={handleChange} placeholder="Ex: São Paulo" className="fluxo-modal-input" />
          </div>
          <div className="conta-section">
            <label className="admin-label">Destino</label>
            <input type="text" name="to" value={ad.to} onChange={handleChange} placeholder="Ex: Roma" className="fluxo-modal-input" />
          </div>
          <div className="conta-section">
            <label className="admin-label">Preço (R$)</label>
            <input type="number" name="priceBRL" value={ad.priceBRL} onChange={handleChange} placeholder="3000" className="fluxo-modal-input" />
          </div>
          <div className="conta-section">
            <label className="admin-label">URL da Imagem (opcional)</label>
            <input type="text" name="imageUrl" value={ad.imageUrl} onChange={handleChange} placeholder="https://..." className="fluxo-modal-input" />
          </div>
        </div>
        <div className="contrato-actions">
          <button type="button" className="contrato-btn-primary" onClick={handleNext}>
            Escolher Plano de Anúncio
          </button>
        </div>
      </div>
    </div>
  )
}
