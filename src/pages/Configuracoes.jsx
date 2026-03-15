import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import '../styles/app-layout.css'
import '../styles/conta.css'
import '../styles/contrato.css'
import '../styles/admin-panel.css'

const IconAparencia = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const IconAdmin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconDesenvolvimento = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

export default function Configuracoes({ onBack, onOpenAdmin, onOpenTestEmissoes }) {
  const { theme, toggleTheme, addToast } = useApp()

  const handleToggleTheme = () => {
    toggleTheme()
    addToast(theme === 'dark' ? 'Tema claro ativado.' : 'Tema escuro ativado.', 'success')
  }

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <BackButton onClick={onBack} />
          <h1 className="app-header-title">Configurações</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="conta-detalhe">
        <section className="conta-section card-balcao" aria-label="Aparência">
          <h3 className="conta-section-title">Aparência</h3>
          <div className="admin-action-list">
            <label className="admin-action-item admin-action-item--switch">
              <span className="admin-action-icon-wrap" aria-hidden>
                <IconAparencia />
              </span>
              <span className="admin-action-label">Tema escuro</span>
              <span className="admin-action-switch-track">
                <input
                  type="checkbox"
                  role="switch"
                  checked={theme === 'dark'}
                  onChange={handleToggleTheme}
                  className="admin-action-switch"
                  aria-label="Alternar tema escuro"
                />
                <span className="admin-action-switch-thumb" aria-hidden />
              </span>
            </label>
          </div>
        </section>
        {onOpenAdmin && (
          <section className="conta-section card-balcao" aria-label="Administração">
            <h3 className="conta-section-title">Administração</h3>
            <div className="admin-action-list">
              <button type="button" className="admin-action-item" onClick={onOpenAdmin}>
                <span className="admin-action-icon-wrap" aria-hidden>
                  <IconAdmin />
                </span>
                <span className="admin-action-label">Painel Administrador</span>
                <span className="conta-menu-chevron" aria-hidden>›</span>
              </button>
            </div>
          </section>
        )}
        <section className="conta-section card-balcao" aria-label="Desenvolvimento">
          <h3 className="conta-section-title">Desenvolvimento</h3>
          <div className="admin-action-list">
            {onOpenTestEmissoes && (
              <button type="button" className="admin-action-item" onClick={onOpenTestEmissoes}>
                <span className="admin-action-icon-wrap" aria-hidden>
                  <IconDesenvolvimento />
                </span>
                <span className="admin-action-label">Tela de teste de emissões</span>
                <span className="conta-menu-chevron" aria-hidden>›</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
