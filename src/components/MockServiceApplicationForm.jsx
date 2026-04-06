import { useMemo, useRef, useState } from 'react'
import { serviceTypeOptions } from '../constants/serviceTypeOptions.js'
import { remarksMaxLength } from '../constants/validationRules.js'
import {
  formFieldNames,
  initialFormValues,
  validateForm,
} from '../validation/formValidation.js'

function createTouchedState(isTouched = false) {
  return formFieldNames.reduce((touchedState, fieldName) => {
    touchedState[fieldName] = isTouched
    return touchedState
  }, {})
}

function MockServiceApplicationForm() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [touchedFields, setTouchedFields] = useState(createTouchedState)
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

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleFieldBlur = (event) => {
    markFieldTouched(event.target.name)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setTouchedFields(createTouchedState(true))
    const nextErrors = validateForm(formValues)
    const firstInvalidFieldName = formFieldNames.find(
      (fieldName) => nextErrors[fieldName],
    )

    if (firstInvalidFieldName) {
      fieldRefs.current[firstInvalidFieldName]?.focus()
    }
  }

  const previewItems = [
    { label: 'Full Name', value: formValues.fullName || 'Not provided yet' },
    { label: 'Email Address', value: formValues.email || 'Not provided yet' },
    {
      label: 'Contact Number',
      value: formValues.contactNumber || 'Not provided yet',
    },
    {
      label: 'Service Type',
      value: formValues.serviceType || 'Not selected yet',
    },
    {
      label: 'Preferred Date',
      value: formValues.preferredDate || 'Not provided yet',
    },
    {
      label: 'Remarks',
      value: formValues.remarks || 'No remarks entered yet',
    },
  ]

  return (
    <div className="mockFormLayout">
      <form
        className="service-form"
        aria-label="Mock service application form"
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

        <button type="submit" className="submitButton" disabled={!isFormValid}>
          Submit Application
        </button>
      </form>

      <aside className="previewPanel" aria-label="Mock form preview">
        <h2 className="previewTitle">Preview</h2>
        <p className="previewDescription">
          Local state only. This preview is for development and does not submit
          data anywhere.
        </p>
        <dl className="previewList">
          {previewItems.map((item) => (
            <div key={item.label} className="previewRow">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  )
}

export default MockServiceApplicationForm
