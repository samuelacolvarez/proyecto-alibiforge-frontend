import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listAlibis, deleteAlibi } from "../api/alibis";
import { listSituations } from "../api/community";
import { listUsers, deleteSituation } from "../api/admin";
import AlibiStateBadge from "../components/AlibiStateBadge";

const asList = (data) => (Array.isArray(data) ? data : data?.items || []);

// Trae todo lo que muestra el panel en paralelo.
async function fetchAll() {
  const [users, alibis, situations] = await Promise.all([
    listUsers(),
    listAlibis({ limit: 100 }),
    listSituations(),
  ]);
  return {
    users: asList(users),
    alibis: asList(alibis),
    situations: asList(situations),
  };
}

// Panel de moderación: solo accesible con rol admin (ver ProtectedRoute en App.jsx).
export default function AdminPanel() {
  const [data, setData] = useState({ users: [], alibis: [], situations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState("");

  useEffect(() => {
    let active = true;
    fetchAll()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((e) => {
        if (active) setError(e.message || "No se pudo cargar el panel.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Dos clics: el primero pide confirmación, el segundo elimina.
  async function handleDelete(kind, id) {
    const key = `${kind}:${id}`;
    if (confirming !== key) {
      setConfirming(key);
      return;
    }
    setError("");
    try {
      if (kind === "alibi") await deleteAlibi(id);
      else await deleteSituation(id);
      setConfirming("");
      setData(await fetchAll());
    } catch (e) {
      setConfirming("");
      setError(e.message || "No se pudo eliminar.");
    }
  }

  const { users, alibis, situations } = data;

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <span className="stamp stamp-rejected">Administración</span>
          <h1>Panel de moderación</h1>
          <p>Elimina coartadas o situaciones que incumplan las normas de la comunidad.</p>
        </div>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && (
        <>
          <section>
            <h2>Coartadas ({alibis.length})</h2>
            {alibis.length === 0 && <p>No hay coartadas.</p>}
            <div className="alibi-grid">
              {alibis.map((alibi) => (
                <article key={alibi.id} className="case-card">
                  <AlibiStateBadge state={alibi.state} />
                  <h3>
                    <Link to={`/coartadas/${alibi.id}`}>{alibi.title}</Link>
                  </h3>
                  <p>Índice de credibilidad: {alibi.credibilityIndex ?? 0}</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDelete("alibi", alibi.id)}
                  >
                    {confirming === `alibi:${alibi.id}` ? "Confirmar eliminación" : "Eliminar"}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2>Situaciones ({situations.length})</h2>
            {situations.length === 0 && <p>No hay situaciones.</p>}
            <div className="alibi-grid">
              {situations.map((situation) => {
                const id = situation.id ?? situation._id;
                return (
                  <article key={id} className="case-card">
                    <h3>
                      <Link to={`/situations/${id}`}>{situation.title}</Link>
                    </h3>
                    <p>{situation.description}</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleDelete("situation", id)}
                    >
                      {confirming === `situation:${id}` ? "Confirmar eliminación" : "Eliminar"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <section>
            <h2>Usuarios ({users.length})</h2>
            <div className="case-card">
              <ul>
                {users.map((u) => (
                  <li key={u.id}>
                    <strong>{u.alias}</strong> — {u.email} — {u.role}
                    {" · "}credibilidad {u.credibilityScore ?? 0}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </main>
  );
}