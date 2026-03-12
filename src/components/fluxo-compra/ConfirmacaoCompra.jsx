export default function ConfirmacaoCompra({ selectedOffer, goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Compra concluída</h2>
      <p className="fluxo-desc">Resumo da compra (simulado). Oferta: {selectedOffer?.miles || '—'}.</p>
      <button type="button" className="btn btn-primary" onClick={goNextStep}>Voltar ao Balcão</button>
    </section>
  )
}
