import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { Header } from "../components/Header";

const AssignmentsView = () => {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const assignments = useSelector((state) => state.assignments);
  const viewMode = useSelector((state) => state.UI.viewMode);

  const [searchTerm, setSearchTerm] = useState("");
  const [editAssignmentModal, setEditAssignmentModal] = useState(false);
  const [createAssignmentModal, setCreateAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState({
    date: "",
    group: "",
    note: "",
    students: [],
  });
  // const [formData, setFormData] = useState({
  //   date: "",
  //   group: "",
  //   note: "",
  //   students: [],
  // });

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.date.toString().includes(searchTerm)
  );

  const handleAssignmentEdit = (assignment) => {
    setEditAssignmentModal(true);
    setSelectedAssignment(assignment);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setSelectedAssignment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    setEditAssignmentModal(false);
    setFormData({
      id: 0,
      note: "",
      date: "",
    });
  };

  const [newAssignment, setNewAssignment] = useState({
    id: 0,
    note: "",
    date: "",
  });

  const handleAssignmentFormChange = (event) => {
    const { name, value } = event.target;
    setNewAssignment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fieldStyles = "align-items-center mb-2";

  return (
    <>
      <Header text="All Assignments" />
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col>
            <Button
              variant="primary"
              onClick={() => setCreateAssignmentModal(true)}
            >
              Create New Assignment
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <div style={{ textAlign: "left", padding: 10 }}>
          {filteredAssignments.map((assignment, index) => (
            <Card key={index} className="mt-2">
              <Card.Body style={{ paddingLeft: 25 }}>
                <Card.Title className="mb-3">
                  Assignment {index + 1}
                  <Button
                    variant="none"
                    onClick={() => handleAssignmentEdit(assignment)}
                  >
                    ✏️
                  </Button>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Date: {assignment.date.slice(0, 10)}
                  <br />
                </Card.Subtitle>
                Assignment Note: {assignment.note}
                <br />
                Students:{" "}
                {students
                  .filter((student) =>
                    assignment.students?.some(
                      (assignedStudent) =>
                        assignedStudent.student === student._id
                    )
                  )
                  .map((s, i) => `${s.studentName} - `)}
              </Card.Body>
            </Card>
          ))}
          {/* </> */}
        </div>
      </Container>

      {editAssignmentModal && (
        <Modal
          show={editAssignmentModal}
          onHide={() => setEditAssignmentModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Assignment {selectedAssignment._id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form as={Container}>
              <Form.Group as={Row} controlId="date" className={fieldStyles}>
                <Form.Label as={Col} sm="2">
                  Date
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="date"
                    name="date"
                    value={selectedAssignment.date.slice(0, 10)}
                    onChange={handleFormChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="note" className={fieldStyles}>
                <Form.Label as={Col} sm="2">
                  Note
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="note"
                    value={selectedAssignment.note}
                    onChange={handleFormChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="group" className={fieldStyles}>
                <Form.Label as={Col} sm="2">
                  Group
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    as="select"
                    name="group"
                    value={selectedAssignment.group}
                    onChange={handleFormChange}
                  >
                    <option value="1st Secondary">1st Secondary</option>
                    <option value="2nd Secondary">2nd Secondary</option>
                    <option value="3rd Secondary">3rd Secondary</option>
                    <option value="Speak-E Course">Speak-E Course</option>
                  </Form.Select>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setEditAssignmentModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {createAssignmentModal && (
        <Modal
          show={createAssignmentModal}
          onHide={() => setCreateAssignmentModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              New Assignment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newAssignment.date}
                  onChange={handleAssignmentFormChange}
                />
              </Form.Group>
              <Form.Group controlId="note">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="note"
                  value={newAssignment.note}
                  onChange={handleAssignmentFormChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setCreateAssignmentModal(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setCreateAssignmentModal(false);
              }}
            >
              Create Assignment
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AssignmentsView;
