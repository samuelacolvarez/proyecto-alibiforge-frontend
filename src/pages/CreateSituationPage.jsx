import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createSituation } from '../api/community.js'

function CreateSituationPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setSubmitting(true)

    try {
      const result = await createSituation({ title, description })
      navigate(`/situations/${result.situation.id}`)
    } catch (error) {
      setMessage(error.message || 'No se pudo crear la situación')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <Link className="back-link" to="/situations">← Volver</Link>

      <form className="case-card situation-form" onSubmit={handleSubmit}>
        <h1>Crear situación</h1>

        <label className="field">
          <span>Título</span>
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Descripción</span>
          <textarea
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <button className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar situación'}
        </button>
        {message && <p className="feedback">{message}</p>}
      </form>
    </main>
  )
}

export default CreateSituationPage

