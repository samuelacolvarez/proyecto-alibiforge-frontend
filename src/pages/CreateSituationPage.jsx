import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createSituation } from '../store/communitySlice.js'

function CreateSituationPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submitting = useSelector(
    (state) => state.community.createStatus === 'loading',
  )

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    try {
      const result = await dispatch(
        createSituation({ title, description }),
      ).unwrap()
      navigate(`/situations/${result.situation.id}`)
    } catch (error) {
      setMessage(error.message || 'No se pudo crear la situación')
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

