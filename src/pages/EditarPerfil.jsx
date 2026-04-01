import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import BackButton from '../components/BackButton'
import '../styles/app-layout.css'
import '../styles/conta.css'
import '../styles/contrato.css'
import '../styles/editar-perfil.css'

export default function EditarPerfil({ onBack }) {
  const { profile, setProfile, addToast } = useApp()
  const [name, setName] = useState(profile?.name ?? '')
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl ?? '')

  useEffect(() => {
    setName(profile?.name ?? '')
    setAvatarUrl(profile?.avatarUrl ?? '')
  }, [profile])

  const handleSave = () => {
    setProfile({ name: name.trim() || profile?.name, avatarUrl: avatarUrl.trim() || '' })
    addToast('Perfil atualizado.', 'success')
    onBack()
  }

  const displayAvatar = avatarUrl.trim() || FIGMA_ASSETS.avatar

  return (
    <div className="contrato-wrap">
      <header className="app-header">
        <div className="app-header-row app-header-row--centered">
          <BackButton onClick={onBack} />
          <h1 className="app-header-title">Editar perfil</h1>
          <span style={{ width: 60 }} />
        </div>
      </header>
      <div className="editar-perfil-content">
        <div className="editar-perfil-avatar-wrap">
          <img src={displayAvatar} alt="" className="editar-perfil-avatar" />
        </div>
        <label className="editar-perfil-label">
          <span>Nome</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="editar-perfil-input"
            placeholder="Seu nome"
          />
        </label>
        <label className="editar-perfil-label">
          <span>URL do avatar (opcional)</span>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="editar-perfil-input"
            placeholder="https://..."
          />
        </label>
        <button type="button" className="contrato-btn-primary" onClick={handleSave}>
          Salvar
        </button>
      </div>
    </div>
  )
}
