import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSubmissionsWithFallback } from '../submission/airtableSubmissions.js'

function formatSubmissionCount(submissionsCount) {
  return `${submissionsCount} submission${submissionsCount === 1 ? '' : 's'} received so far.`
}

function SubmissionsPage() {
  const [submissionsState, setSubmissionsState] = useState({
    isLoading: true,
    submissions: [],
    source: 'airtable',
    warning: '',
  })

  useEffect(() => {
    let isActive = true

    fetchSubmissionsWithFallback().then((result) => {
      if (!isActive) {
        return
      }

      setSubmissionsState({
        isLoading: false,
        submissions: result.submissions,
        source: result.source,
        warning: result.warning,
      })
    })

    return () => {
      isActive = false
    }
  }, [])

  const { isLoading, submissions, source, warning } = submissionsState
  const sourceLabel = source === 'airtable' ? 'Airtable' : 'Local'

  return (
    <main className="app">
      <section className="cardShell submissionsCard" aria-label="submissions card">
        <h1 className="pageTitle">All Submissions</h1>
        <p className="pageSubtitle submissionsSubtitle">
          {isLoading ? 'Loading submissions...' : formatSubmissionCount(submissions.length)}
          <span
            className={`sourceBadge ${
              source === 'airtable' ? 'sourceBadgeAirtable' : 'sourceBadgeLocal'
            }`}
          >
            {sourceLabel}
          </span>
        </p>

        {warning ? <div className="submissionAlert">{warning}</div> : null}

        {isLoading ? (
          <div className="emptyState">Loading submissions...</div>
        ) : submissions.length === 0 ? (
          <div className="emptyState">No submissions yet.</div>
        ) : (
          <ul className="submissionsList">
            {submissions.map((submission) => (
              <li
                key={`${submission.submittedAt}-${submission.email}-${submission.fullName}`}
                className="submissionListItem"
              >
                <div className="submissionName">{submission.fullName}</div>
                <div className="submissionMeta">
                  {submission.serviceType} · {submission.email} ·{' '}
                  {submission.preferredDate}
                </div>
              </li>
            ))}
          </ul>
        )}

        <Link to="/" className="backLink">
          Back to Form
        </Link>
      </section>
    </main>
  )
}

export default SubmissionsPage
