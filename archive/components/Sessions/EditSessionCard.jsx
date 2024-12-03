import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { setSelectedSession } from "../../rtk/slices/generals-slice";
import Icon from "../../components/Icon";

export const EditSessionCard = ({ selectedSession }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const sessions = useSelector((state) => state.sessions);
  const chosenSession = sessions.find(
    (session) => session._id === selectedSession
  );
  const [session, setSession] = useState(chosenSession);

  const handleChange = (name, value) => {
    return setSession((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttendedStudents = (index, name, value) => {
    setSession((prev) => {
      const updatedAttendedStudents = [...prev.attendedStudents];
      updatedAttendedStudents[index] = {
        ...updatedAttendedStudents[index],
        [name]: value,
      };

      return {
        ...prev,
        attendedStudents: updatedAttendedStudents,
      };
    });
  };

  useEffect(() => {
    dispatch(setSelectedSession(session));
    // Clean-up function (if needed)
    return () => {
      // Perform any cleanup actions here
    };
  }, [session]);

  const labelStyles = { textAlign: "left", marginRight: -150 };
  const formRowStyle = "row align-items-center mb-2";
  return (
    <>
      <Container style={{ maxWidth: 400 }}>
        <h4 className="mb-3">
          <Icon icon="faPersonChalkboard" /> Session Info
        </h4>
        <div className={formRowStyle}>
          <label className="col" htmlFor="sessionDate" style={labelStyles}>
            Session Date:
          </label>
          <div className="col">
            <input
              id="sessionDate"
              name="sessionDate"
              type="date"
              value={session.date.slice(0, 10)}
              onChange={(e) => handleChange("date", e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className={formRowStyle}>
          <label
            className="col"
            style={labelStyles}
            htmlFor={session.status.toLowerCase()}
          >
            Status:
          </label>
          <div className="col btn-group">
            <input
              type="checkbox"
              className="btn-check"
              id="online"
              autoComplete="off"
              onChange={() => handleChange("status", "Online")}
            />
            <label
              className={`btn ${
                session.status === "Online" ? "btn-primary" : "btn-secondary"
              }`}
              htmlFor="online"
            >
              Online
            </label>

            <input
              type="checkbox"
              className="btn-check"
              id="offline"
              autoComplete="off"
              onChange={() => handleChange("status", "Offline")}
            />
            <label
              className={`btn ${
                session.status === "Offline" ? "btn-primary" : "btn-secondary"
              }`}
              htmlFor="offline"
            >
              Offline
            </label>
          </div>
        </div>
        <div className={formRowStyle}>
          <label className="col" htmlFor="group" style={labelStyles}>
            Group:
          </label>
          <div className="col">
            <select
              id="group"
              name="group"
              type="select"
              value={session.group}
              onChange={(e) => handleChange("group", e.target.value)}
              className="form-select"
            >
              <option value="1st Secondary">1st Secondary</option>
              <option value="2nd Secondary">2nd Secondary</option>
              <option value="3rd Secondary">3rd Secondary</option>
              <option value="Speak-E Course">Speak-E Course</option>
            </select>
          </div>
        </div>
      </Container>
      {session.attendedStudents.length > 0 && (
        <>
          <hr />
          <h4 className="mb-3">
            <Icon icon="faGraduationCap" /> Students
          </h4>
          <ol>
            {session.attendedStudents.map((studentSession, index) => (
              <li key={studentSession._id}>
                <main className="d-flex justify-content-around align-items-center mb-2 gap-1">
                  <section className="text-start" style={{ flex: "0 0 20%" }}>
                    {
                      students.find((s) => s._id === studentSession.student)
                        .studentName
                    }
                  </section>

                  <section
                    className="d-flex align-items-center"
                    style={{ flex: "0 0 20%" }}
                  >
                    <Icon icon="faSterlingSign" className="me-2" />
                    <input
                      id={`paymentAmount${index}`}
                      name={`paymentAmount${index}`}
                      type="number"
                      placeholder="Payment Amount"
                      value={studentSession.paymentAmount}
                      min={0}
                      onChange={(e) =>
                        handleAttendedStudents(
                          index,
                          "paymentAmount",
                          Number(e.target.value)
                        )
                      }
                      className="form-control"
                    />
                  </section>

                  <section>
                    <input
                      id={`paymentDate${index}`}
                      name={`paymentDate${index}`}
                      type="date"
                      value={studentSession.paymentDate.slice(0, 10)}
                      onChange={(e) =>
                        handleAttendedStudents(
                          index,
                          "paymentDate",
                          e.target.value
                        )
                      }
                      className="form-control"
                    />
                  </section>

                  <section className="btn-group">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={`attended${index}`}
                      autoComplete="off"
                      onChange={() =>
                        handleAttendedStudents(index, "attendance", true)
                      }
                    />
                    <label
                      className={`btn ${
                        studentSession.attendance
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      htmlFor={`attended${index}`}
                    >
                      <Icon icon="faCalendarCheck" />
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      id={`absent${index}`}
                      autoComplete="off"
                      onChange={() =>
                        handleAttendedStudents(index, "attendance", false)
                      }
                    />
                    <label
                      className={`btn ${
                        !studentSession.attendance
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      htmlFor={`absent${index}`}
                    >
                      <Icon icon="faCalendarXmark" />
                    </label>
                  </section>

                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setSession((prev) => {
                        return {
                          ...prev,
                          attendedStudents: prev.attendedStudents.filter(
                            (s) => s._id !== studentSession._id
                          ),
                        };
                      });
                    }}
                  >
                    <Icon icon="faTrash" />
                  </button>
                </main>
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
};
