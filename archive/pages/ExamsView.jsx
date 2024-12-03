import React, { useState } from "react";
import { Card, Row, Col, Form, Modal, Button } from "react-bootstrap";

const ExamsView = () => {
  // eslint-disable-next-line
  const [students, setStudents] = useState([
    {
      id: 1,
      studentName: "Umar",
      parentName: "Hamdy",
      grade: "2nd secondary",
      studentNumber: "01150547193",
      parentNumber: "01092022571",
      notes: "",
      action: "Call",
      payment: "Monthly",
      payments: [{ date: "2023-10-30", amount: 240 }],
      source: "Club",
      specialCase: false,
      exams: [
        {
          id: 1,
          attendance: false,
          review: true,
          grade: 100,
          note: "",
        },
      ],
    },
    {
      id: 2,
      studentName: "Manar",
      parentName: "Fayiz",
      grade: "3rd secondary",
      studentNumber: "01114581774",
      parentNumber: "01114586898",
      notes: "",
      action: "WhatsApp",
      payment: "per Session",
      payments: [
        { date: "2023-10-30", amount: 850 },
        { date: "2023-11-15", amount: 621 },
      ],
      source: "On Ground",
      specialCase: false,
      exams: [
        {
          id: 2,
          attendance: false,
          review: true,
          grade: 100,
          note: "",
        },
      ],
    },
    {
      id: 3,
      studentName: "Hamed",
      parentName: "Aziz",
      grade: "1st secondary",
      studentNumber: "01116521774",
      parentNumber: "01089586898",
      notes: "",
      action: "Call",
      payment: "Monthly",
      payments: [],
      source: "Facebook",
      specialCase: true,
      exams: [
        {
          id: 2,
          attendance: true,
          review: true,
          grade: 100,
          note: "He was good",
        },
        {
          id: 3,
          attendance: true,
          review: true,
          grade: 100,
          note: "He was cheating",
        },
      ],
    },
  ]);
  // eslint-disable-next-line
  const [exams, setExams] = useState([
    {
      id: 1,
      note: "Foucses on voc",
      date: "2023-11-01",
    },
    {
      id: 2,
      note: "Foucses on grammar",
      date: "2023-11-01",
    },
    {
      id: 3,
      note: "",
      date: "2024-05-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editExamModal, setEditExamModal] = useState(false);
  const [createExamModal, setCreateExamModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState({});
  const [formData, setFormData] = useState({
    id: 0,
    note: "",
    date: "",
  });

  const filteredExams = exams.filter(
    (exam) =>
      exam.id === searchTerm ||
      exam.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.date.toString().includes(searchTerm)
  );

  const handleExamEdit = (exam) => {
    setEditExamModal(true);
    setSelectedExam(exam);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setSelectedExam((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    setEditExamModal(false);
    setFormData({
      id: 0,
      note: "",
      date: "",
    });
  };

  const [newExam, setNewExam] = useState({
    id: 0,
    note: "",
    date: "",
  });

  const handleExamFormChange = (event) => {
    const { name, value } = event.target;
    setNewExam((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="inside">
      <Row style={{ marginTop: 20, width: "100%" }}>
        <Col>
          <div className="exam-preview-container">
            <div className="d-flex align-items-center justify-content-between mt-2 ms-2 me-2">
              <Button
                variant="primary"
                onClick={() => setCreateExamModal(true)}
              >
                Create New Exam
              </Button>
              <h2>Exams</h2>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: 400 }}
                />
              </Form.Group>
            </div>
            <div
              className="exams-details"
              style={{ textAlign: "left", padding: 10 }}
            >
              {filteredExams.map((exam, index) => (
                <Card key={index} className="mt-2">
                  <Card.Body style={{ paddingLeft: 25 }}>
                    <Card.Title className="mb-3">
                      Exam {exam.id}
                      <Button
                        variant="none"
                        onClick={() => handleExamEdit(exam)}
                      >
                        ✏️
                      </Button>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Date: {exam.date}
                      <br />
                    </Card.Subtitle>
                    Exam Note: {exam.note}
                    <br />
                    Students:{" "}
                    {students
                      .filter((s) => s.exams.some((e) => e.id === exam.id))
                      .map((s, i) => `${s.studentName} - `)}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {editExamModal && (
        <Modal
          show={editExamModal}
          onHide={() => setEditExamModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Exam {selectedExam.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="date">
                <Form.Control
                  type="date"
                  name="date"
                  checked={formData.date}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="note">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="note"
                  value={formData.note}
                  onChange={handleFormChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditExamModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {createExamModal && (
        <Modal
          show={createExamModal}
          onHide={() => setCreateExamModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              New Exam
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newExam.date}
                  onChange={handleExamFormChange}
                />
              </Form.Group>
              <Form.Group controlId="note">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="note"
                  value={newExam.note}
                  onChange={handleExamFormChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setCreateExamModal(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setCreateExamModal(false);
              }}
            >
              Create Exam
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ExamsView;
