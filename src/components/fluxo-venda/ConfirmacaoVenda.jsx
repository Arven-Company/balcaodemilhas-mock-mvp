export default function ConfirmacaoVenda({ selectedOffer, goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Venda concluída</h2>
      <p className="fluxo-desc">Resumo da venda (simulado). Oferta: {selectedOffer?.miles || '—'}.</p>
      <button type="button" className="btn btn-primary" onClick={goNextStep}>Voltar ao Balcão</button>
    </section>
  )
}
