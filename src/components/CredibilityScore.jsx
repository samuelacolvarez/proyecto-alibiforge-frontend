export default function CredibilityScore({ value = 0, compact = false }) {
  const negative = value < 0;
  return (
    <span
      className={`credibility ${negative ? "credibility-negative" : ""} ${compact ? "credibility-compact" : ""}`}
      title="Credibility score"
    >
      {!compact && <span className="credibility-label">Credibilidad</span>}
      <span className="credibility-value">{value}</span>
    </span>
  );
}
