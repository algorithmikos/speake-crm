import React, { useState } from "react";
import { AwesomeButton } from "react-awesome-button";

function StudentCard({
  student,
  index,
  handleChange,
  handleCheckboxChange,
  deleteStudentCard,
}) {
  const [folded, setFolded] = useState(false);

  const toggleFolded = () => {
    setFolded(!folded);
  };

  return (
    <>
      <div key={index} className="col-md-4 mb-3">
        <div className="card h-100">
          <div
            className="card-header d-flex justify-content-between align-items-center"
            onClick={toggleFolded}
            style={{ cursor: "pointer", fontSize: 18, fontWeight: "bold" }}
          >
            {folded ? "📂 Unfold" : `📦 Fold Student ${index + 1} Card`}
            {index > 0 ? (
              <AwesomeButton
                type="danger"
                onPress={() => deleteStudentCard(index)}
                className={"aws-btn-s"}
              >
                Delete
              </AwesomeButton>
            ) : (
              <button
                className="btn justify-content-center"
                style={{ visibility: "hidden" }}
              >
                Delete
              </button>
            )}
          </div>
          {folded ? null : (
            <div className="card-body d-flex flex-column">
              <div className="form-group mb-3">
                <label
                  htmlFor={`studentName${index}`}
                  className="col-form-label label-font"
                >
                  Student {index + 1} Name
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
                <label
                  htmlFor={`studentNumber${index}`}
                  className="col-form-label label-font"
                >
                  Student Number
                </label>
                <input
                  type="tel"
                  id={`studentNumber${index}`}
                  name="studentNumber"
                  value={student.studentNumber}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor={`grade${index}`}
                  className="col-form-label label-font"
                >
                  Grade
                </label>
                <select
                  id={`grade${index}`}
                  name="grade"
                  value={student.grade}
                  onChange={(e) => handleChange(e, index)}
                  className="form-select"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="1st secondary">1st secondary</option>
                  <option value="2nd secondary">2nd secondary</option>
                  <option value="3rd secondary">3rd secondary</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor={`status${index}`}
                  className="col-form-label label-font"
                >
                  Status
                </label>
                <select
                  id={`status${index}`}
                  name="status"
                  value={student.status}
                  onChange={(e) => handleChange(e, index)}
                  className="form-select"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Face-to-face</option>
                </select>
              </div>

              {/* <div className="form-group mb-3">
                <div className="d-flex justify-content-around">
                  <label
                    htmlFor={`day${index}`}
                    className="col-form-label label-font"
                  >
                    Class Day
                  </label>
                  <label
                    htmlFor={`time${index}`}
                    className="col-form-label label-font"
                  >
                    Class Time
                  </label>
                </div>

                <div className="row">
                  <div className="col">
                    {[
                      "Saturday",
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].map((day) => (
                      <div key={day} className="form-check">
                        <input
                          type="checkbox"
                          id={`day${index}-${day}`}
                          name="class.day"
                          value={day}
                          checked={student.class.day.includes(day)}
                          onChange={(e) => handleCheckboxChange(e, index)}
                          className="form-check-input"
                        />
                        <label
                          htmlFor={`day${index}-${day}`}
                          className="form-check-label"
                        >
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="col">
                    <label
                      htmlFor={`startTime${index}`}
                      className="col-form-label label-font"
                    >
                      Start Time
                      <input
                        type="time"
                        id={`startTime${index}`}
                        name="startTime"
                        value={student.class.startTime}
                        onChange={(e) => handleChange(e, index)}
                        className="form-control"
                      />
                    </label>

                    <label
                      htmlFor={`endTime${index}`}
                      className="col-form-label label-font"
                    >
                      End Time
                      <input
                        type="time"
                        id={`endTime${index}`}
                        name="endTime"
                        value={student.class.endTime}
                        onChange={(e) => handleChange(e, index)}
                        className="form-control"
                      />
                    </label>
                  </div>
                </div>
              </div> */}

              <div className="form-group mb-3">
                <label
                  htmlFor={`action${index}`}
                  className="col-form-label label-font"
                >
                  Action
                </label>
                <select
                  id={`action${index}`}
                  name="action"
                  value={student.action}
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
                  value={student.payment}
                  onChange={(e) => handleChange(e, index)}
                  className="form-select"
                >
                  <option value="">Select Payment Cycle</option>
                  <option value="per Session">per Session</option>
                  <option value="Monthly">Monthly</option>
                  <option value="(Subvention) per Session">
                    (Subvention) per Session
                  </option>
                  <option value="(Subvention) Monthly">
                    (Subvention) Monthly
                  </option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor={`source${index}`}
                  className="col-form-label label-font"
                >
                  Ad Source
                </label>
                <select
                  id={`source${index}`}
                  name="source"
                  value={student.source}
                  onChange={(e) => handleChange(e, index)}
                  className="form-select"
                  required
                >
                  <option value="">Select Source</option>
                  <option value="Facebook">Facebook</option>
                  <option value="On-Ground">On-Ground Campaign</option>
                  <option value="Acquaintances">Acquaintances</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label
                  htmlFor={`notes${index}`}
                  className="col-form-label label-font"
                >
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
                  value={student.parentName}
                  onChange={(e) => handleChange(e, index)}
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
                  value={student.parentNumber}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
              {/* Parent Information End */}
            </div>
          )}

          {!folded && (
            <div
              className="card-footer d-flex justify-content-between align-items-center"
              onClick={toggleFolded}
              style={{ cursor: "pointer", fontSize: 18, fontWeight: "bold" }}
            >
              {!folded && `📦 Fold Student ${index + 1} Card`}
              {index > 0 ? (
                <AwesomeButton
                  type="danger"
                  onPress={() => deleteStudentCard(index)}
                  className={"aws-btn-s"}
                >
                  Delete
                </AwesomeButton>
              ) : (
                <button
                  className="btn justify-content-center"
                  style={{ visibility: "hidden" }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentCard;
