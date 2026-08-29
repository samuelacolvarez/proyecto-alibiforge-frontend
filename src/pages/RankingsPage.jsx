import { useEffect, useState } from 'react'
import RankingTable from '../components/RankingTable.jsx'

const tabs = [
  { id: 'master-of-deceit', label: 'Maestros del engaño' },
  { id: 'most-creative', label: 'Más creativos' },
  { id: 'most-consistent', label: 'Más consistentes' },
  { id: 'most-wanted', label: 'Más buscados' },
]

function RankingsPage() {
  const [activeTab, setActiveTab] = useState('master-of-deceit')
  const [ranking, setRanking] = useState([])
  const [message, setMessage] = useState('Cargando ranking...')

  useEffect(() => {
    async function loadRanking() {
      setMessage('Cargando ranking...')

      try {
        const response = await fetch(`/api/rankings/${activeTab}`)
        const data = await response.json()

        if (!response.ok) {
          setMessage(data.message || 'No se pudo cargar el ranking')
          return
        }

        setRanking(Array.isArray(data) ? data : data.ranking || [])
        setMessage('')
      } catch {
        setMessage('No se pudo conectar con el servidor')
      }
    }

    loadRanking()
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
        {message ? <p className="feedback">{message}</p> : <RankingTable ranking={ranking} />}
      </section>
    </main>
  )
}

export default RankingsPage

