import { useState } from 'react'
import { reportAlibi } from '../api/community.js'
import { useAuth } from '../context/AuthContext.jsx'

function ReportButton({ alibiId, onReport }) {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [reported, setReported] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleReport() {
    if (!user) {
      setMessage('Inicia sesión para reportar una coartada.')
      return
    }

    setSubmitting(true)
    setMessage('')

    try {
      const result = await reportAlibi(alibiId)
      setMessage(result.message)
      setReported(true)
      if (onReport) await onReport(result)
    } catch (error) {
      setMessage(error.message || 'No se pudo registrar el reporte.')
      if (error.status === 409) setReported(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="report-area">
      <button
        className="btn btn-danger-outline"
        type="button"
        onClick={handleReport}
        disabled={reported || submitting || !user}
      >
        {reported ? 'Reportada' : submitting ? 'Reportando...' : 'Reportar como falsa'}
      </button>
      {!user && <p className="feedback">Inicia sesión para reportar.</p>}
      {message && <p className="feedback">{message}</p>}
    </div>
  )
}

export default ReportButton

