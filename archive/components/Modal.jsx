import { useEffect } from "react";
import { Container } from "react-bootstrap";

function Modal({
  title,
  saveButtonText = "Save changes",
  saveButtonColor = "primary",
  width = 750,
  theModal,
  footer = true,
  editModal,
  setEditModal,
  handleModSubmit,
  sessionToBeSubmitted,
}) {
  const closeModal = () => setEditModal(false);
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the pressed key is Escape (key code 27)
      if (event.keyCode === 27) {
        closeModal();
      }
    };

    // Add event listener when the modal is open
    if (editModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Remove event listener when the modal is closed or the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editModal, closeModal]);

  return (
    editModal && (
      <Container>
        <div className="modal-backdrop fade show"></div>
        <div className="modal fade show" style={{ display: "block" }}>
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            style={{ maxWidth: width }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">{theModal}</div>
              {footer && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className={`btn btn-${saveButtonColor}`}
                    onClick={() => handleModSubmit(sessionToBeSubmitted)}
                  >
                    {saveButtonText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    )
  );
}

export default Modal;
