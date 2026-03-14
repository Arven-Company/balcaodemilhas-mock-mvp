import { useApp } from '../context/AppContext'
import BackButton from '../components/BackButton'
import '../styles/app-layout.css'
import '../styles/conta.css'
import '../styles/contrato.css'

export default function Configuracoes({ onBack, onOpenAdmin }) {
  const { theme, toggleTheme, addToast } = useApp()

  const handleToggleTheme = () => {
    toggleTheme()
    addToast(theme === 'dark' ? 'Tema claro ativado.' : 'Tema escuro ativado.', 'success')
  }

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <BackButton onClick={onBack} />
          <h1 className="app-header-title">Configurações</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="conta-detalhe">
        <section className="conta-section card-balcao">
          <h3 className="conta-section-title">Aparência</h3>
          <label className="conta-config-row">
            <span className="conta-config-label">Tema escuro</span>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={handleToggleTheme}
              className="conta-config-toggle"
              aria-label="Alternar tema escuro"
            />
          </label>
        </section>
        {onOpenAdmin && (
          <section className="conta-section card-balcao">
            <h3 className="conta-section-title">Administração</h3>
            <button type="button" className="conta-config-row" onClick={onOpenAdmin}>
              <span className="conta-config-label">Painel Administrador</span>
              <span aria-hidden>→</span>
            </button>
          </section>
        )}
      </div>
    </div>
  )
}
