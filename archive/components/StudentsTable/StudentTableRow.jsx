import React, { useState } from "react";
import { toast } from "react-toastify";
import Icon from "../Icon";
import { useSelector } from "react-redux";

const iconise = (text) => {
  if (text === "WhatsApp") {
    return <Icon icon="faWhatsapp" size="xl" />;
  }
  return text;
};

function StudentTableRow({
  sortedFilteredStudents,
  visibleColumns,
  setVisibleColumns,
  setUserToDel,
  setSelectedStudentIndex,
  setIsModalVisible,
  setFormData,
}) {
  const parents = useSelector((state) => state.parents);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFilteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const openModal = (index) => {
    setSelectedStudentIndex(index);
    setIsModalVisible(true);
    setVisibleColumns((prev) => ({
      ...prev,
      Actions: false,
    }));
    setFormData(() => ({
      ...currentItems[index],
      parentName: parents.find((p) => p._id === currentItems[index].parent)
        .parentName,
      parentNumber: parents.find((p) => p._id === currentItems[index].parent)
        .parentNumber,
    }));
  };

  function copyToClipboard(text, title = "Number") {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${title} copied to clipboard!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard: " + err);
      });
  }

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

  function rowBgFormat(student, parents) {
    if (
      !student.studentNumber &&
      !parents.find((p) => p._id === student.parent).parentNumber
    ) {
      return "table-danger";
    } else if (student.action !== "Settled") {
      return "table-warning";
    } else {
      return undefined;
    }
  }

  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <tbody>
        {currentItems.map((student, index) => (
          <tr key={index} className={rowBgFormat(student, parents)}>
            <td>{student.studentId}</td>

            {visibleColumns["Student"] && (
              <td
                style={{ width: 160, textAlign: "left" }}
                title={student.studentName}
              >
                {formatName(student.studentName)}
              </td>
            )}

            {visibleColumns["Student Number"] && (
              <td
                onClick={() => copyToClipboard(student.studentNumber)}
                style={{ cursor: "pointer" }}
              >
                {(student.studentNumber || "").replace(
                  /(\d{4})(\d{3})(\d{3})/,
                  "$1 $2 $3"
                )}
              </td>
            )}

            {visibleColumns["Grade"] && <td>{student.grade}</td>}

            {visibleColumns["Status"] && (
              <td>
                <span
                  className={`badge ${
                    student.status === "Online"
                      ? "text-bg-success"
                      : "text-bg-secondary"
                  }`}
                  style={{ fontSize: 14 }}
                >
                  {student.status}
                </span>
              </td>
            )}

            {visibleColumns["E-Mail"] && (
              <td
                onClick={() => copyToClipboard(student.email, "E-Mail")}
                style={{ cursor: "pointer" }}
              >
                {student.email}
              </td>
            )}

            {visibleColumns["Payment"] && (
              <td
                style={{
                  maxWidth: 100,
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                {student.payment}
              </td>
            )}

            {visibleColumns["Source"] && <td>{student.source}</td>}

            {visibleColumns["Parent"] && (
              <td>
                {parents.find((p) => p._id === student.parent).parentName}
              </td>
            )}

            {visibleColumns["Parent Number"] && (
              <td
                onClick={() =>
                  copyToClipboard(
                    parents.find((p) => p._id === student.parent)?.parentNumber
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {(
                  parents.find((p) => p._id === student.parent)?.parentNumber ||
                  ""
                ).replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
              </td>
            )}

            {visibleColumns["Action"] && <td>{iconise(student.action)}</td>}

            {visibleColumns["Actions"] && (
              <td>
                <button className="btn btn-sm" onClick={() => openModal(index)}>
                  <Icon icon="faPenToSquare" size="lg" />
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => setUserToDel(student)}
                >
                  <Icon icon="faTrashCan" size="lg" />
                </button>
              </td>
            )}
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
                disabled={indexOfLastItem >= sortedFilteredStudents.length}
                className="btn btn-sm btn-dark mx-1"
              >
                Page {currentPage + 1}
              </button>
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
}

export default StudentTableRow;
