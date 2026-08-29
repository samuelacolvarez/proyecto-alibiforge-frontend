import { useState } from 'react'
import RankingTable from '../components/RankingTable.jsx'
import { getRanking } from '../data/rankingsStorage.js'

const tabs = [
  { id: 'master-of-deceit', label: 'Maestros del engaño' },
  { id: 'most-creative', label: 'Más creativos' },
  { id: 'most-consistent', label: 'Más consistentes' },
  { id: 'most-wanted', label: 'Más buscados' },
]

function RankingsPage() {
  const [activeTab, setActiveTab] = useState('master-of-deceit')
  const ranking = getRanking(activeTab)

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
        <RankingTable ranking={ranking} />
      </section>
    </main>
  )
}

export default RankingsPage

