import { PiTrophyLight } from "react-icons/pi";

// ⚠️ MOCK temporal: datos de ranking inventados, mientras el módulo de
// Persona B no entregue el componente real. Cuando Matías suba su versión,
// este archivo se reemplaza por la de él (mismo nombre, mismo path).
const rankingMock = [
  { position: 1, alias: "MaestroDeLasExcusas", credibilityIndex: 87 },
  { position: 2, alias: "TestigoFiel", credibilityIndex: 74 },
  { position: 3, alias: "OtroTestigo", credibilityIndex: 61 },
];

export default function RankingPreview() {
  return (
    <div className="ranking-preview">
      {rankingMock.map((entry) => (
        <div key={entry.position} className="ranking-preview-row">
          <span className="ranking-preview-position">#{entry.position}</span>
          <span className="ranking-preview-alias">{entry.alias}</span>
          <span className="ranking-preview-score">
            <PiTrophyLight aria-hidden="true" /> {entry.credibilityIndex}
          </span>
        </div>
      ))}
      <p className="ranking-preview-note">
        Ranking de prueba — todavía no conectado al módulo de Rankings real.
      </p>
    </div>
  );
}