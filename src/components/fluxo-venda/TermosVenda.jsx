export default function TermosVenda({ termsAccepted, setTermsAccepted, goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Aceite dos termos de venda</h2>
      <p className="fluxo-desc">Leia e aceite os termos da venda para continuar.</p>
      <label className="fluxo-check">
        <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
        <span>Aceito os termos de venda (simulado)</span>
      </label>
      <button type="button" className="btn btn-primary" disabled={!termsAccepted} onClick={goNextStep}>
        Continuar
      </button>
    </section>
  )
}
