import { useState, useEffect } from 'react'
import { MOCK_PROMOCOES } from '../data/mocks'
import { useUI } from '../context/UIContext'
import { PageHeader, Badge } from '../components/ui'

function CupomItem({ code, desc, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch {
      onCopy?.(false)
    }
  }

  return (
    <div className="promo-cupom">
      <div className="promo-cupom-body">
        <span className="promo-cupom-code">{code}</span>
        {desc && <span className="promo-cupom-desc">{desc}</span>}
      </div>
      <button type="button" className="promo-cupom-btn" onClick={handleCopy} aria-label="Copiar cupom">
        {copied ? 'Copiado!' : 'Copiar'}
      </button>
    </div>
  )
}

export default function Promocoes() {
  const { addToast } = useUI()
  const [selectedId, setSelectedId] = useState(null)
  const promo = MOCK_PROMOCOES.find((p) => p.id === selectedId)

  const goToList = () => setSelectedId(null)

  const openDetail = (id) => {
    setSelectedId(id)
    window.history.pushState({ promocoesView: 'detalhe', promoId: id }, '', window.location.pathname || '/')
  }

  useEffect(() => {
    const onPopState = () => { if (selectedId) goToList() }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [selectedId])

  if (promo) {
    return (
      <div className="promo-detalhe">
        <PageHeader title="Oferta" onBack={() => window.history.back()} centered />
        <div className="promo-detalhe-hero">
          <img src={promo.image} alt="" loading="lazy" />
          <div className="promo-detalhe-hero-scrim" />
        </div>
        <div className="promo-detalhe-content">
          <h2 className="promo-detalhe-title">{promo.title}</h2>
          <div className="promo-detalhe-meta-row">
            <Badge variant="primary">{promo.category}</Badge>
            <span className="promo-detalhe-validade">{promo.validade}</span>
          </div>
          {promo.content?.map((block, i) => (
            <div key={i} className="promo-block">
              {block.type === 'paragraph' && <p className="promo-para">{block.text}</p>}
              {block.type === 'list' && (
                <ul className="promo-list">
                  {block.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
              {block.type === 'note' && <p className="promo-note">{block.text}</p>}
            </div>
          ))}
          {promo.cupons?.length > 0 && (
            <section className="promo-cupons">
              <h3 className="promo-cupons-title">Cupons</h3>
              {promo.cupons.map((c) => (
                <CupomItem
                  key={c.id}
                  code={c.code}
                  desc={c.desc}
                  onCopy={(success) => {
                    if (success !== false) addToast('Cupom copiado!', 'success')
                  }}
                />
              ))}
            </section>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <span aria-hidden />
          <h1 className="app-header-title">Ofertas</h1>
          <span aria-hidden />
        </div>
      </header>
      <div className="app-list">
        {MOCK_PROMOCOES.map((p) => (
          <article
            key={p.id}
            className="card-promo"
            role="button"
            tabIndex={0}
            onClick={() => openDetail(p.id)}
            onKeyDown={(e) => e.key === 'Enter' && openDetail(p.id)}
          >
            <div className="card-promo-image">
              <img src={p.image} alt="" loading="lazy" />
              <div className="card-promo-image-scrim" />
            </div>
            <div className="card-promo-body">
              <h2 className="card-promo-title">{p.title}</h2>
              <div className="card-promo-meta-row">
                <Badge variant="outline" className="card-promo-badge">{p.category}</Badge>
                <span className="card-promo-validade">{p.validade}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
