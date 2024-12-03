import React, { useEffect, useState } from "react";
import { ApiServer } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

import PlaceholderRow from "../components/StudentsTable/PlaceholderRow";
import StudentTableHeader from "../components/StudentsTable/StudentTableHeader";
import StudentTableRow from "../components/StudentsTable/StudentTableRow";
import EditStudentModal from "../components/StudentsTable/EditStudentModal";
import DeleteConfirmationModal from "../components/StudentsTable/DeleteConfirmationModal";
import Students from "./Students";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../rtk/slices/students-slice";
import { fetchParents } from "../rtk/slices/parents-slice";
import { Header } from "../components/Header";
import { SettingsBar } from "../components/SettingsBar";

const StudentTable = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const parents = useSelector((state) => state.parents);
  const studentSample = {
    studentName: "",
    studentNumber: "",
    parent: null,
    parentName: "",
    parentNumber: "",
    grade: "",
    status: "",
    class: { day: [], startTime: "", endTime: "" },
    notes: "",
    action: "",
    payment: "",
    source: "",
  };
  const [formData, setFormData] = useState(studentSample);

  const [selectedStudentIndex, setSelectedStudentIndex] = useState(-1);
  const viewMode = useSelector((state) => state.UI.viewMode);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [userToDel, setUserToDel] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    // Check if the selected value is "Select Grade"
    if ((name === "grade" && !value) || (name === "payment" && !value)) {
      // Do nothing, don't update the state
    } else {
      // Update the state for other cases
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetFormAndEditingState = () => {
    setFormData(studentSample);
    setSelectedStudentIndex(-1);
    setIsModalVisible(false);
    setVisibleColumns((prev) => ({
      ...prev,
      Actions: true,
    }));
  };

  const handleSave = () => {
    if (selectedStudentIndex !== -1) {
      async function modifyStudent() {
        try {
          await toast.promise(
            axios.put(`${ApiServer}/students/${formData._id}`, formData),
            {
              pending: {
                render: "Saving Student Changes...",
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
          dispatch(fetchStudents());
          dispatch(fetchParents());
        } catch (error) {
          console.error("Error modifying student:", error);
        }
      }
      async function modifyParent() {
        try {
          await axios.put(`${ApiServer}/parents/${formData.parent}`, {
            parentName: formData.parentName,
            parentNumber: formData.parentNumber,
          });
        } catch (error) {
          console.error("Error modifying parent:", error);
        }
      }
      modifyStudent();
      modifyParent();
      resetFormAndEditingState();
    }
  };

  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const filterStudents = (student) => {
    return (
      (student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toString().includes(searchTerm)) &&
      (selectedFilters.grades.length === 0 ||
        selectedFilters.grades.includes(student.grade)) &&
      (selectedFilters.actions.length === 0 ||
        selectedFilters.actions.includes(student.action)) &&
      (selectedFilters.payments.length === 0 ||
        selectedFilters.payments.includes(student.payment)) &&
      (selectedFilters.status.length === 0 ||
        selectedFilters.status.includes(student.status))
    );
  };

  const filteredStudents = students
    .filter(filterStudents)
    .filter((student) => student.studentName !== "Deleted Student");

  const sortedFilteredStudents = JSON.parse(
    JSON.stringify(filteredStudents)
  ).sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const [visibleColumns, setVisibleColumns] = useState({
    Student: true,
    "Student Number": true,
    Grade: true,
    Status: true,
    "E-Mail": false,
    Payment: false,
    Source: false,
    Parent: true,
    "Parent Number": true,
    Action: false,
    Actions: true,
  });

  const [filterButton, setFilterButton] = useState(false);
  const [columnButton, setColumnButton] = useState(false);

  const header = viewMode === "cards" ? "Cards" : "Table";

  return (
    <>
      <Header
        text={"Student " + header}
        img="/images/headers/students.png"
        extraItem={
          viewMode === "cards" && (
            <span className="fs-5 badge bg-primary">
              {sortedFilteredStudents.length}
            </span>
          )
        }
        alt="students"
      />

      <SettingsBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchPlaceholder="Search students..."
        filterButton={filterButton}
        setFilterButton={setFilterButton}
        columnButton={columnButton}
        setColumnButton={setColumnButton}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />

      {viewMode === "table" && (
        <div className="m-3">
          <table
            className="table table-striped table-hover mt-3 rounded-table mx-auto"
            style={{ boxShadow: "5px 5px 25px 5px rgba(144, 142, 142, 0.7)" }}
          >
            <StudentTableHeader
              visibleColumns={visibleColumns}
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
              sortedFilteredStudents={sortedFilteredStudents}
            />
            {students.length > 0 && parents.length > 0 ? (
              <StudentTableRow
                sortedFilteredStudents={sortedFilteredStudents}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
                setUserToDel={setUserToDel}
                setSelectedStudentIndex={setSelectedStudentIndex}
                setIsModalVisible={setIsModalVisible}
                setFormData={setFormData}
              />
            ) : (
              <PlaceholderRow visibleColumns={visibleColumns} />
            )}
          </table>
        </div>
      )}
      {viewMode === "cards" && (
        <Students
          sortedFilteredStudents={sortedFilteredStudents}
          parents={parents}
          setSelectedStudentIndex={setSelectedStudentIndex}
          setIsModalVisible={setIsModalVisible}
          setFormData={setFormData}
        />
      )}
      <EditStudentModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedStudentIndex={selectedStudentIndex}
        setSelectedStudentIndex={setSelectedStudentIndex}
        setVisibleColumns={setVisibleColumns}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSave={handleSave}
      />
      <DeleteConfirmationModal
        userToDel={userToDel}
        setUserToDel={setUserToDel}
      />
    </>
  );
};

export default StudentTable;
