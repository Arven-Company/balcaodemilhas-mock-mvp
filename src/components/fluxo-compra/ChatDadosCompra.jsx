import ChatModal from '../ChatModal'

export default function ChatDadosCompra({ showChat, setShowChat, goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Envio de dados no chat</h2>
      <p className="fluxo-desc">Envie os dados solicitados no chat com o vendedor. Quando terminar, clique em Continuar.</p>
      <button type="button" className="btn btn-outline" onClick={() => setShowChat(true)}>Abrir chat</button>
      <button type="button" className="btn btn-primary" onClick={goNextStep}>Continuar</button>
      {showChat && (
        <ChatModal
          onClose={() => setShowChat(false)}
          onContinue={() => { setShowChat(false); goNextStep(); }}
        />
      )}
    </section>
  )
}
