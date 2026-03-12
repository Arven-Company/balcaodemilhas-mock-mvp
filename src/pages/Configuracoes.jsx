import { useApp } from '../context/AppContext'
import '../styles/app-layout.css'
import '../styles/conta.css'
import '../styles/contrato.css'

export default function Configuracoes({ onBack }) {
  const { theme, toggleTheme } = useApp()

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
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
              onChange={toggleTheme}
              className="conta-config-toggle"
              aria-label="Alternar tema escuro"
            />
          </label>
        </section>
      </div>
    </div>
  )
}
