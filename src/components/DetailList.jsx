import { useState } from "react";
import { MIN_ANCHOR_DETAILS, estimateComplexityScore } from "../utils/constants";
import { PiTrashLight, PiPlusLight } from "react-icons/pi";

export default function DetailList({ details, onChange, editable = false }) {
  const [draft, setDraft] = useState("");

  function addDetail() {
    const text = draft.trim();

    if (text === "") {
      return;
    }

    onChange([...details, text]);
    setDraft("");
  }

  function removeDetail(index) {
    const newDetails = details.filter((_, i) => i !== index);
    onChange(newDetails);
  }

  const complexity = estimateComplexityScore(details.length);
  const missing = Math.max(0, MIN_ANCHOR_DETAILS - details.length);

  return (
    <div className="detail-list">
      <div className="detail-list-head">
        <h4>Detalles ancla ({details.length})</h4>
        <span className="detail-list-score">
          Complexity score estimado: +{complexity}
        </span>
      </div>

      {details.length === 0 && (
        <p className="detail-list-empty">
          Todavía no agregaste ningún detalle.
        </p>
      )}

      <ul>
        {details.map((detail, i) => (
          <li key={i}>
            <span>{detail}</span>

            {editable && (
              <button
                type="button"
                onClick={() => removeDetail(i)}
                aria-label="Quitar detalle"
              >
                <PiTrashLight aria-hidden="true" />
              </button>
            )}
          </li>
        ))}
      </ul>

      {editable && (
        <div className="detail-list-add">
          <input
            type="text"
            value={draft}
            placeholder="Ej: Tengo el ticket del cine con hora impresa"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addDetail();
              }
            }}
          />

          <button
            type="button"
            className="btn btn-secondary"
            onClick={addDetail}
          >
            <PiPlusLight aria-hidden="true" />
            Agregar
          </button>
        </div>
      )}

      {missing > 0 && (
        <p className="detail-list-warning">
          Necesitás {missing} detalle{missing > 1 ? "s" : ""} más para poder
          enviar la coartada (mínimo {MIN_ANCHOR_DETAILS}).
        </p>
      )}
    </div>
  );
}

