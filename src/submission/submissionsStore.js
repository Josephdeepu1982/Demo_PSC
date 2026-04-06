const submissionsSessionKey = 'psc-local-submissions'

function getSessionStorage(storage = globalThis.sessionStorage) {
  return storage ?? null
}

function sortSubmissionsNewestFirst(submissions) {
  return [...submissions].sort((leftSubmission, rightSubmission) => {
    return (rightSubmission.submittedAt ?? '').localeCompare(
      leftSubmission.submittedAt ?? '',
    )
  })
}

export function readLocalSubmissions(storage = getSessionStorage()) {
  if (!storage) {
    return []
  }

  try {
    const storedValue = storage.getItem(submissionsSessionKey)

    if (!storedValue) {
      return []
    }

    const parsedSubmissions = JSON.parse(storedValue)

    if (!Array.isArray(parsedSubmissions)) {
      return []
    }

    return sortSubmissionsNewestFirst(parsedSubmissions)
  } catch {
    return []
  }
}

export function saveLocalSubmission(submission, storage = getSessionStorage()) {
  if (!storage) {
    return
  }

  const nextSubmissions = sortSubmissionsNewestFirst([
    submission,
    ...readLocalSubmissions(storage).filter(
      (storedSubmission) =>
        storedSubmission.submittedAt !== submission.submittedAt ||
        storedSubmission.email !== submission.email,
    ),
  ])

  storage.setItem(submissionsSessionKey, JSON.stringify(nextSubmissions))
}
