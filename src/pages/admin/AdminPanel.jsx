import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'

export default function AdminPanel({ onBack, onNavigate }) {
  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Painel Administrador</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="conta-detalhe">
        <section className="conta-section card-balcao">
          <button
            type="button"
            className="conta-config-row conta-admin-card"
            onClick={() => onNavigate('admin-add-emission')}
          >
            <span className="conta-config-label">Adicionar Emissão</span>
            <span aria-hidden>→</span>
          </button>
          <p className="conta-admin-desc">Criar uma nova oferta de voo.</p>
        </section>
        <section className="conta-section card-balcao">
          <button
            type="button"
            className="conta-config-row conta-admin-card"
            onClick={() => onNavigate('admin-add-promotion')}
          >
            <span className="conta-config-label">Adicionar Promoção</span>
            <span aria-hidden>→</span>
          </button>
          <p className="conta-admin-desc">Criar uma nova promoção ou cupom.</p>
        </section>
      </div>
    </div>
  )
}
