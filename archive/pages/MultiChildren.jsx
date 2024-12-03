import React, { useState } from "react";
import ChildCard from "../components/ChildCard";
import PageTitle from "../components/PageTitle";

function MultiChildren() {
  const [iterations, setIterations] = useState(1);
  const initialParent = {
    parentName: "",
    parentNumber: "",
  };
  const initialStudent = {
    studentName: "",
    grade: "",
    notes: "",
  };
  const [parentInfo, setParentInfo] = useState({ ...initialParent });
  const [students, setStudents] = useState(
    Array.from({ length: iterations }, () => ({ ...initialStudent }))
  );

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentInfo({ ...parentInfo, [name]: value });
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      updatedStudents[index] = { ...updatedStudents[index], [name]: value };
      return updatedStudents;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send the data to the server.
    console.log(parentInfo);
    console.log(students);
  };

  const addStudent = () => {
    setIterations(iterations + 1);
    // Add a new student object to the students array
    setStudents((prevStudents) => [...prevStudents, { ...initialStudent }]);
  };

  const deleteStudentCard = (index) => {
    setStudents((prevStudents) => {
      // Check if there's more than one student card
      if (prevStudents.length > 1) {
        // Create a new array without the student at the specified index
        const updatedStudents = prevStudents.filter((_, i) => i !== index);
        return updatedStudents;
      } else {
        alert("You cannot delete the last student.");
        return prevStudents;
      }
    });
  };

  return (
    <div className="inside">
      <PageTitle>Add Children</PageTitle>

      <button className="btn btn-primary mb-3" onClick={addStudent}>
        Add Child
      </button>
      <form onSubmit={handleSubmit}>
        {/* Parent Information */}
        <div className="form-group row mb-3 justify-content-center">
          <label
            htmlFor="parentName"
            className="col-sm-2 col-form-label label-font"
          >
            Parent Name
          </label>
          <div className="col-sm-3">
            <input
              id="parentName"
              name="parentName"
              value={parentInfo.parentName}
              onChange={handleParentChange}
              required
              className="form-control"
            />
          </div>

          <label
            htmlFor="parentNumber"
            className="col-sm-2 col-form-label label-font"
          >
            Parent Number
          </label>
          <div className="col-sm-3">
            <input
              id="parentNumber"
              type="tel"
              name="parentNumber"
              pattern="[0-9]{11}"
              value={parentInfo.parentNumber}
              onChange={handleParentChange}
              required
              className="form-control"
            />
          </div>
        </div>

        {/* Parent Information End */}

        <div className="row">
          {/* Student Information as Cards */}
          {students.map((student, index) => (
            <ChildCard
              key={index}
              index={index}
              student={student}
              handleChange={handleChange}
              deleteStudentCard={deleteStudentCard}
            />
          ))}
          {/* Student Information as Cards End */}
        </div>

        <div className="form-group row">
          <div className="col-sm-8 offset-sm-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Display Parent Information */}
      {/* <div className="list-group">
        <div className="list-group-item">
          <strong>Parent Name:</strong> {parentInfo.parentName}
        </div>
        <div className="list-group-item">
          <strong>Parent Number:</strong> {parentInfo.parentNumber}
        </div>
      </div> */}
    </div>
  );
}

export default MultiChildren;
