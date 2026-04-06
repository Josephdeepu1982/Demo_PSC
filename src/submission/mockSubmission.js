import { buildSubmission } from './submissionData.js'

export const mockSubmissionDelayMs = 500

export function mockSubmitApplication(formValues) {
  const submission = buildSubmission(formValues)

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(submission)
    }, mockSubmissionDelayMs)
  })
}
