import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const AD_PLANS = [
  {
    name: 'Destaque',
    price: '49,90',
    duration: '7 dias',
    benefits: ['Posição de destaque 1x por dia', "Selo 'Anúncio' no card", 'Visibilidade por 7 dias'],
  },
  {
    name: 'Patrocinado',
    price: '99,90',
    duration: '14 dias',
    benefits: ['Topo da lista 3x por dia', "Selo 'Patrocinado'", 'Borda dourada de destaque', 'Visibilidade por 14 dias'],
  },
]

export default function SelectAdPlan() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState(AD_PLANS[1])

  return (
    <div className="contrato-wrap select-ad-plan-wrap">
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <BackButton onClick={() => navigate(-1)} />
          <h1 className="app-header-title">Planos</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content">
        <div className="conta-detalhe select-ad-plan-list">
          {AD_PLANS.map((plan) => {
            const isSelected = selectedPlan.name === plan.name
            return (
              <button
                key={plan.name}
                type="button"
                className={`select-ad-plan-card ${isSelected ? 'select-ad-plan-card--selected' : ''}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <h3 className="select-ad-plan-name">{plan.name}</h3>
                <p className="select-ad-plan-price">
                  R$ {plan.price} <span className="select-ad-plan-duration">/ {plan.duration}</span>
                </p>
                <ul className="select-ad-plan-benefits">
                  {plan.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
        <div className="contrato-actions">
          <button
            type="button"
            className="contrato-btn-primary"
            onClick={() => navigate('/conta/anunciar/sucesso')}
          >
            Confirmar Anúncio por R$ {selectedPlan.price}
          </button>
        </div>
      </div>
    </div>
  )
}
