import { useApp } from '../context/AppContext'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import '../styles/app-layout.css'

export default function Conta() {
  const { theme, toggleTheme } = useApp()

  return (
    <>
      <header className="app-header">
        <div className="app-header-row">
          <h1 className="app-header-title">Conta</h1>
        </div>
      </header>
      <div className="app-list">
        <section className="card-balcao" style={{ padding: '20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={FIGMA_ASSETS.avatar} alt="" className="app-header-avatar" style={{ width: 56, height: 56, borderRadius: 28 }} />
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--color-text)' }}>Marcelo Campos</h2>
              <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--color-text-muted)' }}>Plano Básico</p>
            </div>
          </div>
        </section>
        <section className="card-balcao" style={{ padding: 16 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>Configurações</h3>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <span style={{ fontSize: 14, color: 'var(--color-text)' }}>Tema escuro</span>
            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} style={{ width: 20, height: 20, accentColor: 'var(--color-primary)' }} />
          </label>
        </section>
        <section className="card-balcao" style={{ padding: 16 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>Conta</h3>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-muted)' }}>Histórico de vendas</p>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--color-text-muted)' }}>Planos de assinatura</p>
        </section>
      </div>
    </>
  )
}
