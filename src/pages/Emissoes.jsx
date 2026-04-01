import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FIGMA_ASSETS } from '../assets/figma-assets'
import { MOCK_EMISSOES, MOCK_FONTES_EMISSOES } from '../data/mocks'
import { Avatar, FilterChip, FilterChipRow, Badge, PriceTag } from '../components/ui'

export default function Emissoes() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const avatarSrc = profile?.avatarUrl?.trim() || FIGMA_ASSETS.avatar

  return (
    <>
      <header className="app-header">
        <div className="app-header-row">
          <h1 className="app-header-title">Voos</h1>
          <Avatar src={avatarSrc} size="md" />
        </div>
        <FilterChipRow>
          <FilterChip label="Companhias" active />
          <FilterChip label="Set/25 \u2013 Out/25" />
          <FilterChip
            label="Filtros"
            onClick={() => navigate('/filtros')}
          />
        </FilterChipRow>
      </header>

      <div className="app-list">
        {MOCK_EMISSOES.map((card) => (
          <article
            key={card.id}
            className="card-emissao"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/emissoes/${card.id}`)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/emissoes/${card.id}`)}
          >
            <div className="card-emissao-image">
              <img src={card.image} alt="" loading="lazy" />
              <div className="card-emissao-image-scrim" />
              <div className="card-emissao-image-content">
                <div className="card-emissao-image-left">
                  {card.sponsor && <Badge variant="primary" className="card-emissao-sponsor-badge">patrocinado</Badge>}
                  {card.detail && <span>{card.detail}</span>}
                  {card.period && <span>{card.period}</span>}
                  <span className="route">{card.route}</span>
                </div>
                <div className="card-emissao-image-right">
                  {card.labelRight && <span>{card.labelRight}</span>}
                  <PriceTag value={card.price} size="md" className="card-emissao-price" />
                </div>
              </div>
            </div>
            <div className="card-emissao-footer">
              <div className="card-emissao-agent">
                {card.sponsor && card.agent ? (
                  <>
                    <img src={FIGMA_ASSETS.avatar} alt="" />
                    <div className="card-emissao-agent-info">
                      <div className="rating">{card.rating}</div>
                      <div className="name">{card.agent}</div>
                    </div>
                  </>
                ) : (
                  <div className="card-emissao-agent-meta">
                    {card.airlineLogo && <img src={card.airlineLogo} alt="" className="card-emissao-agent-logo" />}
                    {card.type && <span className="card-emissao-agent-type">{card.type}</span>}
                  </div>
                )}
              </div>
              <div className="card-emissao-footer-right">
                {card.executiva && <Badge variant="primary" className="badge-executiva text-caps">Executiva</Badge>}
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="emissoes-fontes" aria-label="Fontes de dados">
        <h3 className="emissoes-fontes-title">Fontes das ofertas</h3>
        <ul className="emissoes-fontes-list">
          {MOCK_FONTES_EMISSOES.map((f) => (
            <li key={f.id}>
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="emissoes-fontes-link">{f.label}</a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  )
}
