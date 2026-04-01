import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const IconEmission = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2-1 3-2 3.5 2 3.5-6 1.5-1.5z" />
  </svg>
)

const IconPromotion = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M12 22V12" />
  </svg>
)

export default function AdminPanel() {
  const navigate = useNavigate()

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <BackButton onClick={() => navigate(-1)} />
          <h1 className="app-header-title">Painel Administrador</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="conta-detalhe">
        <section className="conta-section card-balcao" aria-label="Administração">
          <h3 className="conta-section-title">Administração</h3>
          <div className="admin-action-list">
            <button
              type="button"
              className="admin-action-item"
              onClick={() => navigate('/admin/emissao')}
            >
              <span className="admin-action-icon-wrap" aria-hidden>
                <IconEmission />
              </span>
              <span className="admin-action-label">Adicionar Emissão</span>
              <span className="conta-menu-chevron" aria-hidden>›</span>
            </button>
            <button
              type="button"
              className="admin-action-item"
              onClick={() => navigate('/admin/promocao')}
            >
              <span className="admin-action-icon-wrap" aria-hidden>
                <IconPromotion />
              </span>
              <span className="admin-action-label">Adicionar Promoção</span>
              <span className="conta-menu-chevron" aria-hidden>›</span>
            </button>
          </div>
          <p className="conta-admin-desc">Criar novas ofertas de voo ou promoções.</p>
        </section>
      </div>
    </div>
  )
}
