import { useState } from 'react'

const VOTES_STORAGE_KEY = 'alibiforge_votes'
const VISITOR_STORAGE_KEY = 'alibiforge_visitor_id'

function getVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_STORAGE_KEY)

  if (!visitorId) {
    visitorId = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`

    localStorage.setItem(VISITOR_STORAGE_KEY, visitorId)
  }

  return visitorId
}

function getVotes() {
  const savedVotes = localStorage.getItem(VOTES_STORAGE_KEY)

  if (!savedVotes) {
    return []
  }

  try {
    const votes = JSON.parse(savedVotes)
    return Array.isArray(votes) ? votes : []
  } catch {
    return []
  }
}

function hasVisitorVoted(alibiId, visitorId) {
  return getVotes().some(
    (vote) =>
      Number(vote.alibiId) === Number(alibiId) &&
      vote.visitorId === visitorId,
  )
}

function saveVote(alibiId, visitorId, ratings) {
  const votes = getVotes()

  if (hasVisitorVoted(alibiId, visitorId)) {
    return {
      success: false,
      message: 'Ya votaste por esta coartada.',
    }
  }

  const newVote = {
    id: votes.length + 1,
    alibiId: Number(alibiId),
    visitorId,
    credibility: ratings.credibility,
    creativity: ratings.creativity,
    consistency: ratings.consistency,
    createdAt: new Date().toISOString(),
  }

  votes.push(newVote)
  localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes))

  const alibiVotes = votes.filter(
    (vote) => Number(vote.alibiId) === Number(alibiId),
  )

  const totalScore = alibiVotes.reduce(
    (total, vote) =>
      total + vote.credibility + vote.creativity + vote.consistency,
    0,
  )

  const credibilityIndex = totalScore / (alibiVotes.length * 3)

  return {
    success: true,
    vote: newVote,
    credibilityIndex,
    message: 'Voto registrado correctamente.',
  }
}

function VoteForm({ alibiId, onVote }) {
  const visitorId = getVisitorId()
  const [credibility, setCredibility] = useState(1)
  const [creativity, setCreativity] = useState(1)
  const [consistency, setConsistency] = useState(1)
  const [hasVoted, setHasVoted] = useState(() =>
    hasVisitorVoted(alibiId, visitorId),
  )
  const [message, setMessage] = useState('')

  function handleVote(event) {
    event.preventDefault()
    setMessage('')

    if (alibiId === undefined || alibiId === null) {
      setMessage('No se pudo identificar la coartada.')
      return
    }

    try {
      const result = saveVote(alibiId, visitorId, {
        credibility,
        creativity,
        consistency,
      })

      setMessage(result.message)

      if (result.success) {
        setHasVoted(true)

        if (onVote) {
          onVote(result)
        }
      }
    } catch (error) {
      console.error(error)
      setMessage('No se pudo guardar el voto en el navegador.')
    }
  }

  return (
    <form className="vote-form" onSubmit={handleVote}>
      <h4>Calificar coartada</h4>

      <label>
        Credibilidad
        <select
          value={credibility}
          onChange={(event) => setCredibility(Number(event.target.value))}
          disabled={hasVoted}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>

      <label>
        Creatividad
        <select
          value={creativity}
          onChange={(event) => setCreativity(Number(event.target.value))}
          disabled={hasVoted}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>

      <label>
        Consistencia
        <select
          value={consistency}
          onChange={(event) => setConsistency(Number(event.target.value))}
          disabled={hasVoted}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>

      <button className="btn btn-primary" disabled={hasVoted}>
        {hasVoted ? 'Ya votaste' : 'Votar'}
      </button>

      {message && <p className="feedback">{message}</p>}
    </form>
  )
}

export default VoteForm
