import React from 'react';
import '../App.css';

function StudentForm(students, setStudents, formData, setFormData, isEditing, setIsEditing) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle form submission here, e.g., send the data to the server.
    if (isEditing) {
      // Update the edited student data in the students array
      const updatedStudents = students.map((student) => {
        if (student.id === formData.id) {
          return { ...student, ...formData };
        }
        return student;
      });
      setStudents(updatedStudents);
      setIsEditing(false);
    }

    setFormData({
      studentName: "",
      parentName: "",
      grade: "",
      studentNumber: "",
      parentNumber: "",
      notes: "",
      action: "Call",
    });
  };

  return (
<form onSubmit={handleSubmit}>
  <div className="form-group row mb-3">
    <label htmlFor="studentName" className="col-sm-2 col-form-label label-font text-start">
      Student Name
    </label>
    <div className="col-sm-5">
      <input
        id="studentName"
        name="studentName"
        value={formData.studentName}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>
  </div>

  <div className="form-group row mb-3">
    <label htmlFor="parentName" className="col-sm-2 col-form-label label-font text-start">
      Parent Name
    </label>
    <div className="col-sm-5">
      <input
        id="parentName"
        name="parentName"
        value={formData.parentName}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>
  </div>

  <div className="form-group row mb-3">
    <label htmlFor="grade" className="col-sm-2 col-form-label label-font text-start">
      Grade
    </label>
    <div className="col-sm-5">
      <select
        id="grade"
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        required
        className="form-control"
      >
        <option value="">Select Grade</option>
        <option value="1st secondary">1st secondary</option>
        <option value="2nd secondary">2nd secondary</option>
        <option value="3rd secondary">3rd secondary</option>
      </select>
    </div>
  </div>

  <div className="form-group row mb-3">
    <label htmlFor="studentNumber" className="col-sm-2 col-form-label label-font text-start">
      Student Number
    </label>
    <div className="col-sm-5">
      <input
        id="studentNumber"
        type="tel"
        name="studentNumber"
        pattern="[0-9]{11}"
        value={formData.studentNumber}
        onChange={handleChange}
        className="form-control"
      />
    </div>
  </div>

  <div className="form-group row mb-3">
    <label htmlFor="parentNumber" className="col-sm-2 col-form-label label-font text-start">
      Parent Number
    </label>
    <div className="col-sm-5">
      <input
        id="parentNumber"
        type="tel"
        name="parentNumber"
        pattern="[0-9]{11}"
        value={formData.parentNumber}
        onChange={handleChange}
        required
        className="form-control"
      />
    </div>
  </div>

  <div className="form-group row mb-3">
    <label htmlFor="notes" className="col-sm-2 col-form-label label-font text-start">
      Notes
    </label>
    <div className="col-sm-5">
      <textarea
        id="notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Write any notes here..."
        rows="3"
        className="form-control"
      />
    </div>
  </div>

  <div className="form-group row mb-3">
    <label className="col-sm-2 col-form-label label-font text-start">Action</label>
    <div className="col-sm-5">
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="Call">
          Call
        </label>
        <input
          className="form-check-input"
          id="Call"
          type="radio"
          name="action"
          value="Call"
          checked={formData.action === "Call"}
          onChange={handleChange}
        />
      </div>

      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          id="WhatsApp"
          type="radio"
          name="action"
          value="WhatsApp"
          checked={formData.action === "WhatsApp"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="WhatsApp">
          WhatsApp
        </label>
      </div>
    </div>
  </div>

  <div className="form-group row">
    <div className="col-sm-3 offset-sm-2">
      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Save' : 'Add'}
      </button>
    </div>
  </div>
</form>
);
}

export default StudentForm;