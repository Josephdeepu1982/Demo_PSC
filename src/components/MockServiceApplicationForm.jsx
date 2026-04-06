import { useState } from 'react'

const initialFormValues = {
  fullName: '',
  email: '',
  contactNumber: '',
  serviceType: '',
  preferredDate: '',
  remarks: '',
}

function MockServiceApplicationForm() {
  const [formValues, setFormValues] = useState(initialFormValues)

  const handleFieldChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
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
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="form-group">
          <label htmlFor="fullName">
            Full Name <span className="required">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="e.g. Jane Doe"
            value={formValues.fullName}
            onChange={handleFieldChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. jane@example.com"
            value={formValues.email}
            onChange={handleFieldChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">
            Contact Number <span className="required">*</span>
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            placeholder="e.g. 91234567"
            value={formValues.contactNumber}
            onChange={handleFieldChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="serviceType">
            Service Type <span className="required">*</span>
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formValues.serviceType}
            onChange={handleFieldChange}
          >
            <option value="">— Select a service —</option>
            <option value="New Application">New Application</option>
            <option value="Update Existing Application">
              Update Existing Application
            </option>
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="preferredDate">
            Preferred Date <span className="required">*</span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="text"
            placeholder="dd/mm/yyyy"
            inputMode="numeric"
            value={formValues.preferredDate}
            onChange={handleFieldChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">
            Remarks <small>(optional, max 300 characters)</small>
          </label>
          <textarea
            id="remarks"
            name="remarks"
            placeholder="Any additional information..."
            rows="4"
            value={formValues.remarks}
            onChange={handleFieldChange}
          />
          <div className="charCounter">{formValues.remarks.length} / 300</div>
        </div>

        <button type="submit" className="submitButton" disabled>
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
