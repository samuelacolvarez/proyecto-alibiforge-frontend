import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAlibi, getAlibi, submitAlibi } from "../api/alibis";
import { crearAlibi } from "../store/slices/alibisSlice";
import DetailList from "../components/DetailList";
import { useAuth } from "../context/AuthContext";
import { MIN_ANCHOR_DETAILS, STORY_MAX_CHARS } from "../utils/constants";

export default function CreateAlibi() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [situation, setSituation] = useState("");
  const [story, setStory] = useState("");
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (!isEditing) return;
    getAlibi(id)
      .then((alibi) => {
        setTitle(alibi.title);
        setSituation(alibi.situation);
        setStory(alibi.story);
        setDetails(alibi.details || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const blocked = !isEditing && (user?.credibilityScore ?? 0) < 0;
  const canSubmit = details.length >= MIN_ANCHOR_DETAILS;

  async function saveAlibi({ thenSubmit }) {
    try {
      let alibiId = id;
      if (isEditing) {
        await updateAlibi(id, { title, situation, story, details });
        if (thenSubmit) await submitAlibi(id);
      } else {
        const creada = await dispatch(
          crearAlibi({ title, situation, story, details, enviar: thenSubmit })
        ).unwrap();
        alibiId = creada.id;
      }
      navigate(`/coartadas/${alibiId}`);
    } catch (err) {
      setError(typeof err === "string" ? err : err.message || "No se pudo guardar la coartada.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <main className="page page-center"><p>Cargando borrador…</p></main>;

  return (
    <main className="page">
      <div className="case-card case-card-wide">
        <span className="stamp stamp-draft">{isEditing ? "Editando borrador" : "Nueva coartada"}</span>
        <h1>{isEditing ? "Ajusta tu historia" : "Forja tu historia"}</h1>

        {blocked && (
          <p className="form-error">
            Tu credibilidad es negativa: no puedes crear coartadas nuevas durante 7 días.
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveAlibi({ thenSubmit: false });
          }}
        >
          <label className="field">
            <span>Título</span>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="La cita misteriosa" disabled={blocked} />
          </label>

          <label className="field">
            <span>Situación objetivo</span>
            <input type="text" required value={situation} onChange={(e) => setSituation(e.target.value)} placeholder="¿Para qué la necesits? Ej: Llegué tarde al parcial" disabled={blocked} />
          </label>

          <label className="field">
            <span>Historia ({story.length}/{STORY_MAX_CHARS})</span>
            <textarea
              required
              rows={6}
              maxLength={STORY_MAX_CHARS}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Contá la historia completa, con lujo de detalle…"
              disabled={blocked}
            />
          </label>

          <DetailList details={details} onChange={setDetails} editable={!blocked} />

          {error && <p className="form-error">{error}</p>}

          <div className="page-actions">
            <button type="submit" className="btn btn-secondary" disabled={submitting || blocked}>
              {submitting ? "Guardando…" : "Guardar como borrador"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={submitting || blocked || !canSubmit}
              onClick={() => saveAlibi({ thenSubmit: true })}
            >
              {submitting ? "Enviando…" : "Guardar y enviar"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}