import React, { useState } from "react";
import Exams from "../pages/Exams";
import ExamsView from "../pages/ExamsView";

function ExamSwitcher() {
  const [component, setComponent] = useState("");

  return (
    <>
      {component ? null : (
        <h3 style={{ marginTop: 8, marginBottom: -6 }}>Select a view</h3>
      )}
      <div className="btn-group btn-group-toggle mt-3" data-toggle="buttons">
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
            component === "examSpecific" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="options"
            id="option2"
            onChange={() => setComponent("examSpecific")}
            className="me-1"
          />
          Exam Specific
        </label>
      </div>
      {component === "studentSpecific" ? (
        <Exams />
      ) : component === "examSpecific" ? (
        <ExamsView />
      ) : null}
    </>
  );
}

export default ExamSwitcher;
