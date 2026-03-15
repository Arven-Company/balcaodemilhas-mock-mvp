/**
 * Cards da tela "Teste de emissões" — variantes do Figma "Cards alternativos" (node 224-743).
 * Estrutura/espaçamento próximos ao Figma; cores do app (--color-*).
 */
import { TEST_EMISSOES_CARDS } from '../data/mocks'
import '../styles/card-test-variants.css'

function CardTestVariant({ card }) {
  const variant = card.variant || 'a'

  const actions = (
    <div className="card-test-actions">
      <button type="button" className="card-test-btn card-test-btn-outline">Fazer oferta</button>
      <button type="button" className="card-test-btn card-test-btn-primary">Iniciar Venda</button>
    </div>
  )

  if (variant === 'a') {
    return (
      <article className="card-test card-test--a">
        <div className="card-test-body">
          <div className="card-test-top">
            <div className="card-test-agent">
              <img src={card.avatar} alt="" className="card-test-avatar card-test-avatar--32" />
              <div className="card-test-agent-info">
                <span className="card-test-name">{card.name}</span>
                <span className="card-test-meta">{card.rating} • {card.negociacoes}</span>
              </div>
            </div>
            <div className="card-test-miles-block">
              <span className="card-test-logo-placeholder" aria-hidden />
              <span className="card-test-miles">{card.miles}</span>
            </div>
          </div>
        </div>
        {actions}
      </article>
    )
  }

  if (variant === 'b') {
    return (
      <article className="card-test card-test--b">
        <div className="card-test-body">
          <div className="card-test-agent card-test-agent--row">
            <img src={card.avatar} alt="" className="card-test-avatar" />
            <div className="card-test-agent-info">
              <span className="card-test-name">{card.name}</span>
              <span className="card-test-meta">{card.rating} • {card.negociacoes}</span>
            </div>
          </div>
          <div className="card-test-price-block">
            <div className="card-test-price-left">
              <span className="card-test-miles">{card.miles}</span>
              {card.approx && <span className="card-test-approx">{card.approx}</span>}
              <span className="card-test-total">{card.total}</span>
            </div>
            <span className="card-test-logo-placeholder card-test-logo--right" aria-hidden />
          </div>
        </div>
        {actions}
      </article>
    )
  }

  if (variant === 'c') {
    return (
      <article className="card-test card-test--c">
        <div className="card-test-body">
          <div className="card-test-agent card-test-agent--row">
            <img src={card.avatar} alt="" className="card-test-avatar" />
            <div className="card-test-agent-info">
              <span className="card-test-name">{card.name}</span>
              <span className="card-test-meta">{card.rating} • {card.negociacoes}</span>
            </div>
          </div>
          <div className="card-test-three-cols">
            <span className="card-test-image-strip" aria-hidden />
            <div className="card-test-cols-row">
              {card.cols?.map((col, i) => (
                <div key={i} className="card-test-col">
                  <span className="card-test-col-label">{col.label}</span>
                  <span className="card-test-col-value">{col.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {actions}
      </article>
    )
  }

  if (variant === 'd') {
    return (
      <article className="card-test card-test--d">
        <div className="card-test-body">
          <div className="card-test-agent card-test-agent--row">
            <img src={card.avatar} alt="" className="card-test-avatar" />
            <div className="card-test-agent-info">
              <span className="card-test-name">{card.name}</span>
              <span className="card-test-meta">{card.rating} • {card.negociacoes}</span>
            </div>
          </div>
          <div className="card-test-price-row">
            <span className="card-test-logo-placeholder card-test-logo--left" aria-hidden />
            <div className="card-test-price-inline">
              <span className="card-test-miles">{card.miles}</span>
              <span className="card-test-total">{card.total}</span>
              {card.approx && <span className="card-test-approx">{card.approx}</span>}
            </div>
          </div>
        </div>
        {actions}
      </article>
    )
  }

  if (variant === 'e') {
    return (
      <article className="card-test card-test--e">
        <div className="card-test-body">
          <div className="card-test-agent card-test-agent--row">
            <img src={card.avatar} alt="" className="card-test-avatar" />
            <div className="card-test-agent-info">
              <span className="card-test-name">{card.name}</span>
              <span className="card-test-meta">{card.rating} • {card.negociacoes}</span>
            </div>
          </div>
          <div className="card-test-compact-cols">
            <span className="card-test-image-strip card-test-image-strip--small" aria-hidden />
            <div className="card-test-cols-inline">
              {card.cols?.map((col, i) => (
                <div key={i} className="card-test-col-inline">
                  <span className="card-test-col-label">{col.label}</span>
                  <span className="card-test-col-value">{col.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {actions}
      </article>
    )
  }

  return null
}

export default function TestEmissoesCards() {
  return (
    <div className="app-list card-test-list">
      {TEST_EMISSOES_CARDS.map((card) => (
        <CardTestVariant key={card.id} card={card} />
      ))}
    </div>
  )
}
