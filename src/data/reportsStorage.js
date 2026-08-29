const STORAGE_KEY = 'alibiforge_reports'

function getReports() {
  const savedReports = localStorage.getItem(STORAGE_KEY)

  if (!savedReports) {
    return []
  }

  try {
    const reports = JSON.parse(savedReports)
    return Array.isArray(reports) ? reports : []
  } catch {
    return []
  }
}

export function hasUserReported(alibiId, userId) {
  return getReports().some(
    (report) =>
      Number(report.alibiId) === Number(alibiId) &&
      Number(report.userId) === Number(userId),
  )
}

export function reportAlibi(alibiId, userId) {
  const reports = getReports()

  const existingReport = reports.find(
    (report) =>
      Number(report.alibiId) === Number(alibiId) &&
      Number(report.userId) === Number(userId),
  )

  if (existingReport) {
    return {
      success: false,
      message: 'Ya reportaste esta coartada.',
    }
  }

  reports.push({
    id: reports.length + 1,
    alibiId: Number(alibiId),
    userId: Number(userId),
    createdAt: new Date().toISOString(),
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))

  const totalReports = reports.filter(
    (report) => Number(report.alibiId) === Number(alibiId),
  ).length

  const isExposed = totalReports >= 3

  return {
    success: true,
    totalReports,
    isExposed,
    message: isExposed
      ? 'Reporte registrado. La coartada quedó expuesta.'
      : `Reporte registrado. Total de reportes: ${totalReports}.`,
  }
}
