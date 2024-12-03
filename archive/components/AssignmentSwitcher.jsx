import React, { useState } from "react";
import Assignments from "../pages/Assignments";
import AssignmentsView from "../pages/AssignmentsView";

function AssignmentSwitcher() {
  const [component, setComponent] = useState("");

  return (
    <div>
      {component ? null : (
        <h3 style={{ marginTop: 8, marginBottom: -6 }}>Select a view</h3>
      )}
      <div className={`btn-group btn-group-toggle mt-3 mb-3`} data-toggle="buttons">
        <label
          className={`btn ${!component && "btn-lg"} btn-primary ${
            component === "studentSpecific" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="options"
            id="option1"
            onChange={() => setComponent("studentSpecific")}
            className="me-1"
          />
          Student Specific
        </label>
        <label
          className={`btn ${!component && "btn-lg"} btn-dark ${
            component === "assignmentSpecific" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="options"
            id="option2"
            onChange={() => setComponent("assignmentSpecific")}
            className="me-1"
          />
          Assignment Specific
        </label>
      </div>
      {component === "studentSpecific" ? (
        <Assignments />
      ) : component === "assignmentSpecific" ? (
        <AssignmentsView />
      ) : null}
    </div>
  );
}

export default AssignmentSwitcher;
