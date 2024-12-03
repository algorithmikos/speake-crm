function ChildCard({ student, index, handleChange, deleteStudentCard }) {
  return (
    <div key={index} className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
        {index > 0 ? 
          <button className='btn btn-danger justify-content-center' onClick={() => deleteStudentCard(index)}>Delete</button>
          : <button className='btn' style={{ visibility: 'hidden' }}>Disabled Delete Button</button>}
          <div className="form-group mb-3">
            <label htmlFor={`studentName${index}`} className="col-form-label label-font">
              Child {index + 1} Name
            </label>
            <input
              id={`studentName${index}`}
              name="studentName"
              value={student.studentName}
              onChange={(e) => handleChange(e, index)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor={`grade${index}`} className="col-form-label label-font">
              Grade
            </label>
            <select
              id={`grade${index}`}
              name="grade"
              value={student.grade}
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
            <label htmlFor={`notes${index}`} className="col-form-label label-font">
              Notes
            </label>
            <textarea
              id={`notes${index}`}
              name="notes"
              value={student.notes}
              onChange={(e) => handleChange(e, index)}
              placeholder="Write any notes here..."
              rows="3"
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChildCard;