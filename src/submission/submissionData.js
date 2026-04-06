function normalizeSubmissionValue(value) {
  return value.trim()
}

export function createSubmittedAtTimestamp(date = new Date()) {
  return date.toISOString()
}

export function buildSubmission(formValues, submittedAt = createSubmittedAtTimestamp()) {
  return {
    fullName: normalizeSubmissionValue(formValues.fullName),
    email: normalizeSubmissionValue(formValues.email),
    contactNumber: normalizeSubmissionValue(formValues.contactNumber),
    serviceType: normalizeSubmissionValue(formValues.serviceType),
    preferredDate: normalizeSubmissionValue(formValues.preferredDate),
    remarks: normalizeSubmissionValue(formValues.remarks),
    submittedAt,
  }
}
