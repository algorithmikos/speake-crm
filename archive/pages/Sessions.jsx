import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiServer } from "../server";
import { Header } from "../components/Header";
import FilterSection from "../components/StudentsTable/FilterSection";
import Modal from "../components/Modal";
import { fetchSessions } from "../rtk/slices/sessions-slice";
import { TablePlaceholder } from "../components/TablePlaceholder";
import Icon from "../components/Icon";
import { EditSessionCard } from "../components/Sessions/EditSessionCard";
import { EditExpected } from "../components/Sessions/EditExpected";
import { DeleteSession } from "../components/Sessions/DeleteSession";
import CreateNewSession from "../components/Sessions/CreateNewSession";
import SessionCards from "./SessionCards";
import { SettingsBar } from "../components/SettingsBar";

export const Sessions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterButton, setFilterButton] = useState(false);

  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.UI.viewMode);
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const sessions = useSelector((state) => state.sessions);
  const sessionToBeSubmitted = useSelector(
    (state) => state.generals.selectedSession
  );
  const students = useSelector((state) => state.students);
  const sortedSessions = JSON.parse(JSON.stringify(sessions))
    .filter(listsFilter)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSessions.slice(indexOfFirstItem, indexOfLastItem);
  function listsFilter(item) {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      (item.date.slice(0, 10).includes(searchTerm) ||
        item.attendedStudents.some((studentID) => {
          const student = students.find(
            (student) => student._id === studentID.student
          );
          return (
            student &&
            student.studentName.toLowerCase().includes(searchTermLowerCase)
          );
        })) &&
      (selectedFilters.grades.length === 0 ||
        selectedFilters.grades.includes(
          item.grade || item.group.toLowerCase()
        )) &&
      (selectedFilters.status.length === 0 ||
        selectedFilters.status.includes(item.status))
    );
  }

  const [editModal, setEditModal] = useState(false);
  const [expectedModal, setExpectedModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState("");

  const handleModSubmit = async (session) => {
    try {
      await toast.promise(
        axios.put(`${ApiServer}/sessions/${session._id}`, session),
        {
          pending: {
            render: "Saving Changes...",
          },
          success: {
            render: "Changes saved successfully!",
            type: "success",
          },
          error: {
            render: "Failed to save changes!",
            type: "error",
          },
        }
      );
      dispatch(fetchSessions());
    } catch (error) {
      console.error("Error during modifying session:", error);
    }
  };

  const handleDelete = async (session) => {
    try {
      await toast.promise(
        axios.delete(`${ApiServer}/sessions/${session._id}`),
        {
          pending: {
            render: "Deleting Session...",
          },
          success: {
            render: "Session deleted successfully!",
            type: "success",
          },
          error: {
            render: "Failed to delete session!",
            type: "error",
          },
        }
      );
      dispatch(fetchSessions());
      setDelModal(false);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const [delModal, setDelModal] = useState(false);
  const [createSessionModal, setCreateSessionModal] = useState(false);

  return (
    <>
      <Header
        text="Sessions"
        extraItem={
          <button
            className="btn btn-dark"
            onClick={() => setCreateSessionModal(true)}
          >
            Create New Session
          </button>
        }
      />
      <SettingsBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search sessions..."
        filterButton={filterButton}
        setFilterButton={setFilterButton}
        paymentsFilter={false}
        columnSettings={false}
      />

      {viewMode === "table" && (
        <table
          className="table table-striped table-hover rounded-table mx-auto mt-3"
          style={{
            boxShadow: "5px 5px 25px 5px rgba(144, 142, 142, 0.7)",
            maxWidth: 1000,
          }}
        >
          <thead className="table-dark">
            <tr>
              <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                Session Date
              </th>
              <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                Group
              </th>
              <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                Expected
              </th>
              <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                Status
              </th>
              <th colSpan="3">Attended Students</th>
              <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                Actions
              </th>
            </tr>
            <tr>
              <th>Student</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>

          {students.length > 0 && sessions.length > 0 ? (
            <>
              <tbody>
                {currentItems.filter(listsFilter).map((s, index) => (
                  <tr key={s._id}>
                    <td>{s.date.slice(0, 10)}</td>
                    <td>{s.group}</td>
                    <td
                      onClick={() => {
                        setSelectedSession(s._id);
                        setExpectedModal(true);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {s.expected
                        ?.map((expectedStudent) =>
                          students.find(
                            (student) => student._id !== expectedStudent
                          )
                        )
                        .filter(
                          (expectedStudent) =>
                            expectedStudent.studentName !== "Deleted Student"
                        ).length ||
                        students.filter(
                          (st) =>
                            st.studentName !== "Deleted Student" &&
                            st.status === s.status &&
                            st.grade === s.group.toLowerCase()
                        ).length}{" "}
                      Students
                    </td>
                    <td
                      style={{
                        fontWeight: "bold",
                        color: s.status === "Online" ? "green" : "#525252",
                      }}
                    >
                      {s.status === "Online" ? (
                        <span>
                          <Icon icon="faWifi" className="me-1" /> Online
                        </span>
                      ) : (
                        <span>
                          <Icon icon="faPeopleRoof" className="me-1" /> Offline
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: "left", width: 240 }}>
                      {s.attendedStudents.map((as) => (
                        <React.Fragment key={as.student}>
                          {
                            students.find(
                              (student) => student._id === as.student
                            ).studentName
                          }
                          <br />
                        </React.Fragment>
                      ))}
                    </td>
                    <td>
                      {s.attendedStudents.map((as) => (
                        <React.Fragment key={as.student}>
                          {as.paymentAmount}
                          <br />
                        </React.Fragment>
                      ))}
                    </td>
                    <td>
                      {s.attendedStudents.map((as) => (
                        <React.Fragment key={as.student}>
                          {as.paymentDate.slice(0, 10)}
                          <br />
                        </React.Fragment>
                      ))}
                    </td>

                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            setSelectedSession(s._id);
                            setEditModal(true);
                          }}
                        >
                          <Icon icon="faPenToSquare" />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setSelectedSession(s._id);
                            setDelModal(true);
                          }}
                        >
                          <Icon icon="faTrash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-secondary">
                <tr>
                  <td colSpan={12}>
                    <div className="d-flex justify-content-center align-items-center">
                      <label htmlFor="items" className="mx-1">
                        Items
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
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={100}>100</option>
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
                        disabled={indexOfLastItem >= sortedSessions.length}
                        className="btn btn-sm btn-dark mx-1"
                      >
                        Page {currentPage + 1}
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </>
          ) : (
            <TablePlaceholder RowsNo={15} ColsNo={8} bgColor="bg-light" />
          )}
        </table>
      )}

      {viewMode === "cards" && (
        <SessionCards
          sessions={sortedSessions}
          setSelectedSession={setSelectedSession}
          setEditModal={setEditModal}
          setExpectedModal={setExpectedModal}
          setDelModal={setDelModal}
        />
      )}

      {/* Sessions View Modals */}
      <Modal
        title="Edit Session"
        theModal={<EditSessionCard selectedSession={selectedSession} />}
        editModal={editModal}
        setEditModal={setEditModal}
        handleModSubmit={handleModSubmit}
        sessionToBeSubmitted={sessionToBeSubmitted}
      />
      <Modal
        title="Expected Students"
        width={400}
        theModal={<EditExpected selectedSession={selectedSession} />}
        editModal={expectedModal}
        setEditModal={setExpectedModal}
        handleModSubmit={handleModSubmit}
        sessionToBeSubmitted={sessionToBeSubmitted}
      />
      <Modal
        title="Delete Session"
        saveButtonText="Delete"
        saveButtonColor="danger"
        theModal={<DeleteSession selectedSession={selectedSession} />}
        width={400}
        editModal={delModal}
        setEditModal={setDelModal}
        handleModSubmit={handleDelete}
        sessionToBeSubmitted={sessionToBeSubmitted}
      />
      {/* Sessions View Modals Εnd */}
      <Modal
        title="Create New Session"
        saveButtonText="Add Session"
        theModal={<CreateNewSession />}
        width={400}
        editModal={createSessionModal}
        setEditModal={setCreateSessionModal}
        footer={false}
      />
    </>
  );
};
