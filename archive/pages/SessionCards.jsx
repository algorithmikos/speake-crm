import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { Container, Alert } from "react-bootstrap";
import Icon from "../components/Icon";

function SessionRow({ icons, properties, labels, ...props }) {
  return properties.map((property, index) => (
    <tr style={{ textAlign: "start" }} key={index}>
      <td className="col px-1">
        <Icon
          title={labels[index]}
          icon={icons[index]}
          beatFade={!property && true}
          color={!property ? "red" : "grey"}
          size={"lg"}
        />
      </td>
      <td
        className="col px-2"
        title={property}
        style={{
          color: `${!property ? "red" : ""}`,
          display: "table-cell",
        }}
        {...props}
      >
        {property}
      </td>
    </tr>
  ));
}

function SessionCards({
  sessions,
  setSelectedSession,
  setEditModal,
  setExpectedModal,
  setDelModal,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sessions.slice(indexOfFirstItem, indexOfLastItem);

  const students = useSelector((state) => state.students);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <label htmlFor="items" className="mx-1">
            Cards
          </label>
          <section className="mx-1">
            <select
              id="items"
              type="select"
              defaultValue={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(e.target.value);
                setCurrentPage(1);
              }}
              className="form-control"
              style={{ height: 31 }}
            >
              <option value={6}>6</option>
              <option value={24}>24</option>
              <option value={90}>90</option>
            </select>
          </section>

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm btn-dark mx-1"
          >
            Page {currentPage < 2 ? 1 : currentPage - 1}
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= sessions.length}
            className="btn btn-sm btn-dark mx-1"
          >
            Page {currentPage + 1}
          </button>
        </div>

        {sessions.length > 0 ? (
          <div className="row justify-content-center">
            {currentItems.map((s, i) => (
              <div
                key={s._id}
                className="card m-2 p-0 student-card"
                style={{
                  width: 350,
                }}
              >
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="m-0">{s.date.slice(0, 10)} Session</h5>
                  <section className="btn-group">
                    <button
                      className="btn"
                      onClick={() => {
                        setSelectedSession(s._id);
                        setEditModal(true);
                      }}
                    >
                      <Icon icon="faPenToSquare" />
                    </button>

                    <button
                      className="btn"
                      onClick={() => {
                        setSelectedSession(s._id);
                        setDelModal(true);
                      }}
                    >
                      <Icon icon="faTrashCan" />
                    </button>
                  </section>
                </div>
                <div className="card-body d-flex">
                  <table>
                    <tbody>
                      <SessionRow
                        icons={[
                          "faUsersBetweenLines",
                          `${
                            s.status === "Online" ? "faWifi" : "faPeopleRoof"
                          }`,
                        ]}
                        properties={[
                          s.group,
                          `${
                            s.status === "Offline" ? "Face-to-face" : s.status
                          }`,
                        ]}
                        labels={["Group", "Status"]}
                      />
                      <SessionRow
                        icons={["faGraduationCap"]}
                        properties={[
                          `Expected Students [ ${
                            s.expected && s.expected?.length > 0
                              ? s.expected
                                  .map((expectedStudent) =>
                                    students.find(
                                      (student) =>
                                        student._id !== expectedStudent
                                    )
                                  )
                                  .filter(
                                    (expectedStudent) =>
                                      expectedStudent.studentName !==
                                      "Deleted Student"
                                  ).length
                              : students.filter(
                                  (student) =>
                                    student.studentName !== "Deleted Student" &&
                                    student.grade === s.group.toLowerCase() &&
                                    student.status === s.status
                                ).length
                          } ]`,
                        ]}
                        labels={["Expected"]}
                        onClick={() => {
                          setSelectedSession(s._id);
                          setExpectedModal(true);
                        }}
                        className="form-select"
                      />
                    </tbody>
                  </table>
                </div>

                <hr />
                <h5 className="mb-3">
                  <Icon icon="faMoneyBill" /> Payments
                </h5>
                {s.attendedStudents && s.attendedStudents.length > 0 ? (
                  <>
                    {s.attendedStudents.map((attendedStudent) => (
                      <section
                        className="d-flex align-items-center justify-content-around mb-3"
                        key={attendedStudent._id}
                      >
                        <span>
                          {
                            students
                              .find(
                                (student) =>
                                  student._id === attendedStudent.student
                              )
                              ?.studentName.split(" ")[0]
                          }
                        </span>
                        <span>
                          <Icon icon="faSterlingSign" />{" "}
                          {attendedStudent.paymentAmount}
                        </span>
                        <span>{attendedStudent.paymentDate.slice(0, 10)}</span>
                      </section>
                    ))}
                  </>
                ) : (
                  <Container>
                    <Alert variant="warning">
                      There's no payments associated{<br />}with this session
                      yet.
                    </Alert>
                  </Container>
                )}
              </div>
            ))}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </Container>
    </>
  );
}

export default SessionCards;
