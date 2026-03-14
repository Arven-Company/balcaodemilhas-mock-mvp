import { useState } from 'react'
import BackButton from '../BackButton'
import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'
import '../../styles/fluxo-balcao.css'
import '../../styles/disputa.css'

const MOTIVOS = [
  'Passagem não disponível',
  'Outra parte solicitou cancelamento',
  'Outro',
]

export default function MotivoDisputa({ offer, onBack, onConfirm }) {
  const [selectedReason, setSelectedReason] = useState('')
  const [otherText, setOtherText] = useState('')

  const isOther = selectedReason === 'Outro'
  const canConfirm = selectedReason && (!isOther || otherText.trim() !== '')

  const handleConfirm = () => {
    if (!canConfirm) return
    onConfirm(isOther ? otherText.trim() : selectedReason)
  }

  return (
    <div className="disputa-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <BackButton onClick={onBack} />
          <h1 className="app-header-title">Abrir Disputa</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="disputa-content">
        <div className="disputa-offer-card card-balcao">
          <p className="disputa-offer-label">Disputa para a transação</p>
          <p className="disputa-offer-miles">{offer?.miles ?? '—'}</p>
          <p className="disputa-offer-name">com {offer?.name ?? '—'}</p>
        </div>
        <h3 className="disputa-section-title">Selecione o motivo:</h3>
        <div className="disputa-reasons">
          {MOTIVOS.map((reason) => (
            <label key={reason} className="disputa-reason-label">
              <input
                type="radio"
                name="disputeReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="disputa-radio"
              />
              <span className="disputa-reason-text">{reason}</span>
            </label>
          ))}
        </div>
        {isOther && (
          <input
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Descreva o motivo"
            className="disputa-input-outro"
          />
        )}
        <button
          type="button"
          className="contrato-btn-primary disputa-btn-confirm"
          onClick={handleConfirm}
          disabled={!canConfirm}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
