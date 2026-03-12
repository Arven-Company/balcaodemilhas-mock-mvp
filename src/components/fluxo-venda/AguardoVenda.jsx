export default function AguardoVenda({ goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Aguardo do comprador</h2>
      <p className="fluxo-desc">Sua oferta está listada. Aguardando o comprador iniciar a transação.</p>
      <button type="button" className="btn btn-primary" onClick={goNextStep}>Simular comprador ativo</button>
    </section>
  )
}
