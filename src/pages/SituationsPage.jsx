import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listSituations } from '../api/community.js'

function SituationsPage() {
  const [situations, setSituations] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listSituations()
      .then(setSituations)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
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

      {loading && <p>Cargando situaciones...</p>}
      {error && <p className="feedback">{error}</p>}

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

