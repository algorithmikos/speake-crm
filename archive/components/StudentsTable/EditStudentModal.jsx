import StudentCardModel from "../StudentCardModel";

function EditStudentModal({
  isModalVisible,
  setIsModalVisible,
  selectedStudentIndex,
  setSelectedStudentIndex,
  setVisibleColumns,
  formData,
  handleChange,
  handleSave,
}) {
  const closeModal = () => {
    setIsModalVisible(false);
    setVisibleColumns((prev) => ({
      ...prev,
      Actions: true,
    }));
    setSelectedStudentIndex(-1);
  };
  return (
    isModalVisible &&
    selectedStudentIndex !== -1 && (
      <div>
        <div className="modal-backdrop fade show"></div>
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <StudentCardModel
                  formData={formData}
                  index={selectedStudentIndex}
                  handleChange={handleChange}
                />
              </div>
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
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default EditStudentModal;
