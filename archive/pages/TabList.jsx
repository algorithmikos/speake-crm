import React from "react";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";

function TabList() {
  return (
    <div>
      <button
        id="speake-nav-toggle"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#speake-nav-list"
        aria-expanded="false"
        aria-controls="speake-nav-list"
        style={{border: "none"}}
        className="btn"
      >
        <AwesomeButton type="primary" className="aws-btn-s sm-button">Menu</AwesomeButton>
      </button>
      <ul id="speake-nav-list" className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/create-students" className="nav-link">
            Create Student(s)
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-children" className="nav-link">
            Add Children
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/students" className="nav-link">
            Student Table
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/payments" className="nav-link">
            Payments
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/assignments" className="nav-link">
            Assignments
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/exams" className="nav-link">
            Exams
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TabList;
