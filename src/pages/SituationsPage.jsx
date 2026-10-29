import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSituations } from '../store/communitySlice.js'

function SituationsPage() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const situations = useSelector((state) => state.community.situations)
  const status = useSelector((state) => state.community.situationsStatus)
  const error = useSelector((state) => state.community.situationsError)

  useEffect(() => {
    dispatch(fetchSituations())
  }, [dispatch])

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

      {status === 'loading' && <p>Cargando situaciones...</p>}
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

