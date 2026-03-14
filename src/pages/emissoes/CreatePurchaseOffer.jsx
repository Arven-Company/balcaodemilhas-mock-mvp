import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'

export default function CreatePurchaseOffer({ flight, onBack }) {
  const title = flight?.route || (flight?.from && flight?.to ? `${flight.from} → ${flight.to}` : 'Oferta de compra')

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Criar Oferta de Compra</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content">
        <div className="conta-detalhe">
          <div className="conta-detalhe-card">
            <h2 className="create-offer-flight-title">{title}</h2>
            {flight?.price && <p className="create-offer-flight-price">{flight.price}</p>}
            <p className="create-offer-placeholder">Preencha os dados da sua oferta de compra. Esta funcionalidade será expandida em breve.</p>
          </div>
        </div>
        <div className="contrato-actions">
          <button type="button" className="contrato-btn-primary" onClick={onBack}>
            Voltar ao detalhe
          </button>
        </div>
      </div>
    </div>
  )
}
