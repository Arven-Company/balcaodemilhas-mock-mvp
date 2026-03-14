import '../../styles/app-layout.css'
import '../../styles/conta.css'
import '../../styles/contrato.css'

function StepperItem({ title, description, status }) {
  const isCompleted = status === 'completed'
  return (
    <div className="sale-detail-stepper-item">
      <div className="sale-detail-stepper-node-wrap">
        <div className={`sale-detail-stepper-node ${isCompleted ? 'sale-detail-stepper-node--done' : ''}`} />
      </div>
      <div className="sale-detail-stepper-content">
        <h3 className={`sale-detail-stepper-title ${isCompleted ? '' : 'sale-detail-stepper-title--pending'}`}>{title}</h3>
        <p className={`sale-detail-stepper-desc ${isCompleted ? '' : 'sale-detail-stepper-desc--pending'}`}>{description}</p>
      </div>
    </div>
  )
}

export default function DetalheVenda({ sale, onBack }) {
  const steps = [
    { key: 'security', title: 'Análise de Segurança', description: 'Análise concluída com sucesso.', status: 'completed' },
    { key: 'payment', title: 'Pagamento', description: 'Pagamento PIX recebido.', status: 'completed' },
    { key: 'emission', title: 'Emissão da Passagem', description: sale?.status === 'Concluída' ? 'Emissão confirmada.' : 'Aguardando confirmação de emissão.', status: sale?.status === 'Concluída' ? 'completed' : 'pending' },
  ]

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row">
          <button type="button" className="conta-back" onClick={onBack} aria-label="Voltar">
            ← Voltar
          </button>
          <h1 className="app-header-title">Detalhes da Venda</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="conta-detalhe">
        {sale && (
          <div className="conta-detalhe-card sale-detail-card">
            <p className="sale-detail-meta">Oferta de Venda</p>
            <p className="sale-detail-miles">{sale.miles} — {sale.value}</p>
            <p className="sale-detail-meta">Data: {sale.date} · Status: {sale.status}</p>
          </div>
        )}
        <h3 className="conta-section-title">Status da Transação</h3>
        <div className="sale-detail-stepper">
          {steps.map((step, index) => (
            <div key={step.key} className="sale-detail-stepper-row">
              <StepperItem title={step.title} description={step.description} status={step.status} />
              {index < steps.length - 1 && <div className="sale-detail-stepper-line" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
