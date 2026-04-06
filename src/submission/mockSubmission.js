export const mockSubmissionDelayMs = 500

export function buildMockSubmission(formValues) {
  return {
    fullName: formValues.fullName.trim(),
    email: formValues.email.trim(),
    contactNumber: formValues.contactNumber.trim(),
    serviceType: formValues.serviceType.trim(),
    preferredDate: formValues.preferredDate.trim(),
    remarks: formValues.remarks.trim(),
    submittedAt: new Date().toISOString(),
  }
}

export function mockSubmitApplication(formValues) {
  const submission = buildMockSubmission(formValues)

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(submission)
    }, mockSubmissionDelayMs)
  })
}
