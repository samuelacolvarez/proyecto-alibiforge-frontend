import { useEffect, useState } from 'react'
import { getAlibiVotes, voteAlibi } from '../api/community.js'
import { useAuth } from '../context/AuthContext.jsx'

function VoteForm({ alibiId, onVote }) {
  const { user } = useAuth()
  const [credibility, setCredibility] = useState(1)
  const [creativity, setCreativity] = useState(1)
  const [consistency, setConsistency] = useState(1)
  const [hasVoted, setHasVoted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true

    if (!user || !alibiId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reinicia el estado al cerrar sesión o cambiar de coartada
      setHasVoted(false)
      return undefined
    }

    getAlibiVotes(alibiId)
      .then((data) => {
        if (active) {
          setHasVoted(data.votes.some((vote) => vote.voterId === user.id))
        }
      })
      .catch(() => {
        if (active) setHasVoted(false)
      })

    return () => {
      active = false
    }
  }, [alibiId, user])

  async function handleVote(event) {
    event.preventDefault()
    setMessage('')

    if (!user) {
      setMessage('Inicia sesión para votar.')
      return
    }

    if (alibiId === undefined || alibiId === null) {
      setMessage('No se pudo identificar la coartada.')
      return
    }

    setSubmitting(true)

    try {
      const result = await voteAlibi(alibiId, {
        credibility,
        creativity,
        consistency,
      })

      setMessage(result.message)
      setHasVoted(true)
      if (onVote) await onVote(result)
    } catch (error) {
      setMessage(error.message || 'No se pudo registrar el voto.')
    } finally {
      setSubmitting(false)
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
          disabled={hasVoted || submitting}
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
          disabled={hasVoted || submitting}
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
          disabled={hasVoted || submitting}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>

      <button className="btn btn-primary" disabled={hasVoted || submitting || !user}>
        {hasVoted ? 'Ya votaste' : submitting ? 'Registrando...' : 'Votar'}
      </button>

      {!user && <p className="feedback">Inicia sesión para votar.</p>}
      {message && <p className="feedback">{message}</p>}
    </form>
  )
}

export default VoteForm
