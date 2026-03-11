import { useState } from 'react'
import { MOCK_BALCAO_COMPRA, MOCK_BALCAO_VENDA } from '../data/mocks'
import '../styles/cards.css'
import '../styles/app-layout.css'

export default function Balcao() {
  const [tab, setTab] = useState('compra')
  const list = tab === 'compra' ? MOCK_BALCAO_COMPRA : MOCK_BALCAO_VENDA
  const primaryAction = tab === 'compra' ? 'Iniciar Compra' : 'Iniciar Venda'

  return (
    <>
      <h1 className="app-header-title" style={{ padding: '24px 20px 0' }}>Balcão</h1>
      <div className="app-tabs">
        <button type="button" className={`app-tab ${tab === 'compra' ? 'active' : ''}`} onClick={() => setTab('compra')}>Compra</button>
        <button type="button" className={`app-tab ${tab === 'venda' ? 'active' : ''}`} onClick={() => setTab('venda')}>Venda</button>
      </div>
      <div className="app-subheader">
        <h2 className="app-subheader-title">Virgin Atlantic</h2>
        <span className="app-subheader-count">{tab === 'compra' ? '1400 ofertas de compra' : '320 ofertas de venda'}</span>
      </div>
      <div className="app-list">
        {list.map((item) => (
          <article key={item.id} className="card-balcao">
            <div className="card-balcao-body">
              <div className="card-balcao-left">
                <img src={item.avatar} alt="" className="card-balcao-avatar" />
                <span className="card-balcao-name">{item.name}</span>
                <span className="card-balcao-meta">{item.rating}  •  {item.negociacoes}</span>
              </div>
              <div className="card-balcao-right">
                <span className="card-balcao-miles">{item.miles}</span>
                {item.approx && <span className="card-balcao-approx">{item.approx}</span>}
              </div>
            </div>
            <div className="card-balcao-actions">
              <button type="button" className="btn-outline">Fazer oferta</button>
              <button type="button" className="btn-primary">{primaryAction}</button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
