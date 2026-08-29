function RankingTable({ ranking }) {
  if (ranking.length === 0) {
    return <p>No hay datos disponibles para este ranking.</p>
  }

  function formatScore(score) {
    const numericScore = Number(score)
    return Number.isInteger(numericScore) ? numericScore : numericScore.toFixed(1)
  }

  return (
    <div className="ranking-container">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Usuario</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.alias}</td>
              <td>{formatScore(user.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RankingTable
