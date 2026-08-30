import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { listAlibis } from "../api/alibis";
import { useAuth } from "../context/AuthContext";
import AlibiCard from "../components/AlibiCard";
import { ALIBI_STATE_LABELS } from "../utils/constants";

export default function MyAlibis() {
  const { user } = useAuth();
  const [alibis, setAlibis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stateFilter, setStateFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listAlibis({ owner: "me", state: stateFilter || undefined });
      setAlibis(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar tus coartadas.");
    } finally {
      setLoading(false);
    }
  }, [stateFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga de datos al montar/cambiar filtro
    load();
  }, [load]);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <span className="stamp stamp-submitted">Archivo personal</span>
          <h1>Mis coartadas</h1>
          <p>{user?.alias}, acá está todo lo que forjaste hasta ahora.</p>
        </div>
        <Link to="/coartadas/nueva" className="btn btn-primary">Crear coartada</Link>
      </div>

      <div className="filter-bar">
        <label>
          <span>Filtrar por estado</span>
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="">Todos</option>
            {Object.entries(ALIBI_STATE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && alibis.length === 0 && (
        <div className="empty-state">
          <p>Todavía no forjaste ninguna coartada.</p>
          <Link to="/coartadas/nueva" className="btn btn-primary">Crear la primera</Link>
        </div>
      )}

      <div className="alibi-grid">
        {alibis.map((alibi) => (
          <AlibiCard key={alibi.id} alibi={alibi} />
        ))}
      </div>
    </main>
  );
}
