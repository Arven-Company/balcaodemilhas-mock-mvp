import { useApp } from '../context/AppContext'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import '../styles/app-layout.css'

const items = [
  { id: 'emissoes', label: 'Emissões', icon: FIGMA_ASSETS.iconPlane },
  { id: 'balcao', label: 'Balcão', icon: FIGMA_ASSETS.iconHandshake },
  { id: 'promocoes', label: 'Promoções', icon: FIGMA_ASSETS.iconTag },
  { id: 'conta', label: 'Conta', icon: FIGMA_ASSETS.iconAvatar },
]

export default function BottomNav() {
  const { module, setModule } = useApp()

  return (
    <nav className="bottom-nav" role="navigation">
      {items.map(({ id, label, icon }) => (
        <button
          key={id}
          type="button"
          className={`bottom-nav-item ${module === id ? 'active' : ''}`}
          onClick={() => setModule(id)}
          aria-current={module === id ? 'page' : undefined}
        >
          <img src={icon} alt="" aria-hidden />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
