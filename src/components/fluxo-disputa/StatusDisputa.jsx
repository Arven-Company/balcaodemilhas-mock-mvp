import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'
import '../../styles/disputa.css'

export default function StatusDisputa({ offer, reason, onDone }) {
  return (
    <div className="disputa-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <span style={{ width: 60 }} />
          <h1 className="app-header-title">Status da Disputa</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="disputa-status-content">
        <div className="disputa-status-icon" aria-hidden>
          ⚠
        </div>
        <h2 className="disputa-status-title">Disputa em Análise</h2>
        <p className="disputa-status-text">
          Recebemos sua solicitação e nossa equipe de suporte já está analisando o caso.
        </p>
        <div className="disputa-status-card card-balcao">
          <div className="disputa-status-row">
            <p className="disputa-status-meta">Transação em Disputa</p>
            <p className="disputa-status-value">{offer?.miles ?? '—'}</p>
          </div>
          <div className="disputa-status-row">
            <p className="disputa-status-meta">Parte Contrária</p>
            <p className="disputa-status-value">{offer?.name ?? '—'}</p>
          </div>
          <div className="disputa-status-row">
            <p className="disputa-status-meta">Motivo da Disputa</p>
            <p className="disputa-status-value">{reason ?? '—'}</p>
          </div>
        </div>
        <p className="disputa-status-footer">
          Entraremos em contato via e-mail ou chat em até 24 horas úteis com os próximos passos.
        </p>
      </div>
      <div className="disputa-status-actions">
        <button type="button" className="contrato-btn-primary" onClick={onDone}>
          Voltar para o Balcão
        </button>
      </div>
    </div>
  )
}
