export default function TermosCompra({ termsAccepted, setTermsAccepted, goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Aceite dos termos</h2>
      <p className="fluxo-desc">Leia e aceite os termos da compra para continuar.</p>
      <label className="fluxo-check">
        <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
        <span>Aceito os termos e condições (simulado)</span>
      </label>
      <button type="button" className="btn btn-primary" disabled={!termsAccepted} onClick={goNextStep}>
        Continuar
      </button>
    </section>
  )
}
