import { Link } from "react-router-dom";
import AlibiStateBadge from "./AlibiStateBadge";
import { PiUsersThreeLight, PiSparkleLight } from "react-icons/pi";

export default function AlibiCard({ alibi }) {
  const detailCount = alibi.detailCount ?? alibi.details?.length ?? 0;
  const witnessCount = alibi.witnessCount ?? alibi.witnesses?.length ?? 0;

  return (
    <Link to={`/coartadas/${alibi.id}`} className="alibi-card">
      <div className="alibi-card-header">
        <h3>{alibi.title}</h3>
        <AlibiStateBadge state={alibi.state} />
      </div>
      <p className="alibi-card-situation">{alibi.situation}</p>
      <div className="alibi-card-meta">
        <span><PiSparkleLight aria-hidden="true" /> {detailCount} detalles · score {alibi.complexityScore ?? 0}</span>
        <span><PiUsersThreeLight aria-hidden="true" /> {witnessCount} testigos</span>
      </div>
    </Link>
  );
}