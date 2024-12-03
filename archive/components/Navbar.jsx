import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import Icon from "./Icon";

function Navbar() {
  const location = useLocation();
  function NavItem({ path, title }) {
    return (
      <li className={`nav-item ${location.pathname === path ? "active" : ""}`}>
        <Link to={path} className="nav-link">
          {title}
        </Link>
      </li>
    );
  }
  const logo = "/images/logo.png";
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg"
      style={{
        background:
          "linear-gradient(90deg, rgba(255, 215, 0, 0.95), rgba(250, 208, 0, 0.95))",
      }}
    >
      <div className="container-fluid">
        <a
          href="/"
          className="navbar-brand d-flex align-items-center pe-3"
          style={{ fontFamily: "Pirata One", fontSize: 25 }}
        >
          <img
            src={logo}
            alt="Logo"
            width="85"
            height="40"
            className="d-inline-block align-text-top"
          />
          Dashboard
        </a>
        <section
          className="navbar-toggler"
          style={{ border: "none" }}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          // aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <AwesomeButton type="primary" className="aws-btn-s sm-button">
            <Icon icon="faBars" />
          </AwesomeButton>
        </section>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavItem path="/add-students" title="Add Student(s)" />

            {/* <NavItem path="/add-children" title="Add Children" /> */}

            <NavItem path="/" title="Students" />

            <NavItem path="/sessions" title="Sessions" />

            <NavItem path="/payments" title="Payments" />

            <NavItem path="/assignments" title="Assignments" />

            <NavItem path="/exams" title="Exams" />

            <NavItem path="/times" title="Planner" />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
