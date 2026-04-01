import { useNavigate, useLocation } from 'react-router-dom'

export default function AdSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const adDetails = location.state?.adData
  const title = adDetails?.from && adDetails?.to ? `${adDetails.from} → ${adDetails.to}` : 'Seu anúncio'

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <span style={{ width: 60 }} />
          <h1 className="app-header-title">Anúncio Criado</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content admin-success-content">
        <div className="admin-success-icon" aria-hidden>✓</div>
        <h2 className="admin-success-title">Anúncio criado com sucesso!</h2>
        <p className="admin-success-desc">
          O anúncio para &quot;{title}&quot; já está ativo e aparecerá na aba de emissões.
        </p>
        <div className="contrato-actions">
          <button type="button" className="contrato-btn-primary" onClick={() => navigate('/emissoes')}>
            Ver Emissões
          </button>
          <button type="button" className="contrato-btn-skip" onClick={() => navigate('/conta')}>
            Voltar para a Conta
          </button>
        </div>
      </div>
    </div>
  )
}
