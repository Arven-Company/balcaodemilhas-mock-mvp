import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'

export default function AdminAddSuccess({ type, title, onBackToPanel, onViewList }) {
  const typeLabel = type === 'emission' ? 'Emissão' : 'Promoção'

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <h1 className="app-header-title">{typeLabel} Adicionada</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content admin-success-content">
        <div className="admin-success-icon" aria-hidden>✓</div>
        <h2 className="admin-success-title">{typeLabel} adicionada com sucesso!</h2>
        <p className="admin-success-desc">
          A {typeLabel.toLowerCase()} &quot;{title}&quot; já está disponível no aplicativo.
        </p>
        <div className="contrato-actions">
          <button type="button" className="contrato-btn-primary" onClick={onBackToPanel}>
            Voltar ao Painel
          </button>
          <button type="button" className="contrato-btn-skip" onClick={onViewList}>
            Ver {typeLabel === 'Emissão' ? 'Emissões' : 'Promoções'}
          </button>
        </div>
      </div>
    </div>
  )
}
