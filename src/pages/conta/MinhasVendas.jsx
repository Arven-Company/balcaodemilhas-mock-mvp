import { MOCK_HISTORICO_VENDAS } from '../../data/mocks'
import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'

export default function MinhasVendas({ onBack, onSelectSale }) {
  const list = MOCK_HISTORICO_VENDAS.filter((t) => t.type === 'Venda')

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Minhas Vendas</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="conta-detalhe">
        {list.length === 0 ? (
          <p className="conta-empty-state">Nenhuma venda encontrada. Suas vendas aparecerão aqui.</p>
        ) : (
          <ul className="conta-historico">
            {list.map((t) => (
              <li
                key={t.id}
                className="conta-historico-item"
                role="button"
                tabIndex={0}
                onClick={() => onSelectSale(t)}
                onKeyDown={(e) => e.key === 'Enter' && onSelectSale(t)}
              >
                <span className="conta-historico-date">{t.date}</span>
                <span className="conta-historico-type">{t.type}</span>
                <span className="conta-historico-miles">{t.miles}</span>
                <span className="conta-historico-value">{t.value}</span>
                <span className="conta-historico-status">{t.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
