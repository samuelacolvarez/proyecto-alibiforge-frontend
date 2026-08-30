import { ALIBI_STATE_LABELS } from "../utils/constants";

const STATE_CLASS = {
  Draft: "stamp-borrador",
  Submitted: "stamp-enviada",
  UnderReview: "stamp-revision",
  Approved: "stamp-aprobada",
  Rejected: "stamp-negada",
};

export default function AlibiStateBadge({ state }) {
  let clase = STATE_CLASS[state];

  if (!clase) {
    clase = "stamp-borrador";
  }

  let texto = ALIBI_STATE_LABELS[state];

  if (!texto) {
    texto = state;
  }

  return (
    <span className={`stamp ${clase}`}>
      {texto}
    </span>
  );
}

