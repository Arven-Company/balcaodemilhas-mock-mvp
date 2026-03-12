import ChatModal from '../ChatModal'

export default function StepperVenda({ stepperDone, setStepperDone, showChat, setShowChat, goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Stepper – Análise e emissão</h2>
      <ul className="fluxo-stepper">
        <li className="done">Análise de Segurança</li>
        <li className="done">Confirmação de Pagamento</li>
        <li>Obter dados no chat</li>
        <li>
          <label className="fluxo-check">
            <input type="checkbox" checked={stepperDone} onChange={(e) => setStepperDone(e.target.checked)} />
            <span>Confirmar a emissão da passagem</span>
          </label>
        </li>
      </ul>
      <button type="button" className="btn btn-outline" onClick={() => setShowChat(true)}>Abrir chat</button>
      <button type="button" className="btn btn-primary" disabled={!stepperDone} onClick={goNextStep}>Continuar</button>
      {showChat && (
        <ChatModal
          onClose={() => setShowChat(false)}
          onContinue={() => { setShowChat(false); goNextStep(); }}
        />
      )}
    </section>
  )
}
