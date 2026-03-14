import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import { MOCK_HISTORICO_VENDAS } from '../data/mocks'
import BackButton from '../components/BackButton'
import '../styles/app-layout.css'
import '../styles/conta.css'

export default function Conta() {
  const { profile, setScreen } = useApp()
  const [historicoView, setHistoricoView] = useState('list') // list | detail
  const [selectedTransacao, setSelectedTransacao] = useState(null)
  const avatarSrc = profile?.avatarUrl?.trim() || FIGMA_ASSETS.avatar

  const handleHistoricoClick = (t) => {
    setSelectedTransacao(t)
    setHistoricoView('detail')
    window.history.pushState({ contaView: 'transacao', id: t.id }, '', window.location.pathname || '/')
  }

  const handleBackHistorico = () => {
    setHistoricoView('list')
    setSelectedTransacao(null)
  }

  useEffect(() => {
    const onPopState = () => {
      if (historicoView === 'detail') handleBackHistorico()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [historicoView])

  if (historicoView === 'detail' && selectedTransacao) {
    return (
      <div className="conta-detalhe-wrap">
        <header className="app-header">
          <div className="app-header-row">
            <BackButton onClick={() => window.history.back()} />
            <h1 className="app-header-title">Transação</h1>
            <span style={{ width: 60 }} />
          </div>
        </header>
        <div className="conta-detalhe">
          <div className="conta-detalhe-card">
            <p><strong>Data:</strong> {selectedTransacao.date}</p>
            <p><strong>Tipo:</strong> {selectedTransacao.type}</p>
            <p><strong>Milhas:</strong> {selectedTransacao.miles}</p>
            <p><strong>Valor:</strong> {selectedTransacao.value}</p>
            <p><strong>Status:</strong> {selectedTransacao.status}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-row">
          <h1 className="app-header-title">Conta</h1>
          <span style={{ width: 40 }} aria-hidden />
        </div>
      </header>
      <div className="app-list conta-list">
        <section className="conta-painel card-balcao">
          <div className="conta-painel-inner">
            <img src={avatarSrc} alt="" className="conta-avatar" />
            <div>
              <h2 className="conta-nome">{profile?.name ?? 'Usuário'}</h2>
              <p className="conta-plano-label">Plano Básico</p>
            </div>
          </div>
          <button type="button" className="conta-planos-link" onClick={() => setScreen('editar-perfil')} style={{ display: 'block', marginTop: 'var(--space-3)' }}>
            Editar perfil
          </button>
        </section>

        <section className="conta-section">
          <button type="button" className="conta-ad-banner" onClick={() => setScreen('create-ad')}>
            <span className="conta-ad-banner-icon" aria-hidden>📢</span>
            <span className="conta-ad-banner-text">
              <span className="conta-ad-banner-title">Anunciar na Aba Emissões</span>
              <span className="conta-ad-banner-desc">Destaque sua oferta para mais compradores.</span>
            </span>
            <span className="conta-menu-chevron" aria-hidden>›</span>
          </button>
        </section>
        <section className="conta-section">
          <h3 className="conta-section-title">Vendas</h3>
          <div className="conta-menu">
            <button type="button" className="conta-menu-item" onClick={() => setScreen('my-sales')}>
              <span className="conta-menu-label">Minhas Vendas</span>
              <span className="conta-menu-chevron" aria-hidden>›</span>
            </button>
          </div>
        </section>
        <section className="conta-section">
          <h3 className="conta-section-title">Histórico de vendas</h3>
          <ul className="conta-historico">
            {MOCK_HISTORICO_VENDAS.map((t) => (
              <li key={t.id} className="conta-historico-item" role="button" tabIndex={0} onClick={() => handleHistoricoClick(t)} onKeyDown={(e) => e.key === 'Enter' && handleHistoricoClick(t)}>
                <span className="conta-historico-date">{t.date}</span>
                <span className="conta-historico-type">{t.type}</span>
                <span className="conta-historico-miles">{t.miles}</span>
                <span className="conta-historico-value">{t.value}</span>
                <span className="conta-historico-status">{t.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="conta-section">
          <button
            type="button"
            className="conta-planos-banner"
            onClick={() => setScreen('planos')}
          >
            <span className="conta-planos-banner-label">Planos de assinatura</span>
            <span className="conta-planos-banner-title">Conheça e compare os planos</span>
            <span className="conta-planos-banner-cta">Ver planos →</span>
          </button>
        </section>

        <section className="conta-section">
          <h3 className="conta-section-title">Configurações</h3>
          <div className="conta-menu">
            <button type="button" className="conta-menu-item" onClick={() => setScreen('contrato')}>
              <span className="conta-menu-label">Contrato de Intermediação</span>
              <span className="conta-menu-chevron" aria-hidden>›</span>
            </button>
            <button type="button" className="conta-menu-item" onClick={() => setScreen('configuracoes')}>
              <span className="conta-menu-label">Configurações</span>
              <span className="conta-menu-chevron" aria-hidden>›</span>
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
