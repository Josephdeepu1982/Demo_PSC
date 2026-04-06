import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SubmissionsPage from './SubmissionsPage.jsx'
import { fetchSubmissionsWithFallback } from '../submission/airtableSubmissions.js'

vi.mock('../submission/airtableSubmissions.js', () => ({
  fetchSubmissionsWithFallback: vi.fn(),
}))

function renderSubmissionsPage() {
  return render(
    <MemoryRouter>
      <SubmissionsPage />
    </MemoryRouter>,
  )
}

describe('SubmissionsPage', () => {
  it('renders Airtable submissions and the Airtable badge', async () => {
    fetchSubmissionsWithFallback.mockResolvedValueOnce({
      submissions: [
        {
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          contactNumber: '91234567',
          serviceType: 'General Enquiry',
          preferredDate: '2026-04-12',
          remarks: '',
          submittedAt: '2026-04-06T14:00:00.000Z',
        },
      ],
      source: 'airtable',
      warning: '',
    })

    renderSubmissionsPage()

    expect(
      await screen.findByRole('heading', { level: 1, name: /all submissions/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/1 submission received so far\./i)).toBeInTheDocument()
    expect(screen.getByText('Airtable')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(
      screen.getByText(/General Enquiry · jane@example\.com · 2026-04-12/i),
    ).toBeInTheDocument()
  })

  it('renders the local warning and empty state when Airtable fallback is used', async () => {
    fetchSubmissionsWithFallback.mockResolvedValueOnce({
      submissions: [],
      source: 'local',
      warning: 'Could not connect to Airtable. Showing locally stored submissions only.',
    })

    renderSubmissionsPage()

    expect(
      await screen.findByText(
        'Could not connect to Airtable. Showing locally stored submissions only.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Local')).toBeInTheDocument()
    expect(screen.getByText('No submissions yet.')).toBeInTheDocument()
  })
})
