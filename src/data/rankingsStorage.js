const STORAGE_KEY = 'alibiforge_ranking_users'

const defaultUsers = [
  { id: 1, alias: 'El Fantasma', credibility: 4.9, creativity: 4.2, consistency: 4.8, alibiCount: 12 },
  { id: 2, alias: 'Mente Maestra', credibility: 4.7, creativity: 4.9, consistency: 4.4, alibiCount: 9 },
  { id: 3, alias: 'Sombra Nocturna', credibility: 4.6, creativity: 4.5, consistency: 4.9, alibiCount: 8 },
  { id: 4, alias: 'Agente Tarde', credibility: 4.4, creativity: 4.7, consistency: 4.3, alibiCount: 15 },
  { id: 5, alias: 'La Estratega', credibility: 4.8, creativity: 4.6, consistency: 4.7, alibiCount: 7 },
  { id: 6, alias: 'Señor Incógnito', credibility: 4.1, creativity: 4.8, consistency: 4.2, alibiCount: 11 },
  { id: 7, alias: 'La Coartada', credibility: 4.5, creativity: 4.3, consistency: 4.6, alibiCount: 10 },
  { id: 8, alias: 'Profesor Excusas', credibility: 4.3, creativity: 4.4, consistency: 4.5, alibiCount: 13 },
  { id: 9, alias: 'Nadie Me Vio', credibility: 4.2, creativity: 4.1, consistency: 4.1, alibiCount: 6 },
  { id: 10, alias: 'Plan Perfecto', credibility: 4.0, creativity: 4.0, consistency: 4.0, alibiCount: 5 },
  { id: 11, alias: 'Último Minuto', credibility: 3.9, creativity: 4.6, consistency: 3.8, alibiCount: 14 },
  { id: 12, alias: 'Testigo Secreto', credibility: 4.6, creativity: 3.9, consistency: 4.7, alibiCount: 8 },
]

function getUsers() {
  const savedUsers = localStorage.getItem(STORAGE_KEY)

  if (savedUsers) {
    try {
      const users = JSON.parse(savedUsers)
      if (Array.isArray(users)) {
        return users
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers))
  return defaultUsers
}

export function getRanking(rankingType) {
  const scoreFields = {
    'master-of-deceit': 'credibility',
    'most-creative': 'creativity',
    'most-consistent': 'consistency',
    'most-wanted': 'alibiCount',
  }

  const scoreField = scoreFields[rankingType] || 'credibility'

  const ranking = getUsers().map((user) => ({
    id: user.id,
    alias: user.alias,
    score: user[scoreField],
  }))

  return ranking.sort((firstUser, secondUser) =>
    secondUser.score - firstUser.score,
  )
}
