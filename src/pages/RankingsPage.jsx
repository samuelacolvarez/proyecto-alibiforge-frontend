import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RankingTable from '../components/RankingTable.jsx'
import { fetchRanking } from '../store/communitySlice.js'

const tabs = [
  { id: 'master-of-deceit', label: 'Maestros del engaño' },
  { id: 'most-creative', label: 'Más creativos' },
  { id: 'most-consistent', label: 'Más consistentes' },
  { id: 'most-wanted', label: 'Más buscados' },
]

function RankingsPage() {
  const [activeTab, setActiveTab] = useState('master-of-deceit')
  const dispatch = useDispatch()
  const ranking = useSelector(
    (state) => state.community.rankings[activeTab] || [],
  )
  const status = useSelector(
    (state) => state.community.rankingStatus[activeTab] || 'idle',
  )
  const error = useSelector(
    (state) => state.community.rankingError[activeTab] || '',
  )

  useEffect(() => {
    dispatch(fetchRanking(activeTab))
  }, [activeTab, dispatch])

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
        {(status === 'loading' || status === 'idle') && <p>Cargando ranking...</p>}
        {error && <p className="feedback">{error}</p>}
        {status === 'succeeded' && !error && <RankingTable ranking={ranking} />}
      </section>
    </main>
  )
}

export default RankingsPage

