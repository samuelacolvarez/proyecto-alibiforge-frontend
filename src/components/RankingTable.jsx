import { useEffect, useState } from 'react'

function VoteForm({ alibiId, onVote }) {
  const [credibility, setCredibility] = useState(1)
  const [creativity, setCreativity] = useState(1)
  const [consistency, setConsistency] = useState(1)
  const [hasVoted, setHasVoted] = useState(false)
  const [message, setMessage] = useState('')

  const userId = Number(localStorage.getItem('userId') || 12)

  useEffect(() => {
    async function checkVote() {
      try {
        const response = await fetch(`/api/alibis/${alibiId}/votes`)
        if (!response.ok) return

        const data = await response.json()
        const voteList = Array.isArray(data) ? data : data.votes || []
        setHasVoted(voteList.some((vote) => Number(vote.userId) === userId))
      } catch {
        setMessage('No se pudieron consultar los votos')
      }
    }

    checkVote()
  }, [alibiId, userId])

  async function handleVote(event) {
    event.preventDefault()
    setMessage('')

    try {
      const response = await fetch(`/api/alibis/${alibiId}/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          credibility: Number(credibility),
          creativity: Number(creativity),
          consistency: Number(consistency),
        }),
      })

      const data = await response.json()
      setMessage(data.message || 'Voto registrado correctamente')

      if (response.ok) {
        setHasVoted(true)
        if (onVote) onVote(data)
      }
    } catch {
      setMessage('No se pudo registrar el voto')
    }
  }

  return (
    <form className="vote-form" onSubmit={handleVote}>
      <h4>Calificar coartada</h4>

      <label>
        Credibilidad
        <select value={credibility} onChange={(event) => setCredibility(event.target.value)}>
          {[1, 2, 3, 4, 5].map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>

      <label>
        Creatividad
        <select value={creativity} onChange={(event) => setCreativity(event.target.value)}>
          {[1, 2, 3, 4, 5].map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>

      <label>
        Consistencia
        <select value={consistency} onChange={(event) => setConsistency(event.target.value)}>
          {[1, 2, 3, 4, 5].map((value) => <option key={value}>{value}</option>)}
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

