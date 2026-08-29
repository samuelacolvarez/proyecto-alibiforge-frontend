import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createSituation } from '../data/situationsStorage.js'

function CreateSituationPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    try {
      const newSituation = createSituation(title, description)
      navigate(`/situations/${newSituation.id}`)
    } catch {
      setMessage('No se pudo guardar la situación en el navegador')
    }
  }

  return (
    <main className="page">
      <Link className="back-link" to="/">← Volver</Link>

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

        <button className="btn btn-primary">Guardar situación</button>
        {message && <p className="feedback">{message}</p>}
      </form>
    </main>
  )
}

export default CreateSituationPage

