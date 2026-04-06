import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'
import { submitToAirtable } from './submission/airtableSubmission.js'

vi.mock('./submission/airtableSubmission.js', () => ({
  submitToAirtable: vi.fn(),
}))

beforeEach(() => {
  vi.clearAllMocks()
  submitToAirtable.mockResolvedValue({
    recordId: 'rec123',
    createdTime: '2026-04-06T14:00:00.000Z',
    fields: {},
  })
})

describe('App', () => {
  it('binds form inputs to local state and enables submit once valid', async () => {
    const user = userEvent.setup()

    render(<App />)

    const submitButton = screen.getByRole('button', {
      name: /submit application/i,
    })

    expect(submitButton).toBeDisabled()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'General Enquiry',
    )
    fireEvent.change(screen.getByLabelText(/preferred date/i), {
      target: { value: '2026-04-12' },
    })
    await user.type(screen.getByLabelText(/remarks/i), 'Need a morning slot')

    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('91234567')).toBeInTheDocument()
    expect(screen.getByDisplayValue('General Enquiry')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2026-04-12')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Need a morning slot')).toBeInTheDocument()
    expect(screen.getByText('19 / 300')).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
  })

  it('renders the Ruby-aligned form shell without the development preview panel', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /service application form/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/please fill in the details below to submit your service request\./i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('form', { name: /service application form/i }),
    ).toBeInTheDocument()
    expect(screen.queryByText(/^preview$/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/mock form preview/i)).not.toBeInTheDocument()
  })

  it('shows a blur validation error and clears it after the field is corrected', async () => {
    const user = userEvent.setup()

    render(<App />)

    const fullNameInput = screen.getByLabelText(/full name/i)

    await user.click(fullNameInput)
    await user.tab()

    expect(screen.getByText('Full Name is required.')).toBeInTheDocument()

    await user.type(fullNameInput, 'Jane Doe')

    expect(screen.queryByText('Full Name is required.')).not.toBeInTheDocument()
  })

  it('marks fields as touched on submit and focuses the first invalid field', async () => {
    render(<App />)

    const form = screen.getByRole('form', { name: /service application form/i })
    const fullNameInput = screen.getByLabelText(/full name/i)

    fireEvent.submit(form)

    expect(fullNameInput).toHaveFocus()

    await waitFor(() => {
      expect(screen.getByText('Full Name is required.')).toBeInTheDocument()
      expect(screen.getByText('Email Address is required.')).toBeInTheDocument()
      expect(
        screen.getByText('Contact Number is required.'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Please select a Service Type.'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Preferred Date is required.'),
      ).toBeInTheDocument()
    })
  })

  it('shows a loading state and then renders the mock success summary', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'General Enquiry',
    )
    fireEvent.change(screen.getByLabelText(/preferred date/i), {
      target: { value: '2026-04-12' },
    })
    await user.type(screen.getByLabelText(/remarks/i), 'Need a morning slot')

    await user.click(screen.getByRole('button', { name: /submit application/i }))

    expect(submitToAirtable).toHaveBeenCalledTimes(1)

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /application submitted/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/your service request has been received\./i)).toBeInTheDocument()
    const submissionSummary = screen.getByLabelText(/submission summary/i)

    expect(within(submissionSummary).getByText('Jane Doe')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('jane@example.com')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('91234567')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('General Enquiry')).toBeInTheDocument()
    expect(within(submissionSummary).getByText('2026-04-12')).toBeInTheDocument()
    expect(
      within(submissionSummary).getByText('Need a morning slot'),
    ).toBeInTheDocument()
  })

  it('hides the remarks row when no remarks were submitted and resets on submit another', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'New Application',
    )
    fireEvent.change(screen.getByLabelText(/preferred date/i), {
      target: { value: '2026-04-15' },
    })

    await user.click(screen.getByRole('button', { name: /submit application/i }))

    const submissionSummary = await screen.findByLabelText(/submission summary/i)

    expect(within(submissionSummary).queryByText('Remarks')).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /submit another application/i }),
    )

    expect(
      screen.getByRole('button', { name: /submit application/i }),
    ).toBeDisabled()
    expect(screen.getByLabelText(/full name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email address/i)).toHaveValue('')
  })

  it('shows a safe error message and preserves entered values when submission fails', async () => {
    submitToAirtable.mockRejectedValueOnce(
      new Error('Invalid permissions on this resource'),
    )
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'General Enquiry',
    )
    fireEvent.change(screen.getByLabelText(/preferred date/i), {
      target: { value: '2026-04-12' },
    })

    await user.click(screen.getByRole('button', { name: /submit application/i }))

    expect(
      await screen.findByText(
        "We couldn't submit your application right now. Please try again.",
      ),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { level: 1, name: /application submitted/i }),
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Doe')
    expect(screen.getByLabelText(/email address/i)).toHaveValue(
      'jane@example.com',
    )
  })

  it('prevents duplicate submissions while a request is in flight', async () => {
    let resolveSubmission
    submitToAirtable.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveSubmission = resolve
        }),
    )
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/contact number/i), '91234567')
    await user.selectOptions(
      screen.getByLabelText(/service type/i),
      'General Enquiry',
    )
    fireEvent.change(screen.getByLabelText(/preferred date/i), {
      target: { value: '2026-04-12' },
    })

    const submitButton = screen.getByRole('button', {
      name: /submit application/i,
    })

    await user.click(submitButton)
    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled()
    expect(submitToAirtable).toHaveBeenCalledTimes(1)

    fireEvent.submit(screen.getByRole('form', { name: /service application form/i }))
    expect(submitToAirtable).toHaveBeenCalledTimes(1)

    resolveSubmission({
      recordId: 'rec123',
      createdTime: '2026-04-06T14:00:00.000Z',
      fields: {},
    })

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /application submitted/i,
      }),
    ).toBeInTheDocument()
  })
})
