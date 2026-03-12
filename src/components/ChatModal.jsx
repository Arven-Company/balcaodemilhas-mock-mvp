import { useState } from 'react'
import '../styles/fluxo-balcao.css'

const MOCK_MENSAGENS = [
  { id: 'm1', from: 'other', text: 'Olá! Por favor envie os dados do passageiro para emissão.' },
  { id: 'm2', from: 'me', text: 'Nome: João Silva. CPF: ***.***.***-00. Data do voo: 15/04/2025.' },
  { id: 'm3', from: 'other', text: 'Recebido. Emissão em andamento. Você será notificado.' },
]

export default function ChatModal({ onClose, onContinue }) {
  const [mensagens, setMensagens] = useState(MOCK_MENSAGENS)
  const [inputVal, setInputVal] = useState('')

  const handleEnviar = () => {
    if (!inputVal.trim()) return
    setMensagens((prev) => [...prev, { id: `m-${Date.now()}`, from: 'me', text: inputVal.trim() }])
    setInputVal('')
  }

  return (
    <div className="fluxo-modal-overlay chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
        <header className="chat-modal-header">
          <h2 className="chat-modal-title">Chat</h2>
          <button type="button" className="chat-modal-close" onClick={onClose} aria-label="Fechar">×</button>
        </header>
        <div className="chat-modal-messages">
          {mensagens.map((m) => (
            <div key={m.id} className={`chat-bubble chat-bubble--${m.from}`}>
              <span className="chat-bubble-text">{m.text}</span>
            </div>
          ))}
        </div>
        <div className="chat-modal-input-row">
          <input
            type="text"
            className="chat-modal-input"
            placeholder="Digite sua mensagem..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
          />
          <button type="button" className="btn btn-outline chat-modal-send" onClick={handleEnviar}>Enviar</button>
        </div>
        <div className="chat-modal-actions">
          <button type="button" className="btn btn-primary" onClick={onContinue}>Continuar</button>
        </div>
      </div>
    </div>
  )
}
