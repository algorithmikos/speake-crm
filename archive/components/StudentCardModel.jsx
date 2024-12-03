function StudentCardModel({ formData, index, handleChange }) {
  return (
    <div key={index}>
      <div className="form-group mb-3">
        <label htmlFor={`notes${index}`} className="col-form-label label-font">
          Notes
        </label>
        <textarea
          id={`notes${index}`}
          name="notes"
          value={formData.notes}
          onChange={(e) => handleChange(e, index)}
          placeholder="Write any notes here..."
          rows="3"
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label
          htmlFor={`studentName${index}`}
          className="col-form-label label-font"
        >
          Student Name
        </label>
        <input
          id={`studentName${index}`}
          name="studentName"
          value={formData.studentName}
          onChange={(e) => handleChange(e, index)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mb-3">
        <label
          htmlFor={`studentNumber${index}`}
          className="col-form-label label-font"
        >
          Student Number
        </label>
        <input
          id={`student${index}`}
          type="tel"
          name="studentNumber"
          pattern="[0-9]{11}"
          value={formData.studentNumber}
          onChange={(e) => handleChange(e, index)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label
          htmlFor={`email${index}`}
          className="col-form-label label-font"
        >
          E-Mail
        </label>
        <input
          id={`email${index}`}
          type="tel"
          name="email"
          pattern="[0-9]{11}"
          value={formData.email}
          onChange={(e) => handleChange(e, index)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor={`grade${index}`} className="col-form-label label-font">
          Grade
        </label>
        <select
          id={`grade${index}`}
          name="grade"
          value={formData.grade}
          onChange={(e) => handleChange(e, index)}
          className="form-control"
          required
        >
          <option value="">Select Grade</option>
          <option value="1st secondary">1st secondary</option>
          <option value="2nd secondary">2nd secondary</option>
          <option value="3rd secondary">3rd secondary</option>
        </select>
      </div>

      <div className="form-group mb-3">
        <label htmlFor={`status${index}`} className="col-form-label label-font">
          Status
        </label>
        <select
          id={`status${index}`}
          name="status"
          value={formData.status}
          onChange={(e) => handleChange(e, index)}
          className="form-select"
          required
        >
          <option value="">Select Status</option>
          <option value="Online">Online</option>
          <option value="Offline">Face-to-face</option>
        </select>
      </div>

      <div className="form-group mb-3">
        <label htmlFor={`action${index}`} className="col-form-label label-font">
          Action
        </label>
        <select
          id={`action${index}`}
          name="action"
          value={formData.action}
          onChange={(e) => handleChange(e, index)}
          className="form-select"
          required
        >
          <option value="">Select Action</option>
          <option value="Call">Call</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="WhatsApp Only">WhatsApp Only</option>
          <option value="Settled">Settled</option>
        </select>
      </div>

      <div className="form-group mb-3">
        <label
          htmlFor={`payment${index}`}
          className="col-form-label label-font"
        >
          Payment Cycle
        </label>
        <select
          id={`payment${index}`}
          name="payment"
          value={formData.payment}
          onChange={(e) => handleChange(e, index)}
          className="form-select"
          required
        >
          <option value="">Select Payment Cycle</option>
          <option value="per Session">per Session</option>
          <option value="Monthly">Monthly</option>
          <option value="(Subvention) per Session">
            (Subvention) per Session
          </option>
          <option value="(Subvention) Monthly">(Subvention) Monthly</option>
        </select>
      </div>

      {/* Parent Information */}
      <div className="form-group mb-3">
        <label
          htmlFor={`parentName${index}`}
          className="col-form-label label-font"
        >
          Parent Name
        </label>
        <input
          id={`parentName${index}`}
          name="parentName"
          value={formData.parentName}
          onChange={(e) => handleChange(e, index)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label
          htmlFor={`parentNumber${index}`}
          className="col-form-label label-font"
        >
          Parent Number
        </label>
        <input
          id={`parentNumber${index}`}
          type="tel"
          name="parentNumber"
          pattern="[0-9]{11}"
          value={formData.parentNumber}
          onChange={(e) => handleChange(e, index)}
          required
          className="form-control"
        />
      </div>

      {/* Parent Information End */}
    </div>
  );
}

export default StudentCardModel;
