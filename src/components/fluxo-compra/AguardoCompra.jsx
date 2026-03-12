export default function AguardoCompra({ goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Aguardo da emissão</h2>
      <p className="fluxo-desc">Aguardando confirmação da emissão da passagem. Você será notificado.</p>
      <button type="button" className="btn btn-primary" onClick={goNextStep}>Simular conclusão</button>
    </section>
  )
}
