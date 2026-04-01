import { useState } from 'react'
import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'
import '../../styles/fluxo-balcao.css'

const CATEGORIES = ['Clubes de Milhas', 'Pacotes e Hotéis', 'Cartões de Crédito']

export default function AdminAddPromotion({ onBack, onConfirm }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Clubes de Milhas')
  const [expiryDate, setExpiryDate] = useState(() => new Date().toISOString().split('T')[0])

  const handleConfirm = () => {
    if (!title.trim()) return
    onConfirm('promotion', title.trim())
  }

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Adicionar Promoção</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content">
        <div className="conta-detalhe">
          <div className="conta-section">
            <label className="admin-label">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Assinatura Clube Smiles"
              className="fluxo-modal-input"
            />
          </div>
          <div className="conta-section">
            <label className="admin-label">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="fluxo-modal-input"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="conta-section">
            <label className="admin-label">Data de Validade</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="fluxo-modal-input"
            />
          </div>
        </div>
        <div className="contrato-actions">
          <button type="button" className="contrato-btn-primary" onClick={handleConfirm} disabled={!title.trim()}>
            Confirmar e Adicionar Promoção
          </button>
        </div>
      </div>
    </div>
  )
}
