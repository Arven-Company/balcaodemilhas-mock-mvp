import { useState } from 'react'
import BackButton from '../components/BackButton'
import '../styles/app-layout.css'
import '../styles/conta.css'
import '../styles/contrato.css'

export default function Contrato({ onFinish, onSkip, onBack, mode = 'gate' }) {
  const [step, setStep] = useState(1)
  const isConsult = mode === 'consult'

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="contrato-step">
            <h2 className="contrato-step-title">Contrato de Intermediação</h2>
            <p className="contrato-step-text">
              Para garantir a segurança de todas as transações, atuamos como intermediadores. Por favor, leia e aceite os termos para continuar.
            </p>
          </div>
        )
      case 2:
        return (
          <div className="contrato-step">
            <h2 className="contrato-step-title">Termos e Condições</h2>
            <div className="contrato-termos">
              <p>Cláusula 1: O presente contrato tem por objeto a prestação de serviços de intermediação pela CONTRATADA na compra e venda de milhas aéreas entre usuários da plataforma.</p>
              <p>Cláusula 2: A CONTRATADA se compromete a reter o pagamento do comprador até que o vendedor transfira as milhas e o comprador confirme o recebimento.</p>
              <p>Cláusula 3: Em caso de disputas, a CONTRATADA atuará como mediadora para buscar uma solução justa para ambas as partes.</p>
              <p>[...] Outras cláusulas importantes sobre taxas, responsabilidades e prazos.</p>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="contrato-step">
            <h2 className="contrato-step-title">Confirmação</h2>
            <p className="contrato-step-text">
              Ao clicar em "Finalizar", você confirma que leu, compreendeu e concorda com todos os termos do Contrato de Intermediação.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          {step > 1 ? (
            <BackButton onClick={() => setStep(step - 1)} />
          ) : isConsult ? (
            <BackButton onClick={onBack} />
          ) : (
            <button type="button" className="conta-back" onClick={onSkip} aria-label="Pular">Pular</button>
          )}
          <h1 className="app-header-title">Contrato</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="contrato-content">
        {renderStepContent()}
        <div className="contrato-actions">
          {isConsult ? (
            <>
              {step < 3 && (
                <button type="button" className="contrato-btn-primary" onClick={() => setStep(step + 1)}>
                  Próximo
                </button>
              )}
              {step === 3 && (
                <button type="button" className="contrato-btn-primary" onClick={onBack}>
                  Voltar
                </button>
              )}
            </>
          ) : (
            <>
              {step < 3 && (
                <button type="button" className="contrato-btn-primary" onClick={() => setStep(step + 1)}>
                  Próximo
                </button>
              )}
              {step === 3 && (
                <button type="button" className="contrato-btn-primary" onClick={onFinish}>
                  Aceitar e Finalizar
                </button>
              )}
              <button type="button" className="contrato-btn-skip" onClick={onSkip}>
                Pular por enquanto
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
