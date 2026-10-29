import { api, getToken } from './client.js'

function requireSession() {
  if (!getToken()) {
    const error = new Error(
      'Debes iniciar sesión para realizar esta acción.',
    )

    error.status = 401
    throw error
  }
}

export function listSituations() {
  return api.get('/api/situations', { auth: false })
}

export function getSituation(id) {
  return api.get(`/api/situations/${id}`, {
    auth: false,
  })
}

export function createSituation({ title, description }) {
  requireSession()

  return api.post('/api/situations', {
    title,
    description,
  })
}

export function getAlibiVotes(alibiId) {
  return api.get(
    `/api/alibis/${alibiId}/votes`,
    { auth: false },
  )
}

export function voteAlibi(alibiId, ratings) {
  requireSession()

  return api.post(
    `/api/alibis/${alibiId}/votes`,
    ratings,
  )
}

export function reportAlibi(alibiId, reason = '') {
  requireSession()

  return api.post(
    `/api/alibis/${alibiId}/report`,
    { reason },
  )
}

export function getRanking(type) {
  return api.get(
    `/api/rankings/${type}`,
    { auth: false },
  )
}