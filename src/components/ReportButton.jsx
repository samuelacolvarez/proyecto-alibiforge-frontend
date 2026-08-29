import { useEffect, useState } from 'react'
import { hasUserReported, reportAlibi } from '../data/reportsStorage.js'

function ReportButton({ alibiId }) {
  const initialUserId = Number(localStorage.getItem('userId') || 12)
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState(initialUserId)
  const [reported, setReported] = useState(() =>
    hasUserReported(alibiId, initialUserId),
  )

  useEffect(() => {
    function handleUserChange() {
      const selectedUserId = Number(localStorage.getItem('userId') || 12)
      setUserId(selectedUserId)
      setReported(hasUserReported(alibiId, selectedUserId))
      setMessage('')
    }

    window.addEventListener('userChanged', handleUserChange)

    return () => {
      window.removeEventListener('userChanged', handleUserChange)
    }
  }, [alibiId])

  function handleReport() {
    try {
      const result = reportAlibi(alibiId, userId)
      setMessage(result.message)

      if (result.success) {
        setReported(true)
      }
    } catch {
      setMessage('No se pudo guardar el reporte en el navegador')
    }
  }

  return (
    <div className="report-area">
      <button
        className="btn btn-danger-outline"
        type="button"
        onClick={handleReport}
        disabled={reported}
      >
        {reported ? 'Reportada' : 'Reportar como falsa'}
      </button>
      {message && <p className="feedback">{message}</p>}
    </div>
  )
}

export default ReportButton

