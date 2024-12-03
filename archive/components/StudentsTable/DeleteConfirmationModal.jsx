import axios from "axios";
import { ApiServer } from "../../server";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchStudents } from "../../rtk/slices/students-slice";
import { fetchParents } from "../../rtk/slices/parents-slice";
import { useState } from "react";

function DeleteConfirmationModal({ userToDel, setUserToDel }) {
  const dispatch = useDispatch();
  const [deleteReason, setDeleteReason] = useState("");
  const handleDelete = (userToDel) => {
    async function deleteParent() {
      try {
        if (userToDel.parent) {
          const res = await axios.get(
            `${ApiServer}/parents/${userToDel.parent}`
          );
          const parent = res.data;
          if (parent.children.length === 0 || parent.children.length === 1) {
            parent.parentName = "Deleted Parent";
            delete parent.parentNumber;
            await axios.put(`${ApiServer}/parents/${parent._id}`, parent);
          }
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
    async function deleteStudent() {
      try {
        await toast.promise(
          axios.patch(`${ApiServer}/students/${userToDel._id}/delete-fields`, {
            deleteReason,
          }),
          {
            pending: {
              render: "Deleting Student...",
            },
            success: {
              render: "Student deleted successfully!",
              type: "success",
            },
            error: {
              render: "Failed to delete student!",
              type: "error",
            },
          }
        );
        dispatch(fetchStudents());
        dispatch(fetchParents());
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
    deleteParent();
    deleteStudent();
    setUserToDel(null);
  };

  return (
    userToDel && (
      <main>
        <div className="modal-backdrop fade show"></div>
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ARE YOU SURE?</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setUserToDel(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    DELETE
                  </span>{" "}
                  <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                    {userToDel.studentName} {userToDel.parentName}
                  </span>{" "}
                  whose grade's{" "}
                  <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                    {userToDel.grade}
                  </span>
                  ? Once done this action is{" "}
                  <span style={{ fontWeight: "bold" }}>IRREVERSIBLE</span>!
                </p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Please, provide a reason for the deletion"
                  onChange={(e) => setDeleteReason(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className={`btn ${
                    deleteReason ? "btn-danger" : "btn-secondary"
                  }`}
                  onClick={() => handleDelete(userToDel)}
                  disabled={deleteReason ? false : true}
                >
                  YES, I AM SURE. DELETE {userToDel.studentName.toUpperCase()}.
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
}

export default DeleteConfirmationModal;
