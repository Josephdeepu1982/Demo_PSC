import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MockSubmissionSuccess from './MockSubmissionSuccess.jsx'

describe('MockSubmissionSuccess', () => {
  it('renders the submitter summary and optional remarks row', () => {
    render(
      <MockSubmissionSuccess
        submission={{
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          contactNumber: '91234567',
          serviceType: 'General Enquiry',
          preferredDate: '2026-04-12',
          remarks: 'Need a morning slot',
          submittedAt: '2026-04-06T14:00:00.000Z',
        }}
        onSubmitAnother={() => {}}
      />,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /application submitted/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/your service request has been received\./i)).toBeInTheDocument()

    const submissionSummary = screen.getByLabelText(/submission summary/i)

    expect(within(submissionSummary).getByText('Jane Doe')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('jane@example.com')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('Need a morning slot')).toBeInTheDocument()
  })

  it('omits the remarks row when no remarks were submitted and handles reset action', async () => {
    const onSubmitAnother = vi.fn()
    const user = userEvent.setup()

    render(
      <MockSubmissionSuccess
        submission={{
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          contactNumber: '91234567',
          serviceType: 'General Enquiry',
          preferredDate: '2026-04-12',
          remarks: '',
          submittedAt: '2026-04-06T14:00:00.000Z',
        }}
        onSubmitAnother={onSubmitAnother}
      />,
    )

    expect(
      within(screen.getByLabelText(/submission summary/i)).queryByText('Remarks'),
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /submit another application/i }),
    )

    expect(onSubmitAnother).toHaveBeenCalledTimes(1)
  })
})
