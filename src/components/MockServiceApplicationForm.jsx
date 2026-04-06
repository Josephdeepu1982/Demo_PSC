function MockServiceApplicationForm() {
  return (
    <form className="service-form" aria-label="Mock service application form">
      <div className="form-group">
        <label htmlFor="fullName">
          Full Name <span className="required">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="e.g. Jane Doe"
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
        />
      </div>

      <div className="form-group">
        <label htmlFor="serviceType">
          Service Type <span className="required">*</span>
        </label>
        <select id="serviceType" name="serviceType" defaultValue="">
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
        />
        <div className="charCounter">0 / 300</div>
      </div>

      <button type="button" className="submitButton" disabled>
        Submit Application
      </button>
    </form>
  )
}

export default MockServiceApplicationForm
