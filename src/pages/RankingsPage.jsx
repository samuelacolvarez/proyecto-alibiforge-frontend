import { useEffect, useState } from 'react'
import RankingTable from '../components/RankingTable.jsx'
import { getRanking } from '../api/community.js'

const tabs = [
  { id: 'master-of-deceit', label: 'Maestros del engaño' },
  { id: 'most-creative', label: 'Más creativos' },
  { id: 'most-consistent', label: 'Más consistentes' },
  { id: 'most-wanted', label: 'Más buscados' },
]

function RankingsPage() {
  const [activeTab, setActiveTab] = useState('master-of-deceit')
  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- muestra carga al cambiar de pestaña
    setLoading(true)
    setError('')

    getRanking(activeTab)
      .then(setRanking)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [activeTab])

  return (
    <main className="page">
      <h1>Rankings</h1>

      <div className="ranking-tabs">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.id ? 'btn btn-primary' : 'btn btn-secondary'}
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="case-card">
        {loading && <p>Cargando ranking...</p>}
        {error && <p className="feedback">{error}</p>}
        {!loading && !error && <RankingTable ranking={ranking} />}
      </section>
    </main>
  )
}

export default RankingsPage

