import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAlibi, addAlibiDetail, submitAlibi } from "../api/alibis";
import DetailList from "../components/DetailList";
import { useAuth } from "../context/AuthContext";
import { MIN_ANCHOR_DETAILS, STORY_MAX_CHARS } from "../utils/constants";

export default function CreateAlibi() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [situation, setSituation] = useState("");
  const [story, setStory] = useState("");
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const blocked = (user?.credibilityScore || 0) < 0;
  const canSubmit = details.length >= MIN_ANCHOR_DETAILS;

  async function saveAlibi({ thenSubmit }) {
    setError(null);

    if (!title.trim() || !situation.trim() || !story.trim()) {
      setError("Completá título, situación e historia.");
      return;
    }

    if (thenSubmit && !canSubmit) {
      setError(
        `Necesitás al menos ${MIN_ANCHOR_DETAILS} detalles ancla para enviar la coartada.`
      );
      return;
    }

    setSubmitting(true);

    try {
      const alibi = await createAlibi({
        title: title,
        situation: situation,
        story: story
      });

      for (const detail of details) {
        await addAlibiDetail(alibi.id, detail);
      }

      if (thenSubmit) {
        await submitAlibi(alibi.id);
      }

      navigate(`/coartadas/${alibi.id}`);
    } catch (err) {
      setError(err.message || "No se pudo crear la coartada.");
    }

    setSubmitting(false);
  }

  function handleSaveDraft(e) {
    e.preventDefault();
    saveAlibi({ thenSubmit: false });
  }

  function handleSubmit() {
    saveAlibi({ thenSubmit: true });
  }

  return (
    <main className="page">
      <div className="case-card case-card-wide">

        <span className="stamp stamp-draft">
          Nueva coartada
        </span>

        <h1>Forjá tu historia</h1>

        {blocked && (
          <p className="form-error">
            Tu credibilidad es negativa: no podés crear coartadas nuevas
            durante 7 días.
          </p>
        )}

        <form onSubmit={handleSaveDraft}>

          <label className="field">
            <span>Título</span>

            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="La cita misteriosa"
              disabled={blocked}
            />
          </label>

          <label className="field">
            <span>Situación objetivo</span>

            <input
              type="text"
              required
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="¿Para qué la necesitás? Ej: Llegué tarde al parcial"
              disabled={blocked}
            />
          </label>

          <label className="field">
            <span>
              Historia ({story.length}/{STORY_MAX_CHARS})
            </span>

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

          <DetailList
            details={details}
            onChange={setDetails}
            editable={!blocked}
          />

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <div className="page-actions">

            <button
              type="submit"
              className="btn btn-secondary"
              disabled={submitting || blocked}
            >
              {submitting ? "Guardando…" : "Guardar como borrador"}
            </button>

            <button
              type="button"
              className="btn btn-primary"
              disabled={submitting || blocked || !canSubmit}
              onClick={handleSubmit}
            >
              {submitting ? "Enviando…" : "Guardar y enviar"}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}

