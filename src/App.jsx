import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import UserSelector from './components/UserSelector.jsx'
import CreateSituationPage from './pages/CreateSituationPage.jsx'
import RankingsPage from './pages/RankingsPage.jsx'
import SituationDetailPage from './pages/SituationDetailPage.jsx'
import SituationsPage from './pages/SituationsPage.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="navbar-inner">
          <Link className="navbar-brand" to="/">AlibiForge</Link>
          <nav className="navbar-links">
            <Link className="navbar-link" to="/">Situaciones</Link>
            <Link className="navbar-link" to="/situations/new">Crear situación</Link>
            <Link className="navbar-link" to="/rankings">Rankings</Link>
          </nav>
          <UserSelector />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<SituationsPage />} />
        <Route path="/situations/new" element={<CreateSituationPage />} />
        <Route path="/situations/:id" element={<SituationDetailPage />} />
        <Route path="/rankings" element={<RankingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

