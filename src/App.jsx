import { Routes, Route, Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Home() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Balcao</h1>
      <p className="read-the-docs">
        Protótipo React + Vite. Documentação em <code>docs/</code>, app em <code>src/</code>.
      </p>
      <nav style={{ marginTop: '1rem' }}>
        <Link to="/">Início</Link> · <Link to="/sobre">Sobre</Link>
      </nav>
    </>
  )
}

function Sobre() {
  return (
    <>
      <h1>Sobre</h1>
      <p>Página de exemplo para navegação.</p>
      <nav style={{ marginTop: '1rem' }}>
        <Link to="/">Início</Link> · <Link to="/sobre">Sobre</Link>
      </nav>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  )
}

export default App
