import { useMemo, useRef, useState } from 'react'
import MockSubmissionSuccess from './MockSubmissionSuccess.jsx'
import { serviceTypeOptions } from '../constants/serviceTypeOptions.js'
import { remarksMaxLength } from '../constants/validationRules.js'
import { submitToAirtable } from '../submission/airtableSubmission.js'
import { buildSubmission } from '../submission/submissionData.js'
import {
  formFieldNames,
  initialFormValues,
  validateForm,
} from '../validation/formValidation.js'

const submissionFailureMessage =
  "We couldn't submit your application right now. Please try again."

function createTouchedState(isTouched = false) {
  return formFieldNames.reduce((touchedState, fieldName) => {
    touchedState[fieldName] = isTouched
    return touchedState
  }, {})
}

function MockServiceApplicationForm() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [touchedFields, setTouchedFields] = useState(createTouchedState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedValues, setSubmittedValues] = useState(null)
  const [submissionError, setSubmissionError] = useState('')
  const fieldRefs = useRef({})

  const validationErrors = useMemo(() => validateForm(formValues), [formValues])
  const isFormValid = Object.values(validationErrors).every((error) => !error)

  const visibleErrors = useMemo(
    () =>
      formFieldNames.reduce((errors, fieldName) => {
        errors[fieldName] = touchedFields[fieldName] ? validationErrors[fieldName] : ''
        return errors
      }, {}),
    [touchedFields, validationErrors],
  )

  const setFieldRef = (fieldName) => (element) => {
    fieldRefs.current[fieldName] = element
  }

  const markFieldTouched = (fieldName) => {
    setTouchedFields((currentTouchedFields) => {
      if (currentTouchedFields[fieldName]) {
        return currentTouchedFields
      }

      return {
        ...currentTouchedFields,
        [fieldName]: true,
      }
    })
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target

    if (submissionError) {
      setSubmissionError('')
    }

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleFieldBlur = (event) => {
    markFieldTouched(event.target.name)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setTouchedFields(createTouchedState(true))
    setSubmissionError('')
    const nextErrors = validateForm(formValues)
    const firstInvalidFieldName = formFieldNames.find(
      (fieldName) => nextErrors[fieldName],
    )

    if (firstInvalidFieldName) {
      fieldRefs.current[firstInvalidFieldName]?.focus()
      return
    }

    setIsSubmitting(true)

    try {
      const submission = buildSubmission(formValues)
      await submitToAirtable(formValues, {
        submittedAt: submission.submittedAt,
      })
      setSubmittedValues(submission)
    } catch {
      setSubmissionError(submissionFailureMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitAnother = () => {
    setFormValues(initialFormValues)
    setTouchedFields(createTouchedState())
    setSubmittedValues(null)
    setIsSubmitting(false)
    setSubmissionError('')
  }

  if (submittedValues) {
    return (
      <MockSubmissionSuccess
        submission={submittedValues}
        onSubmitAnother={handleSubmitAnother}
      />
    )
  }

  return (
    <div className="mockFormLayout">
      <h1 className="pageTitle">Service Application Form</h1>
      <p className="pageSubtitle">
        Please fill in the details below to submit your service request.
      </p>
      <form
        className="service-form"
        aria-label="Service application form"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={`form-group${visibleErrors.fullName ? ' has-error' : ''}`}>
          <label htmlFor="fullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="e.g. Jane Doe"
            value={formValues.fullName}
            ref={setFieldRef('fullName')}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={Boolean(visibleErrors.fullName)}
            aria-describedby={visibleErrors.fullName ? 'fullName-error' : undefined}
          />
          {visibleErrors.fullName ? (
            <div id="fullName-error" className="errorMessage" role="alert">
              {visibleErrors.fullName}
            </div>
          ) : null}
        </div>

        <div className={`form-group${visibleErrors.email ? ' has-error' : ''}`}>
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. jane@example.com"
            value={formValues.email}
            ref={setFieldRef('email')}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={Boolean(visibleErrors.email)}
            aria-describedby={visibleErrors.email ? 'email-error' : undefined}
          />
          {visibleErrors.email ? (
            <div id="email-error" className="errorMessage" role="alert">
              {visibleErrors.email}
            </div>
          ) : null}
        </div>

        <div className={`form-group${visibleErrors.contactNumber ? ' has-error' : ''}`}>
          <label htmlFor="contactNumber">
            Contact Number <span className="required">*</span>
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            placeholder="e.g. 91234567"
            value={formValues.contactNumber}
            ref={setFieldRef('contactNumber')}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={Boolean(visibleErrors.contactNumber)}
            aria-describedby={
              visibleErrors.contactNumber ? 'contactNumber-error' : undefined
            }
          />
          {visibleErrors.contactNumber ? (
            <div id="contactNumber-error" className="errorMessage" role="alert">
              {visibleErrors.contactNumber}
            </div>
          ) : null}
        </div>

        <div className={`form-group${visibleErrors.serviceType ? ' has-error' : ''}`}>
          <label htmlFor="serviceType">
            Service Type <span className="required">*</span>
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formValues.serviceType}
            ref={setFieldRef('serviceType')}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={Boolean(visibleErrors.serviceType)}
            aria-describedby={
              visibleErrors.serviceType ? 'serviceType-error' : undefined
            }
          >
            <option value="">— Select a service —</option>
            {serviceTypeOptions.map((serviceTypeOption) => (
              <option key={serviceTypeOption} value={serviceTypeOption}>
                {serviceTypeOption}
              </option>
            ))}
          </select>
          {visibleErrors.serviceType ? (
            <div id="serviceType-error" className="errorMessage" role="alert">
              {visibleErrors.serviceType}
            </div>
          ) : null}
        </div>

        <div className={`form-group${visibleErrors.preferredDate ? ' has-error' : ''}`}>
          <label htmlFor="preferredDate">
            Preferred Date <span className="required">*</span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={formValues.preferredDate}
            ref={setFieldRef('preferredDate')}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={Boolean(visibleErrors.preferredDate)}
            aria-describedby={
              visibleErrors.preferredDate ? 'preferredDate-error' : undefined
            }
          />
          {visibleErrors.preferredDate ? (
            <div id="preferredDate-error" className="errorMessage" role="alert">
              {visibleErrors.preferredDate}
            </div>
          ) : null}
        </div>

        <div className={`form-group${visibleErrors.remarks ? ' has-error' : ''}`}>
          <label htmlFor="remarks">
            Remarks <small>(optional, max {remarksMaxLength} characters)</small>
          </label>
          <textarea
            id="remarks"
            name="remarks"
            placeholder="Any additional information..."
            rows="4"
            maxLength={remarksMaxLength}
            value={formValues.remarks}
            ref={setFieldRef('remarks')}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            aria-invalid={Boolean(visibleErrors.remarks)}
            aria-describedby={visibleErrors.remarks ? 'remarks-error' : undefined}
          />
          <div className="charCounter">
            {formValues.remarks.length} / {remarksMaxLength}
          </div>
          {visibleErrors.remarks ? (
            <div id="remarks-error" className="errorMessage" role="alert">
              {visibleErrors.remarks}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="submitButton"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
        {submissionError ? (
          <div className="submissionErrorMessage" role="alert">
            {submissionError}
          </div>
        ) : null}
      </form>
    </div>
  )
}

export default MockServiceApplicationForm
