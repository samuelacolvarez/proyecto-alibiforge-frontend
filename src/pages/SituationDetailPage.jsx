import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ReportButton from '../components/ReportButton.jsx'
import VoteForm from '../components/VoteForm.jsx'
import { fetchSituation } from '../store/communitySlice.js'

function SituationDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const situation = useSelector((state) => state.community.selectedSituation)
  const status = useSelector((state) => state.community.situationStatus)
  const error = useSelector((state) => state.community.situationError)

  const loadSituation = useCallback(
    () => dispatch(fetchSituation(id)).unwrap(),
    [dispatch, id],
  )

  useEffect(() => {
    loadSituation().catch(() => {})
  }, [loadSituation])

  if (status === 'loading' || status === 'idle') {
    return <main className="page"><p>Cargando situación...</p></main>
  }

  if (!situation) {
    return <main className="page"><p className="feedback">{error || 'La situación no existe'}</p></main>
  }

  const alibis = situation.alibis || []

  return (
    <main className="page">
      <Link className="back-link" to="/situations">← Volver a situaciones</Link>

      <header className="situation-header">
        <h1>{situation.title}</h1>
        <p>{situation.description}</p>
      </header>

      <section className="alibi-list">
        {alibis.length === 0 && <p>Esta situación todavía no tiene coartadas.</p>}

        {alibis.map((alibi) => (
          <article className="case-card" key={alibi.id}>
            <h2>{alibi.title || `Coartada #${alibi.id}`}</h2>
            <p>{alibi.story || alibi.description}</p>
            <p>
              Índice de credibilidad:{' '}
              <span className="index-value">{alibi.credibilityIndex ?? 0}</span>
            </p>
            <VoteForm alibiId={alibi.id} onVote={loadSituation} />
            <ReportButton alibiId={alibi.id} onReport={loadSituation} />
          </article>
        ))}
      </section>
    </main>
  )
}

export default SituationDetailPage

