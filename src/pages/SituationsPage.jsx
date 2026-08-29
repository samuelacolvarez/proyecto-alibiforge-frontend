import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SituationsPage() {
  const [situations, setSituations] = useState([])
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('Cargando situaciones...')

  useEffect(() => {
    async function loadSituations() {
      try {
        const response = await fetch('/api/situations')
        const data = await response.json()

        if (!response.ok) {
          setMessage(data.message || 'No se pudieron cargar las situaciones')
          return
        }

        setSituations(Array.isArray(data) ? data : data.situations || [])
        setMessage('')
      } catch {
        setMessage('No se pudo conectar con el servidor')
      }
    }

    loadSituations()
  }, [])

  const filteredSituations = situations.filter((situation) =>
    situation.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h1>Situaciones de riesgo</h1>
          <p>Busca la mejor coartada para cada ocasión.</p>
        </div>
        <Link className="btn btn-primary" to="/situations/new">Crear situación</Link>
      </div>

      <input
        className="search-input"
        type="search"
        placeholder="Buscar por título..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {message && <p className="feedback">{message}</p>}

      <section className="situation-grid">
        {filteredSituations.map((situation) => (
          <article className="case-card" key={situation.id}>
            <h2>{situation.title}</h2>
            <p>{situation.description}</p>
            <Link className="detail-link" to={`/situations/${situation.id}`}>
              Ver detalle
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}

export default SituationsPage

