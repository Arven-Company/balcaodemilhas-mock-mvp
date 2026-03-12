import { useState } from 'react'
import { useApp } from '../context/AppContext'
import '../styles/verificacao.css'

const STEP_VERIFICACAO = 1
const STEP_ANEXOS = 2

export default function Verificacao({ onComplete, onBack }) {
  const { completeVerification } = useApp()
  const [step, setStep] = useState(STEP_VERIFICACAO)
  const [verificacaoOk, setVerificacaoOk] = useState(false)
  const [doc1, setDoc1] = useState(false)
  const [doc2, setDoc2] = useState(false)

  const canAdvanceStep1 = verificacaoOk
  const canAdvanceStep2 = doc1 && doc2
  const canEnterApp = step === STEP_ANEXOS && canAdvanceStep2

  const handleFinish = () => {
    completeVerification()
    onComplete?.()
  }

  return (
    <div className="verificacao">
      <header className="verificacao-header">
        <h1 className="verificacao-title">Verificação</h1>
        <p className="verificacao-subtitle">
          Complete os passos abaixo para acessar o Milhas Balcão.
        </p>
      </header>

      <div className="verificacao-steps">
        {/* Step 1: Verificação fácil (simulada) */}
        <section className="verificacao-card">
          <div className="verificacao-step-badge">1</div>
          <h2>Verificação rápida</h2>
          <p className="verificacao-desc">
            Simulação: marque a opção abaixo para concluir a verificação.
          </p>
          <label className="verificacao-check">
            <input
              type="checkbox"
              checked={verificacaoOk}
              onChange={(e) => setVerificacaoOk(e.target.checked)}
            />
            <span>Confirmo que realizei a verificação (simulado)</span>
          </label>
          {step === STEP_VERIFICACAO && (
            <button
              type="button"
              className="btn btn-primary"
              disabled={!canAdvanceStep1}
              onClick={() => setStep(STEP_ANEXOS)}
            >
              Continuar
            </button>
          )}
        </section>

        {/* Step 2: Anexo de documentos (simulado) */}
        <section className="verificacao-card">
          <div className="verificacao-step-badge">2</div>
          <h2>Anexo de documentos</h2>
          <p className="verificacao-desc">
            Simulação: marque os documentos como “anexados” para continuar. Não é necessário enviar arquivos reais.
          </p>
          <div className="verificacao-docs">
            <label className="verificacao-doc-slot">
              <input
                type="checkbox"
                checked={doc1}
                onChange={(e) => setDoc1(e.target.checked)}
              />
              <span className="verificacao-doc-icon">📄</span>
              <span>Documento de identidade (simulado)</span>
            </label>
            <label className="verificacao-doc-slot">
              <input
                type="checkbox"
                checked={doc2}
                onChange={(e) => setDoc2(e.target.checked)}
              />
              <span className="verificacao-doc-icon">📄</span>
              <span>Comprovante de residência (simulado)</span>
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canEnterApp}
            onClick={handleFinish}
          >
            {onComplete ? 'Continuar' : 'Entrar no app'}
          </button>
        </section>
      </div>
      {onBack && (
        <button type="button" className="btn btn-outline verificacao-back" onClick={onBack}>
          Voltar
        </button>
      )}
    </div>
  )
}
