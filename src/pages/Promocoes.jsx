import { useState, useEffect } from 'react'
import { MOCK_PROMOCOES } from '../data/mocks'
import BackButton from '../components/BackButton'
import '../styles/cards.css'
import '../styles/app-layout.css'
import '../styles/promocoes.css'

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
        <header className="app-header">
          <div className="app-header-row app-header-row--centered">
            <BackButton onClick={() => window.history.back()} />
            <h1 className="app-header-title">Promoção</h1>
            <span aria-hidden />
          </div>
        </header>
        <div className="promo-detalhe-hero">
          <img src={promo.image} alt="" />
        </div>
        <div className="promo-detalhe-content">
          <h2 className="promo-detalhe-title">{promo.title}</h2>
          <p className="promo-detalhe-meta">{promo.category} · {promo.validade}</p>
          {promo.content?.map((block, i) => (
            <div key={i} className="promo-block">
              {block.type === 'paragraph' && <p className="promo-para">{block.text}</p>}
              {block.type === 'list' && (
                <ul className="promo-list">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
              {block.type === 'note' && <p className="promo-note">{block.text}</p>}
            </div>
          ))}
          {promo.cupons?.length > 0 && (
            <section className="promo-cupons">
              <h3 className="promo-cupons-title">Cupons</h3>
              {promo.cupons.map((c) => (
                <CupomItem key={c.id} code={c.code} desc={c.desc} />
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
          <h1 className="app-header-title">Promoções</h1>
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
              <img src={p.image} alt="" />
            </div>
            <div className="card-promo-body">
              <h2 className="card-promo-title">{p.title}</h2>
              <p className="card-promo-meta">{p.category} · {p.validade}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
