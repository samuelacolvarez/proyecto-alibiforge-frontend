import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReportButton from '../components/ReportButton.jsx'
import VoteForm from '../components/VoteForm.jsx'
import {
  addAlibiToSituation,
  getSituationById,
} from '../data/situationsStorage.js'

function SituationDetailPage() {
  const { id } = useParams()
  const [situation, setSituation] = useState(() => getSituationById(id))
  const [alibiTitle, setAlibiTitle] = useState('')
  const [alibiStory, setAlibiStory] = useState('')
  const [message, setMessage] = useState('')

  function handleCreateAlibi(event) {
    event.preventDefault()
    setMessage('')

    const updatedSituation = addAlibiToSituation(
      id,
      alibiTitle,
      alibiStory,
    )

    if (!updatedSituation) {
      setMessage('No se pudo guardar la coartada')
      return
    }

    setSituation({ ...updatedSituation })
    setAlibiTitle('')
    setAlibiStory('')
    setMessage('Coartada agregada correctamente')
  }

  if (!situation) {
    return <main className="page"><p className="feedback">La situación no existe</p></main>
  }

  const alibis = situation.alibis || []

  return (
    <main className="page">
      <Link className="back-link" to="/">← Volver a situaciones</Link>

      <header className="situation-header">
        <h1>{situation.title}</h1>
        <p>{situation.description}</p>
      </header>

      <form className="case-card alibi-form" onSubmit={handleCreateAlibi}>
        <h2>Agregar coartada</h2>

        <label className="field">
          <span>Título</span>
          <input
            required
            value={alibiTitle}
            onChange={(event) => setAlibiTitle(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Historia</span>
          <textarea
            required
            value={alibiStory}
            onChange={(event) => setAlibiStory(event.target.value)}
          />
        </label>

        <button className="btn btn-primary">Guardar coartada</button>
        {message && <p className="feedback">{message}</p>}
      </form>

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

