import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReportButton from '../components/ReportButton.jsx'
import VoteForm from '../components/VoteForm.jsx'

function SituationDetailPage() {
  const { id } = useParams()
  const [situation, setSituation] = useState(null)
  const [message, setMessage] = useState('Cargando situación...')

  useEffect(() => {
    async function loadSituation() {
      try {
        const response = await fetch(`/api/situations/${id}`)
        const data = await response.json()

        if (!response.ok) {
          setMessage(data.message || 'La situación no existe')
          return
        }

        setSituation(data.situation || data)
        setMessage('')
      } catch {
        setMessage('No se pudo conectar con el servidor')
      }
    }

    loadSituation()
  }, [id])

  if (!situation) {
    return <main className="page"><p className="feedback">{message}</p></main>
  }

  const alibis = situation.alibis || []

  return (
    <main className="page">
      <Link className="back-link" to="/">← Volver a situaciones</Link>

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
            <VoteForm alibiId={alibi.id} />
            <ReportButton alibiId={alibi.id} />
          </article>
        ))}
      </section>
    </main>
  )
}

export default SituationDetailPage

