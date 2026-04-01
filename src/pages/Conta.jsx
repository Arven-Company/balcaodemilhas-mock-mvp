import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import { MOCK_HISTORICO_VENDAS } from '../data/mocks'
import { PageHeader, Avatar, Badge, Button } from '../components/ui'
import BackButton from '../components/BackButton'

export default function Conta() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [historicoView, setHistoricoView] = useState('list')
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
        <PageHeader title="Transação" onBack={() => window.history.back()} centered />
        <div className="conta-detalhe">
          <div className="conta-detalhe-card">
            <div className="conta-detalhe-row">
              <span className="conta-detalhe-label">Data</span>
              <span className="conta-detalhe-value">{selectedTransacao.date}</span>
            </div>
            <div className="conta-detalhe-row">
              <span className="conta-detalhe-label">Tipo</span>
              <Badge variant={selectedTransacao.type === 'Venda' ? 'success' : 'primary'}>{selectedTransacao.type}</Badge>
            </div>
            <div className="conta-detalhe-row">
              <span className="conta-detalhe-label">Milhas</span>
              <span className="conta-detalhe-value conta-detalhe-value--bold">{selectedTransacao.miles}</span>
            </div>
            <div className="conta-detalhe-row">
              <span className="conta-detalhe-label">Valor</span>
              <span className="conta-detalhe-value conta-detalhe-value--bold">{selectedTransacao.value}</span>
            </div>
            <div className="conta-detalhe-row">
              <span className="conta-detalhe-label">Status</span>
              <Badge variant="success">{selectedTransacao.status}</Badge>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <span aria-hidden />
          <h1 className="app-header-title">Perfil</h1>
          <span aria-hidden />
        </div>
      </header>
      <div className="app-list conta-list">
        {/* Profile card */}
        <section className="conta-profile-card">
          <div className="conta-profile-top">
            <Avatar src={avatarSrc} size="xl" />
            <div className="conta-profile-info">
              <h2 className="conta-nome">{profile?.name ?? 'Usuário'}</h2>
              <Badge variant="outline">Plano Básico</Badge>
            </div>
          </div>
          <div className="conta-stats-row">
            <div className="conta-stat">
              <span className="conta-stat-value">430k</span>
              <span className="conta-stat-label">Milhas</span>
            </div>
            <div className="conta-stat-divider" />
            <div className="conta-stat">
              <span className="conta-stat-value">3</span>
              <span className="conta-stat-label">Transações</span>
            </div>
            <div className="conta-stat-divider" />
            <div className="conta-stat">
              <span className="conta-stat-value">4,8</span>
              <span className="conta-stat-label">Avaliação</span>
            </div>
          </div>
          <Button variant="secondary" fullWidth onClick={() => navigate('/conta/editar')}>Editar perfil</Button>
        </section>

        {/* Ad banner */}
        <section className="conta-section">
          <button type="button" className="conta-ad-banner" onClick={() => navigate('/conta/anunciar')}>
            <span className="conta-ad-banner-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            </span>
            <span className="conta-ad-banner-text">
              <span className="conta-ad-banner-title">Anunciar na Aba Emissões</span>
              <span className="conta-ad-banner-desc">Destaque sua oferta para mais compradores.</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="conta-menu-chevron-icon" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </section>

        {/* Vendas */}
        <section className="conta-section">
          <h3 className="conta-section-title">Vendas</h3>
          <div className="conta-menu">
            <button type="button" className="conta-menu-item" onClick={() => navigate('/conta/vendas')}>
              <span className="conta-menu-label">Minhas Vendas</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="conta-menu-chevron-icon" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </section>

        {/* Histórico */}
        <section className="conta-section">
          <h3 className="conta-section-title">Histórico de vendas</h3>
          <div className="conta-historico-list">
            {MOCK_HISTORICO_VENDAS.map((t) => (
              <button
                key={t.id}
                type="button"
                className="conta-historico-card"
                onClick={() => handleHistoricoClick(t)}
              >
                <div className="conta-historico-card-top">
                  <Badge variant={t.type === 'Venda' ? 'success' : 'primary'} className="conta-historico-badge">{t.type}</Badge>
                  <span className="conta-historico-date">{t.date}</span>
                </div>
                <div className="conta-historico-card-body">
                  <span className="conta-historico-miles">{t.miles}</span>
                  <span className="conta-historico-value">{t.value}</span>
                </div>
                <div className="conta-historico-card-footer">
                  <Badge variant="success">{t.status}</Badge>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Planos */}
        <section className="conta-section">
          <button type="button" className="conta-planos-banner" onClick={() => navigate('/conta/planos')}>
            <span className="conta-planos-banner-label">Planos de assinatura</span>
            <span className="conta-planos-banner-title">Conheça e compare os planos</span>
            <span className="conta-planos-banner-cta">Ver planos ›</span>
          </button>
        </section>

        {/* Configurações */}
        <section className="conta-section">
          <h3 className="conta-section-title">Configurações</h3>
          <div className="conta-menu">
            <button type="button" className="conta-menu-item" onClick={() => navigate('/contrato')}>
              <span className="conta-menu-label">Contrato de Intermediação</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="conta-menu-chevron-icon" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <button type="button" className="conta-menu-item" onClick={() => navigate('/configuracoes')}>
              <span className="conta-menu-label">Configurações</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="conta-menu-chevron-icon" aria-hidden><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
