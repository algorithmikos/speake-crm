import React, { useState } from "react";
import { Card, Row, Col, Form, Modal, Button } from "react-bootstrap";
import PageTitle from "../components/PageTitle";

const Assignments = () => {
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
      assignments: [
        {
          id: 1,
          submission: true,
          submitDate: "2023-11-02",
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
      assignments: [
        {
          id: 2,
          submission: true,
          submitDate: "2023-11-02",
          review: true,
          grade: 80,
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
      assignments: [
        {
          id: 3,
          submission: true,
          submitDate: "2023-11-02",
          review: true,
          grade: 30,
          note: "",
        },
      ],
    },
    {
      id: 4,
      studentName: "Hussein",
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
      assignments: [
        {
          id: 1,
          submission: true,
          submitDate: "2023-11-02",
          review: true,
          grade: 30,
          note: "",
        },
        {
          id: 3,
          submission: true,
          submitDate: "2023-11-02",
          review: true,
          grade: 30,
          note: "",
        },
      ],
    },
    {
      id: 5,
      studentName: "Hussein",
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
      assignments: [
        {
          id: 2,
          submission: true,
          submitDate: "2023-11-02",
          review: true,
          grade: 30,
          note: "",
        },
        {
          id: 1,
          submission: true,
          submitDate: "2023-11-02",
          review: true,
          grade: 30,
          note: "",
        },
      ],
    },
  ]);

  // eslint-disable-next-line
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      note: "Voc",
      date: "2023-11-01",
    },
    {
      id: 2,
      note: "Grammar",
      date: "2023-11-01",
    },
    {
      id: 3,
      note: "",
      date: "2024-05-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clickedAssignment, setClickedAssignment] = useState({});
  const [formData, setFormData] = useState({
    submission: false,
    review: false,
    grade: 0,
    note: "",
  });

  // useEffect(() => {
  //   setSelectedStudent(students.filter((s) => s.id === selectedStudent.id)[0]);
  // }, [students]);

  const filteredStudents = students.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  const handleCardClick = (student) => {
    setSelectedStudent(student);
  };

  const handleAssignmentEdit = (assignment) => {
    setIsModalVisible(true);
    setClickedAssignment(assignment);
    setFormData({
      submission: assignment.submission,
      review: assignment.review,
      grade: assignment.grade,
      note: assignment.note,
    });
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveChanges = () => {
    // Here, you can update the assignment data for the selected student

    setIsModalVisible(false);
    setFormData({
      submission: false,
      review: false,
      grade: 0,
      note: "",
    });
  };

  // useEffect(() => {
  //   console.log("Modified Students Updated:", modifiedStudents);
  // }, [modifiedStudents]);

  return (
    <div className="inside">
      <PageTitle>Assignments</PageTitle>
      <Row style={{ marginTop: 20 }}>
        <Col md={4}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
          <div
            className="student-card-container"
            style={{ padding: 10, marginTop: 10 }}
          >
            {filteredStudents.map((student) => (
              <Card
                key={student.id}
                className="mt-2"
                onClick={() => handleCardClick(student)}
              >
                <Card.Body>
                  <Card.Title>
                    {student.studentName} {student.parentName}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Student ID: {student.id}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
        <Col md={8}>
          {!selectedStudent && (
            <Card
              // key={index}
              className="mt-2"
              style={{ minHeight: 300 }}
            >
              <Card.Body style={{ paddingLeft: 25 }}>
                <Card.Title className="mb-3 text-center">
                  No Student Selected
                </Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle> */}
                No Student Selected
              </Card.Body>
            </Card>
          )}
          {selectedStudent && (
            <div className="assignment-preview-container">
              <div className="d-flex align-items-center">
                <h2 className="flex-grow-1">
                  Assignments for {selectedStudent.studentName}
                </h2>
                <button
                  className="btn"
                  onClick={() => setSelectedStudent(null)}
                >
                  ❌
                </button>
              </div>
              <div
                className="assignment-details"
                style={{ textAlign: "left", padding: 10 }}
              >
                {selectedStudent.assignments.map((assignment, index) => (
                  <Card key={index} className="mt-2">
                    <Card.Body style={{ paddingLeft: 25 }}>
                      <Card.Title className="mb-3">
                        Assignment{" "}
                        {
                          assignments.filter((e) => e.id === assignment.id)[0]
                            .id
                        }
                        <Button
                          variant="none"
                          onClick={() => handleAssignmentEdit(assignment)}
                        >
                          ✏️
                        </Button>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Date:{" "}
                        {
                          assignments.filter((e) => e.id === assignment.id)[0]
                            .date
                        }
                        <br />
                        Assignment Note:{" "}
                        {
                          assignments.filter((e) => e.id === assignment.id)[0]
                            .note
                        }
                      </Card.Subtitle>
                      Submission: {assignment.submission ? "Yes" : "No"}
                      <br />
                      Reviewed: {assignment.review ? "Yes" : "No"}
                      <br />
                      Grade: {assignment.grade}
                      <br />
                      Note: {assignment.note}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>

      {isModalVisible && selectedStudent && (
        <Modal
          show={isModalVisible}
          onHide={() => setIsModalVisible(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Assignment {clickedAssignment.id} [{selectedStudent.studentName} #
              {selectedStudent.id}]
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="submission">
                <Form.Check
                  type="checkbox"
                  name="submission"
                  label="Submitted"
                  checked={formData.submission}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="review">
                <Form.Check
                  type="checkbox"
                  name="review"
                  label="Reviewed"
                  checked={formData.review}
                  onChange={handleFormChange}
                />
              </Form.Group>
              {formData.review && (
                <Form.Group controlId="grade">
                  <Form.Label>Grade</Form.Label>
                  <Form.Control
                    type="number"
                    name="grade"
                    value={formData.grade}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              )}
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
            <Button
              variant="secondary"
              onClick={() => setIsModalVisible(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Assignments;
