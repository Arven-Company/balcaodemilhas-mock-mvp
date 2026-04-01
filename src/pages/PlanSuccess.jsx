import { useNavigate, useLocation } from 'react-router-dom'

export default function PlanSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const purchasedPlanName = location.state?.planName

  return (
    <div className="contrato-wrap plan-success-wrap">
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <span style={{ width: 60 }} />
          <h1 className="app-header-title">Plano ativado</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="plan-success-content">
        <div className="plan-success-card card-balcao">
          <div className="plan-success-icon" aria-hidden>✓</div>
          <h2 className="plan-success-title">Obrigado!</h2>
          <p className="plan-success-text">
            O plano <strong>{purchasedPlanName || 'escolhido'}</strong> foi ativado com sucesso.
          </p>
          <button type="button" className="contrato-btn-primary" onClick={() => navigate('/conta')}>
            Concluído
          </button>
        </div>
      </div>
    </div>
  )
}
