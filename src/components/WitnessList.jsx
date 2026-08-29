import { useAuth } from "../context/AuthContext";
import { PiUserPlusLight, PiUserMinusLight } from "react-icons/pi";

export default function WitnessList({ witnesses = [], onJoin, onDefect, joining, defecting }) {
  const { user } = useAuth();
  const isWitness = user && witnesses.some((w) => w.id === user.id || w.userId === user.id);

  return (
    <div className="witness-list">
      <div className="witness-list-head">
        <h4>Cadena de testigos ({witnesses.length})</h4>
        {user && !isWitness && onJoin && (
          <button type="button" className="btn btn-secondary" onClick={onJoin} disabled={joining}>
            <PiUserPlusLight aria-hidden="true" /> {joining ? "Uniéndome…" : "Sumarme como testigo"}
          </button>
        )}
        {user && isWitness && onDefect && (
          <button type="button" className="btn btn-danger-outline" onClick={onDefect} disabled={defecting}>
            <PiUserMinusLight aria-hidden="true" /> {defecting ? "Saliendo…" : "Defectar de la cadena"}
          </button>
        )}
      </div>

      {witnesses.length === 0 ? (
        <p className="witness-list-empty">Nadie sostiene esta historia todavía.</p>
      ) : (
        <ul>
          {witnesses.map((w) => (
            <li key={w.id || w.userId}>{w.alias || w.name || "Testigo anónimo"}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
