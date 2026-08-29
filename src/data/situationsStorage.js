const STORAGE_KEY = 'alibiforge_situations'

export function getSituations() {
  const savedSituations = localStorage.getItem(STORAGE_KEY)

  if (!savedSituations) {
    return []
  }

  try {
    const situations = JSON.parse(savedSituations)
    return Array.isArray(situations) ? situations : []
  } catch {
    return []
  }
}

export function getSituationById(id) {
  const situations = getSituations()

  return situations.find(
    (situation) => Number(situation.id) === Number(id),
  )
}

export function createSituation(title, description) {
  const situations = getSituations()

  const highestId = situations.reduce((currentHighestId, situation) => {
    const situationId = Number(situation.id) || 0
    return situationId > currentHighestId ? situationId : currentHighestId
  }, 0)

  const newSituation = {
    id: highestId + 1,
    title: title.trim(),
    description: description.trim(),
    alibis: [],
    createdAt: new Date().toISOString(),
  }

  situations.push(newSituation)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(situations))

  return newSituation
}

export function addAlibiToSituation(situationId, title, story) {
  const situations = getSituations()

  const situation = situations.find(
    (item) => Number(item.id) === Number(situationId),
  )

  if (!situation) {
    return null
  }

  let highestAlibiId = 0

  situations.forEach((item) => {
    const alibis = item.alibis || []

    alibis.forEach((alibi) => {
      const alibiId = Number(alibi.id) || 0

      if (alibiId > highestAlibiId) {
        highestAlibiId = alibiId
      }
    })
  })

  const newAlibi = {
    id: highestAlibiId + 1,
    title: title.trim(),
    story: story.trim(),
    credibilityIndex: 0,
  }

  if (!Array.isArray(situation.alibis)) {
    situation.alibis = []
  }

  situation.alibis.push(newAlibi)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(situations))

  return situation
}
