import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext.jsx'
import { fetchAlibiVotes, submitVote } from '../store/communitySlice.js'

function VoteForm({ alibiId, onVote }) {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const [credibility, setCredibility] = useState(1)
  const [creativity, setCreativity] = useState(1)
  const [consistency, setConsistency] = useState(1)
  const [message, setMessage] = useState('')
  const votes = useSelector(
    (state) => state.community.votesByAlibi[alibiId] || [],
  )
  const submitting = useSelector(
    (state) => state.community.voteStatusByAlibi[alibiId] === 'loading',
  )
  const hasVoted = Boolean(
    user && votes.some((vote) => vote.voterId === user.id),
  )

  useEffect(() => {
    if (user && alibiId) dispatch(fetchAlibiVotes(alibiId))
  }, [alibiId, dispatch, user])

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

    try {
      const result = await dispatch(
        submitVote({
          alibiId,
          ratings: { credibility, creativity, consistency },
        }),
      ).unwrap()

      setMessage(result.message)
      if (onVote) await onVote(result)
    } catch (error) {
      setMessage(error.message || 'No se pudo registrar el voto.')
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
          disabled={hasVoted || submitting || !user}
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
          disabled={hasVoted || submitting || !user}
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
          disabled={hasVoted || submitting || !user}
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
