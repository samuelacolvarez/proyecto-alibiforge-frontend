import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getAlibi,
  getWitnesses,
  joinAsWitness,
  defectAsWitness,
  submitAlibi,
} from "../api/alibis";
import { useAuth } from "../context/AuthContext";
import AlibiStateBadge from "../components/AlibiStateBadge";
import DetailList from "../components/DetailList";
import WitnessList from "../components/WitnessList";
import VoteSection from "../components/VoteSection";
import { MIN_ANCHOR_DETAILS } from "../utils/constants";


export default function AlibiDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [alibi, setAlibi] = useState(null);
  const [witnesses, setWitnesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joining, setJoining] = useState(false);
  const [defecting, setDefecting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [alibiData, witnessData] = await Promise.all([
        getAlibi(id),
        getWitnesses(id).catch(() => []),
      ]);
      setAlibi(alibiData);
      setWitnesses(witnessData || []);
    } catch (err) {
      setError(err.message || "No se pudo cargar la coartada.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga de datos al montar/cambiar de coartada
    load();
  }, [load]);

  async function handleJoin() {
    setJoining(true);
    try {
      await joinAsWitness(id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setJoining(false);
    }
  }

  async function handleDefect() {
    setDefecting(true);
    try {
      await defectAsWitness(id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setDefecting(false);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await submitAlibi(id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <main className="page page-center"><p>Cargando expediente…</p></main>;

  if (error && !alibi) {
    return (
      <main className="page page-center">
        <div className="case-card case-card-narrow">
          <span className="stamp stamp-rejected">Error</span>
          <p>{error}</p>
          <Link to="/mis-coartadas" className="btn btn-secondary">Volver</Link>
        </div>
      </main>
    );
  }

  const isOwner = user && (alibi.ownerId === user.id || alibi.userId === user.id);
  const details = alibi.details?.map((d) => (typeof d === "string" ? d : d.text)) || [];
  const canSubmit = details.length >= MIN_ANCHOR_DETAILS;

  return (
    <main className="page">
      <div className="case-card case-card-wide">
        <div className="alibi-detail-header">
          <AlibiStateBadge state={alibi.state} />
          <h1>{alibi.title}</h1>
          <p className="alibi-detail-situation">{alibi.situation}</p>
        </div>

        <section className="alibi-detail-story">
          <h4>Historia</h4>
          <p>{alibi.story}</p>
        </section>

        <section className="alibi-detail-scores">
          <span>Complexity score: <strong>{alibi.complexityScore ?? 0}</strong></span>
          {alibi.credibilityIndex !== undefined && (
            <span>Credibility Index: <strong>{alibi.credibilityIndex}</strong></span>
          )}
        </section>

        <DetailList details={details} onChange={() => {}} editable={false} />

        <WitnessList
          witnesses={witnesses}
          onJoin={handleJoin}
          onDefect={handleDefect}
          joining={joining}
          defecting={defecting}
        />

        {isOwner && alibi.state === "Draft" && (
          <div className="page-actions">
            <Link to={`/coartadas/${id}/editar`} className="btn btn-secondary">Editar borrador</Link>
            <button type="button" className="btn btn-primary" disabled={!canSubmit || submitting} onClick={handleSubmit}>
              {submitting ? "Enviando…" : "Enviar para revisión"}
            </button>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <VoteSection alibiId={id} />
      </div>
    </main>
  );
}
