import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext.jsx'
import { submitReport } from '../store/communitySlice.js'

function ReportButton({ alibiId, onReport }) {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [reported, setReported] = useState(false)
  const submitting = useSelector(
    (state) => state.community.reportStatusByAlibi[alibiId] === 'loading',
  )

  async function handleReport() {
    if (!user) {
      setMessage('Inicia sesión para reportar una coartada.')
      return
    }

    setMessage('')

    try {
      const result = await dispatch(submitReport({ alibiId })).unwrap()
      setMessage(result.message)
      setReported(true)
      if (onReport) await onReport(result)
    } catch (error) {
      setMessage(error.message || 'No se pudo registrar el reporte.')
      if (error.status === 409) setReported(true)
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

