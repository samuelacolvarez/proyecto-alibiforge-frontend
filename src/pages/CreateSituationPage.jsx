import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CreateSituationPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch('/api/situations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      })

      const data = await response.json()

      if (response.ok) {
        const createdSituation = data.situation || data
        navigate(createdSituation.id ? `/situations/${createdSituation.id}` : '/')
        return
      }

      setMessage(data.message || 'No se pudo crear la situación')
    } catch {
      setMessage('No se pudo conectar con el servidor')
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

