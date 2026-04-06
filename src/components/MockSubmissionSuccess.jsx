function MockSubmissionSuccess({ submission, onSubmitAnother }) {
  const summaryRows = [
    { label: 'Full Name', value: submission.fullName },
    { label: 'Email Address', value: submission.email },
    { label: 'Contact Number', value: submission.contactNumber },
    { label: 'Service Type', value: submission.serviceType },
    { label: 'Preferred Date', value: submission.preferredDate },
    { label: 'Submitted At', value: submission.submittedAt },
  ]

  if (submission.remarks) {
    summaryRows.splice(5, 0, {
      label: 'Remarks',
      value: submission.remarks,
    })
  }

  return (
    <section className="successState" aria-label="submission success state">
      <div className="successIcon" aria-hidden="true">
        ✓
      </div>
      <h1 className="successTitle">Application Submitted</h1>
      <p className="successText">
        Thank you, <strong>{submission.fullName}</strong>. Your service request
        has been received.
      </p>

      <dl className="successSummaryList" aria-label="submission summary">
        {summaryRows.map((row) => (
          <div key={row.label} className="successSummaryRow">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        className="secondaryButton"
        onClick={onSubmitAnother}
      >
        Submit Another Application
      </button>
    </section>
  )
}

export default MockSubmissionSuccess
