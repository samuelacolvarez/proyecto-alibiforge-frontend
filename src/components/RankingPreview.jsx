import { PiTrophyLight } from "react-icons/pi";

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
      
    </div>
  );
}