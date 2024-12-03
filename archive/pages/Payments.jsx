import React, { useState } from "react";
import { ApiServer } from "../server";
import axios from "axios";
import { toast } from "react-toastify";
import { MultiSelect } from "react-multi-select-component";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions } from "../rtk/slices/sessions-slice";
import { Header } from "../components/Header";
import FilterSection from "../components/StudentsTable/FilterSection";
import Icon from "../components/Icon";
import { AwesomeButton } from "react-awesome-button";
// import DatePicker from "react-multi-date-picker";

function Payments() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const students = useSelector((state) => state.students);
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const listsFilter = (item) => {
    return (
      (selectedFilters.grades.length === 0 ||
        selectedFilters.grades.includes(
          item.grade || item.group.toLowerCase()
        )) &&
      (selectedFilters.status.length === 0 ||
        selectedFilters.status.includes(item.status))
    );
  };
  const sessions = useSelector((state) => state.sessions);
  const sortedSessions = JSON.parse(JSON.stringify(sessions)).sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB - dateA;
  });

  function formatName(fullName) {
    // Split the full name into parts
    const nameParts = fullName.split(" ");

    // Ensure at least two name parts
    if (nameParts.length <= 2) {
      return fullName; // Not enough parts to format
    }

    // Format the first name (e.g., "Marwan" => "Marwan M.")
    const formattedFirstName =
      nameParts[0] + " " + nameParts[1].charAt(0) + ".";

    // Join the first name with the last name
    const formattedName =
      formattedFirstName + " " + nameParts[nameParts.length - 1];

    return formattedName;
  }

  const studentOptions = students
    .filter(listsFilter)
    .filter((student) => student.studentName !== "Deleted Student")
    .map((student) => ({
      label: `#${student.studentId} ${formatName(student.studentName)}`,
      value: student._id,
    }));

  const sessionOptions = sortedSessions.filter(listsFilter).map((session) => ({
    label: `[ ${session.date.slice(0, 10)} ] ${session.group} (${
      session.status
    })`,
    value: session._id,
  }));

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [newPayment, setNewPayment] = useState({
    student: "",
    attendance: true,
    info: "",
    paymentDate: formattedDate,
    paymentAmount: 60,
    paymentWallet: "",
  });

  const handlePaymentChange = (field, value) => {
    const parsedValue = field === "paymentAmount" ? parseFloat(value) : value;
    setNewPayment({ ...newPayment, [field]: parsedValue });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const selectedStudentsValues = selectedStudents.map(
      (student) => student.value
    );
    const selectedSessionsValues = selectedSessions.map(
      (session) => session.value
    );

    if (
      newPayment.paymentDate &&
      selectedStudentsValues.length > 0 &&
      selectedSessionsValues.length > 0
    ) {
      try {
        for (const sessionValue of selectedSessionsValues) {
          const session = sortedSessions.find((s) => s._id === sessionValue);

          if (session) {
            const attendedStudents = [];

            for (const studentId of selectedStudentsValues) {
              const student = students.find((s) => s._id === studentId);

              if (student) {
                const modifiedPayment = {
                  student: studentId,
                  attendance: newPayment.attendance,
                  info: newPayment.info,
                  paymentDate: newPayment.paymentDate,
                  paymentAmount: newPayment.paymentAmount,
                  paymentWallet: newPayment.paymentWallet,
                };

                attendedStudents.push(modifiedPayment);
              }
            }

            if (!session.attendedStudents) {
              session.attendedStudents = [];
            }

            session.attendedStudents.push(...attendedStudents);

            await toast.promise(
              axios.put(`${ApiServer}/sessions/${session._id}`, session),
              {
                pending: {
                  render: "Adding Payment(s)...",
                },
                success: {
                  render: "Payment(s) added successfully!",
                  type: "success",
                },
                error: {
                  render: "Failed to add payment(s)!",
                  type: "error",
                },
              }
            );
          }
        }

        setSelectedStudents([]);
        setSelectedSessions([]);
        setNewPayment({
          student: "",
          attendance: true,
          info: "",
          paymentDate: formattedDate,
          paymentAmount: 60,
          paymentWallet: "",
        });

        dispatch(fetchSessions());
      } catch (error) {
        console.error("Error handling payments for session:", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const totalAmount = students.reduce((sum, student) => {
    const studentPayments = student.sessions || [];

    const studentAmount = studentPayments.reduce(
      (acc, payment) => acc + Number(payment.paymentAmount) || 0,
      0
    );

    return sum + studentAmount;
  }, 0);

  const newAmount = sessions.reduce((sum, session) => {
    const studentPayments = session.attendedStudents || [];

    const studentAmount = studentPayments.reduce(
      (acc, payment) => acc + Number(payment.paymentAmount) || 0,
      0
    );

    return sum + studentAmount;
  }, 0);

  const labelStyles = { textAlign: "left", marginRight: -150 };
  const formRowStyle = "row align-items-center mb-2";

  const [filterButton, setFilterButton] = useState(false);

  return (
    <>
      <Header
        text={`Payments £${newAmount}`}
        // img="images/headers/payments.png"
        extraItem={
          <AwesomeButton
            type="primary"
            className="aws-btn-s sm-button"
            onPress={() => setFilterButton((prev) => !prev)}
          >
            <Icon title="Filters" icon="faFilter" />
          </AwesomeButton>
        }
      />
      {sessions.length > 0 ? (
        <>
          <form>
            <div className="d-flex justify-content-center">
              <div className="container-md" style={{ width: 600 }}>
                {filterButton && <FilterSection payment={false} />}
                <div className={formRowStyle}>
                  <label
                    className="col"
                    htmlFor="attendance"
                    style={labelStyles}
                  >
                    Attendance:
                  </label>
                  <div className="col btn-group">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="attended"
                      autoComplete="off"
                      checked={newPayment.attendance}
                      onChange={() =>
                        handlePaymentChange(
                          "attendance",
                          !newPayment.attendance
                        )
                      }
                    />
                    <label
                      className={`btn ${
                        newPayment.attendance ? "btn-primary" : "btn-secondary"
                      }`}
                      htmlFor="attended"
                    >
                      Attended
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      id="absent"
                      autoComplete="off"
                      checked={!newPayment.attendance}
                      onChange={() =>
                        handlePaymentChange(
                          "attendance",
                          !newPayment.attendance
                        )
                      }
                    />
                    <label
                      className={`btn ${
                        !newPayment.attendance ? "btn-primary" : "btn-secondary"
                      }`}
                      htmlFor="absent"
                    >
                      Absent
                    </label>
                  </div>
                </div>

                <div className={formRowStyle}>
                  <label className="col" htmlFor="students" style={labelStyles}>
                    Student(s):
                  </label>
                  <div className="col">
                    <MultiSelect
                      id="students"
                      options={studentOptions}
                      value={selectedStudents}
                      onChange={(selectedOptions) =>
                        setSelectedStudents(selectedOptions)
                      }
                      labelledBy="students"
                      overrideStrings={{
                        selectSomeItems: "Select student(s)...",
                        selectAll: "Select All Students",
                        allItemsAreSelected: "All students are selected.",
                      }}
                    />
                  </div>
                </div>

                <div className={formRowStyle}>
                  <label className="col" htmlFor="sessions" style={labelStyles}>
                    Session(s):
                  </label>

                  <div className="col">
                    <div className="row">
                      <MultiSelect
                        id="sessions"
                        options={sessionOptions}
                        value={selectedSessions}
                        onChange={(selectedOptions) =>
                          setSelectedSessions(selectedOptions)
                        }
                        labelledBy="sessions"
                        overrideStrings={{
                          selectSomeItems: "Select session(s)...",
                          selectAll: "Select All Sessions",
                          allItemsAreSelected: "All sessions are selected.",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className={formRowStyle}>
                  <label
                    className="col"
                    htmlFor="paymentDate"
                    style={labelStyles}
                  >
                    Payment Date:
                  </label>
                  <div className="col">
                    <input
                      id="paymentDate"
                      name="paymentDate"
                      type="date"
                      value={newPayment.paymentDate}
                      onChange={(e) =>
                        handlePaymentChange("paymentDate", e.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                </div>

                <div className={formRowStyle}>
                  <label
                    className="col"
                    htmlFor="paymentAmount"
                    style={labelStyles}
                  >
                    Amount:
                  </label>
                  <div className="col">
                    <input
                      id="paymentAmount"
                      name="paymentAmount"
                      type="number"
                      placeholder="Payment Amount"
                      value={newPayment.paymentAmount}
                      onChange={(e) =>
                        handlePaymentChange("paymentAmount", e.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                </div>

                <div className={formRowStyle}>
                  <label className="col" htmlFor="info" style={labelStyles}>
                    Info:
                  </label>
                  <div className="col">
                    <input
                      id="info"
                      name="info"
                      type="textarea"
                      placeholder="Describe the payment..."
                      value={newPayment.info}
                      onChange={(e) =>
                        handlePaymentChange("info", e.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                </div>

                <div className={formRowStyle}>
                  <label
                    className="col"
                    htmlFor="paymentWallet"
                    style={labelStyles}
                  >
                    Wallet Address:
                  </label>
                  <div className="col">
                    <input
                      id="paymentWallet"
                      name="paymentWallet"
                      type="text"
                      placeholder="Address/Number..."
                      value={newPayment.paymentWallet}
                      onChange={(e) =>
                        handlePaymentChange("paymentWallet", e.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  {loading ? (
                    <>
                      <LoadingSpinner text="Saving Payment(s)" size={20} />
                    </>
                  ) : (
                    <button
                      className="btn btn-dark"
                      // type="submit"
                      onClick={() => handleSubmit()}
                      disabled={
                        selectedStudents.length && selectedSessions.length > 0
                          ? false
                          : true
                      }
                    >
                      Add Payment(s)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <LoadingSpinner text="Loading" size={30} />
        </>
      )}
    </>
  );
}

export default Payments;
