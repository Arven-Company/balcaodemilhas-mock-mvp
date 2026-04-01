import { useNavigate, useParams } from 'react-router-dom'
import { MOCK_EMISSOES } from '../../data/mocks'
import BackButton from '../../components/BackButton'

export default function CreatePurchaseOffer() {
  const navigate = useNavigate()
  const { id } = useParams()
  const flight = MOCK_EMISSOES.find((f) => f.id === id)
  const title = flight?.route || (flight?.from && flight?.to ? `${flight.from} → ${flight.to}` : 'Oferta de compra')

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <BackButton onClick={() => navigate(-1)} />
          <h1 className="app-header-title">Criar Oferta</h1>
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
          <button type="button" className="contrato-btn-primary" onClick={() => navigate(-1)}>
            Voltar ao detalhe
          </button>
        </div>
      </div>
    </div>
  )
}
