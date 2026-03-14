import { useState, useMemo } from 'react'
import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'
import '../../styles/fluxo-balcao.css'

export default function MakeOffer({ offer, onBack }) {
  const originalValue = offer?.originalValue ?? 100
  const milesLabel = offer?.miles ?? '—'
  const minAllowed = useMemo(() => Math.ceil(originalValue * 0.85), [originalValue])
  const [totalPrice, setTotalPrice] = useState(String(originalValue))
  const numTotal = parseFloat(totalPrice.replace(/\D/g, '')) / 100 || parseFloat(totalPrice) || 0
  const isInvalid = isNaN(numTotal) || numTotal < minAllowed

  const handleChange = (e) => {
    const v = e.target.value
    setTotalPrice(v)
  }

  const handleSubmit = () => {
    if (isInvalid) return
    onBack()
  }

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Fazer Oferta</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content">
        <div className="conta-detalhe">
          <div className="conta-detalhe-card">
            <p className="sale-detail-meta">Oferta para</p>
            <p className="sale-detail-miles">{milesLabel} {offer?.companhia ? `· ${offer.companhia}` : ''}</p>
            <p className="sale-detail-meta">de {offer?.name ?? '—'}</p>
            <p className="sale-detail-meta" style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border)' }}>
              Valor original: R$ {originalValue.toLocaleString('pt-BR')}
            </p>
          </div>
          <div className="conta-section">
            <label className="admin-label">Sua contraproposta (valor total, R$)</label>
            <input
              type="text"
              inputMode="decimal"
              value={totalPrice}
              onChange={handleChange}
              placeholder="0,00"
              className="fluxo-modal-input"
              aria-invalid={isInvalid}
            />
            {isInvalid && (
              <p className="fluxo-modal-error" style={{ marginTop: 'var(--space-2)' }}>
                O valor não pode ser mais de 15% inferior ao original (mín. R$ {minAllowed.toLocaleString('pt-BR')}).
              </p>
            )}
          </div>
        </div>
        <div className="contrato-actions">
          <button type="button" className="contrato-btn-primary" onClick={handleSubmit} disabled={isInvalid}>
            Enviar Proposta
          </button>
        </div>
      </div>
    </div>
  )
}
