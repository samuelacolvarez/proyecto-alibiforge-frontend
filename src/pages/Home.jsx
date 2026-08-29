import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { listAlibis } from "../api/alibis";
import AlibiCard from "../components/AlibiCard";
import CredibilityScore from "../components/CredibilityScore";
import RankingPreview from "../components/RankingPreview";
import { PiFeatherLight, PiUsersThreeLight, PiTrophyLight } from "react-icons/pi";

export default function Home() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Landing />;
}

function Landing() {
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    listAlibis({ limit: 3 })
      .then((data) => setPreview(Array.isArray(data) ? data : data?.items || []))
      .catch(() => setPreview([]));
  }, []);

  return (
    <main className="page">
      <section className="hero-case">
        <span className="stamp stamp-approved">Caso abierto</span>
        <h1>La coartada perfecta, forjada en comunidad.</h1>
        <p className="hero-lede">
          AlibiForge es donde los estudiantes crean, votan y perfeccionan
          excusas creíbles para cualquier situación de riesgo académico.
          Cuanto más consistente y detallada la historia, más alto tu
          nivel de credibilidad.
        </p>
        <div className="page-actions">
          <Link to="/register" className="btn btn-primary">Empezar a forjar</Link>
          <Link to="/login" className="btn btn-secondary">Ya tengo cuenta</Link>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <PiFeatherLight aria-hidden="true" />
          <h3>Creá tu historia</h3>
          <p>Suma detalles que la hagan creíble y suban tu complexity score.</p>
        </div>
        <div className="feature-card">
          <PiUsersThreeLight aria-hidden="true" />
          <h3>Formá una cadena</h3>
          <p>Suma testigos que sostengan tu versión. Más testigos, más credibilidad.</p>
        </div>
        <div className="feature-card">
          <PiTrophyLight aria-hidden="true" />
          <h3>Sube en el ranking</h3>
          <p>La comunidad vota y decide quién es el próximo Master of Deceit.</p>
        </div>
      </section>

      {preview.length > 0 && (
        <section>
          <h2>Coartadas recientes</h2>
          <div className="alibi-grid">
            {preview.map((alibi) => (
              <AlibiCard key={alibi.id} alibi={alibi} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2>Ranking</h2>
        <RankingPreview />
      </section>
    </main>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAlibis({ limit: 6 })
      .then((data) => setRecent(Array.isArray(data) ? data : data?.items || []))
      .catch(() => setRecent([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <span className="stamp stamp-submitted">Panel</span>
          <h1>Hola, {user.alias}</h1>
        </div>
        <CredibilityScore value={user.credibilityScore ?? 0} />
      </div>

      <div className="page-actions">
        <Link to="/coartadas/nueva" className="btn btn-primary">Crear coartada</Link>
        <Link to="/mis-coartadas" className="btn btn-secondary">Mis coartadas</Link>
      </div>

      <section>
        <h2>Feed de coartadas recientes</h2>
        {loading && <p>Cargando…</p>}
        {!loading && recent.length === 0 && <p>Todavía no hay coartadas en el sistema.</p>}
        <div className="alibi-grid">
          {recent.map((alibi) => (
            <AlibiCard key={alibi.id} alibi={alibi} />
          ))}
        </div>
      </section>

      <section>
        <h2>Ranking</h2>
        <RankingPreview />
      </section>
    </main>
  );
}
