import { useState } from 'react'

function ReportButton({ alibiId }) {
  const [message, setMessage] = useState('')
  const [reported, setReported] = useState(false)

  async function handleReport() {
    const userId = Number(localStorage.getItem('userId') || 12)

    try {
      const response = await fetch(`/api/alibis/${alibiId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()
      setMessage(data.message || 'Reporte registrado')
      if (response.ok) setReported(true)
    } catch {
      setMessage('No se pudo registrar el reporte')
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

