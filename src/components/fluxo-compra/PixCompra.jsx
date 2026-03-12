export default function PixCompra({ pixConfirmed, setPixConfirmed, goNextStep }) {
  return (
    <section className="fluxo-card">
      <h2>Pagamento PIX</h2>
      <p className="fluxo-desc">Simulação: use o QR ou o código abaixo. Após pagar, clique em Confirmar.</p>
      <div className="fluxo-pix-placeholder">
        <div className="fluxo-pix-qr">QR CODE</div>
        <p className="fluxo-pix-code">Código PIX: 00020126580014br.gov.bcb.pix...</p>
      </div>
      <label className="fluxo-check">
        <input type="checkbox" checked={pixConfirmed} onChange={(e) => setPixConfirmed(e.target.checked)} />
        <span>Confirmo que realizei o pagamento (simulado)</span>
      </label>
      <button type="button" className="btn btn-primary" disabled={!pixConfirmed} onClick={goNextStep}>
        Confirmar pagamento
      </button>
    </section>
  )
}
