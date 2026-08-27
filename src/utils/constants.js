export const ALIBI_STATES = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "UnderReview",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const ALIBI_STATE_LABELS = {
  Draft: "Borrador",
  Submitted: "Enviada",
  UnderReview: "En revisión",
  Approved: "Aprobada",
  Rejected: "Rechazada",
};

export const SPECIALITIES = [
  { value: "CreativeExcuse", label: "Excusa Creativa" },
  { value: "DetailOriented", label: "Detallista" },
  { value: "Improviser", label: "Improvisador" },
  { value: "Conspirator", label: "Conspirador" },
];

export function specialityLabel(value) {
  return SPECIALITIES.find((s) => s.value === value)?.label || value;
}

export const MIN_ANCHOR_DETAILS = 3;
export const STORY_MAX_CHARS = 500;

// Replicamos en cliente la formula del backend 
export function estimateComplexityScore(detailCount) {
  if (detailCount >= 10) return 20;
  if (detailCount >= 5) return 10;
  if (detailCount >= 3) return 5;
  return 0;
}
