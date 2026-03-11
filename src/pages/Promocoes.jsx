import { MOCK_PROMOCOES } from '../data/mocks'
import '../styles/cards.css'
import '../styles/app-layout.css'

export default function Promocoes() {
  return (
    <>
      <header className="app-header">
        <div className="app-header-row">
          <h1 className="app-header-title">Promoções</h1>
        </div>
      </header>
      <div className="app-list">
        {MOCK_PROMOCOES.map((promo) => (
          <article key={promo.id} className="card-promo">
            <div className="card-promo-image">
              <img src={promo.image} alt="" />
            </div>
            <div className="card-promo-body">
              <h2 className="card-promo-title">{promo.title}</h2>
              <p className="card-promo-meta">{promo.category} · {promo.validade}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
