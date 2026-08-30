import VoteForm from "./VoteForm";

export default function VoteSection({ alibiId }) {
  return (
    <div className="vote-section">
      <VoteForm alibiId={alibiId} />
    </div>
  );
}