import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Icon from "../components/Icon";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";

function CardItem({ icons, properties, labels }) {
  return properties.map((property, index) => (
    <tr style={{ textAlign: "start" }}>
      <td className="col">
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
        onClick={() => copyToClipboard(property, labels[index])}
        style={{ cursor: "pointer", color: `${!property ? "red" : ""}` }}
      >
        {String(property).length > 28
          ? property.slice(0, 20) + "..."
          : property || `No ${labels[index]}`}
      </td>
    </tr>
  ));
}

const copied = (title) =>
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

async function copyToClipboard(textToCopy, title = "Number") {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy).then(() => {
      copied(title);
    });
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      copied(title);
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}

function Students({
  sortedFilteredStudents,
  parents,
  setIsModalVisible,
  setSelectedStudentIndex,
  setFormData,
}) {
  function colorise(type, grade) {
    let manar;
    if (type === "bg") {
      if (grade === "1st secondary") {
        manar = "#fad000";
      } else if (grade === "2nd secondary") {
        manar = "#fad000";
      } else if (grade === "3rd secondary") {
        manar = "#fad000";
      }
    } else if (type === "color") {
      if (grade === "1st secondary") {
        manar = "text-dark";
      } else if (grade === "2nd secondary") {
        manar = "text-dark";
      } else if (grade === "3rd secondary") {
        manar = "text-dark";
      }
    }
    return manar;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFilteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
            disabled={indexOfLastItem >= sortedFilteredStudents.length}
            className="btn btn-sm btn-dark mx-1"
          >
            Page {currentPage + 1}
          </button>
        </div>

        {sortedFilteredStudents.length > 0 && parents.length > 0 ? (
          <div className="row justify-content-center">
            {currentItems
              .sort((a, b) =>
                b.grade.localeCompare(a.grade, "en", { sensitivity: "base" })
              )
              .map((s, i) => (
                <div
                  key={s.studentId}
                  className="card m-2 p-0 student-card"
                  style={{
                    width: 350,
                  }}
                >
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="m-0">
                      #{s.studentId} — {s.studentName}
                    </h5>
                    <section className="btn-group">
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          setFormData(s);
                          setSelectedStudentIndex(i);
                          setIsModalVisible(true);
                        }}
                      >
                        <Icon icon="faPenToSquare" size="lg" />
                      </button>
                      <button className="btn btn-sm">
                        <Icon icon="faTrashCan" size="lg" />
                      </button>
                    </section>
                  </div>
                  <h6
                    className={`card-header ${colorise("color", s.grade)} m-0`}
                    style={{ backgroundColor: colorise("bg", s.grade) }}
                  >
                    {s.grade}
                  </h6>
                  <div className="card-body d-flex">
                    <table>
                      <tbody>
                        <CardItem
                          icons={[
                            "faEnvelope",
                            "faFileInvoiceDollar",
                            "faClipboardList",
                            "faPhone",
                            "faRectangleAd",
                          ]}
                          properties={[
                            s.email,
                            s.payment,
                            s.action,
                            (s.studentNumber || "").replace(
                              /(\d{4})(\d{3})(\d{3})/,
                              "$1 $2 $3"
                            ),
                            s.source,
                          ]}
                          labels={[
                            "E-Mail",
                            "Payment",
                            "Action",
                            "Student No.",
                            "Source",
                          ]}
                        />
                      </tbody>
                    </table>
                  </div>
                  {parents.find((p) => p._id === s.parent).parentNumber && (
                    <div className={`card-footer m-0`}>
                      <h5>
                        {parents.find((p) => p._id === s.parent).parentName}
                      </h5>
                      <h6
                        onClick={() =>
                          copyToClipboard(
                            parents.find((p) => p._id === s.parent).parentNumber
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {(
                          parents.find((p) => p._id === s.parent)
                            .parentNumber || ""
                        ).replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
                      </h6>
                    </div>
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

export default Students;
