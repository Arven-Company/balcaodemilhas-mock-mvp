import { useNavigate, useLocation } from 'react-router-dom'

export default function AdminAddSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const type = location.state?.type
  const title = location.state?.title
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
          <button type="button" className="contrato-btn-primary" onClick={() => navigate('/admin', { replace: true })}>
            Voltar ao Painel
          </button>
          <button type="button" className="contrato-btn-skip" onClick={() => navigate(type === 'emission' ? '/emissoes' : '/promocoes')}>
            Ver {typeLabel === 'Emissão' ? 'Emissões' : 'Promoções'}
          </button>
        </div>
      </div>
    </div>
  )
}
