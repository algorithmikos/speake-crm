import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiServer } from "../server";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import { Header } from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../rtk/slices/classes-slice";
import Icon from "../components/Icon";
import FilterSection from "../components/StudentsTable/FilterSection";

const Planner = () => {
  const dispatch = useDispatch();
  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];
  const workHours = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
  ];

  const [selectedDay, setSelectedDay] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [group, setGroup] = useState("");
  const [note, setNote] = useState("");
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [newAppointmentModal, setNewAppointmentModal] = useState(false);
  const [deletedClass, setDeletedClass] = useState("");
  const sortedClasses = useSelector((state) => state.classes);
  // const sortedClasses = JSON.parse(JSON.stringify(classes))
  //   .sort(
  //     (a, b) =>
  //       workHours.findIndex((Time) => Time === a.from) -
  //       workHours.findIndex((Time) => Time === b.from)
  //   )
  //   .sort(
  //     (a, b) =>
  //       daysOfWeek.findIndex((day) => day === a.day) -
  //       daysOfWeek.findIndex((day) => day === b.day)
  //   );

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const resetFields = () => {
    setSelectedDay("");
    setFromTime("");
    setToTime("");
    setGroup("");
    setNote("");
  };

  const handleAddUnavailableTime = async () => {
    if (
      selectedDay !== "" &&
      fromTime !== "" &&
      toTime !== "" &&
      group !== ""
    ) {
      const newUnavailableTime = {
        day: selectedDay,
        from: fromTime,
        to: toTime,
        group: group,
        note: note?.trim() || "",
      };

      await toast.promise(
        axios.post(`${ApiServer}/classes`, newUnavailableTime),
        {
          pending: {
            render: "Saving Class...",
          },
          success: {
            render: "Class saved successfully!",
            type: "success",
          },
          error: {
            render: "Failed to save class!",
            type: "error",
          },
        }
      );
      dispatch(fetchClasses());
      resetFields();
    }
  };

  const handleDelete = async (appointmentId) => {
    await toast.promise(axios.delete(`${ApiServer}/classes/${appointmentId}`), {
      pending: {
        render: "Deleting Class...",
      },
      success: {
        render: "Class deleted successfully!",
        type: "success",
      },
      error: {
        render: "Failed to delete class!",
        type: "error",
      },
    });
    dispatch(fetchClasses());
  };

  const getAvailableAppointments = () => {
    const allAppointments = [];
    for (let day of daysOfWeek) {
      const takenTimesForDay = sortedClasses.filter(
        (entry) => entry.day === day
      );

      let availableTimes = [];

      if (takenTimesForDay.length === 0) {
        availableTimes.push(
          // `${day} ${workHours[0]} : ${workHours[workHours.length - 1]}`
          { day: day, from: workHours[0], to: workHours[workHours.length - 1] }
        );
      } else {
        let startTime = workHours[0];

        for (let i = 0; i < takenTimesForDay.length; i++) {
          const current = takenTimesForDay[i];

          if (current.from !== startTime) {
            availableTimes.push(
              // `${day} ${startTime} : ${current.from}`
              { day: day, from: startTime, to: current.from }
            );
          }

          startTime = current.to;
        }

        if (startTime !== workHours[workHours.length - 1]) {
          availableTimes.push(
            // `${day} ${startTime} : ${workHours[workHours.length - 1]}`
            { day: day, from: startTime, to: workHours[workHours.length - 1] }
          );
        }
      }

      allAppointments.push(
        availableTimes
        // .join(", ")
      );
    }

    return allAppointments;
  };

  const selectedFilters = useSelector((state) => state.filters.selectedFilters);

  const classesFilter = (c) => {
    return (
      (selectedFilters.grades.includes(c.group.toLowerCase()) ||
        selectedFilters.grades.length === 0) &&
      (selectedFilters.status.includes(c.note) ||
        selectedFilters.status.length === 0)
    );
  };

  const FormStyleClasses = "mb-2 justify-content-center align-items-center";
  const FormLabelStyle = { textAlign: "left" };

  return (
    <>
      <Container>
        <Row>
          <Header
            text="Reserved Appointments"
            extraItem={
              <Button onClick={() => setNewAppointmentModal(true)}>
                New Appointment
              </Button>
            }
          />
          <FilterSection payment={false} />
        </Row>
        <Row className="justify-content-center">
          {sortedClasses /*.filter(classesFilter)*/
            ?.map((entry, index) => (
              <Card key={index} style={{ width: "18rem" }} className="p-0 m-2">
                <Card.Header className="d-flex justify-content-between align-items-center fw-bold h5">
                  {entry.group}
                  <Icon
                    icon="faTrash"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setDeleteConfirmModal(true);
                      setDeletedClass(entry);
                    }}
                  />
                </Card.Header>

                <Card.Body>
                  <Card.Title>{entry.day}</Card.Title>
                  {entry.from} : {entry.to}
                </Card.Body>
                {entry.note && <Card.Footer>{entry.note}</Card.Footer>}
              </Card>
            ))}
        </Row>

        <Row>
          <Header text="Available Appointments" />
        </Row>
        <Row className="justify-content-center">
          {getAvailableAppointments().map(
            (app, index) =>
              app[0]?.day && (
                <Card
                  key={index}
                  style={{ width: "15rem" }}
                  className="p-0 m-2"
                >
                  <Card.Header className="text-start h5 fw-bold">
                    <Icon icon="faCalendarDay" className="text-muted" />{" "}
                    {app[0].day}
                  </Card.Header>
                  <Card.Body>
                    <ul style={{ listStyleType: "none" }} className=" m-0 ps-3">
                      {app.map((item) => (
                        <li className="text-start">
                          <Icon icon="faClock" className="text-muted" />
                          {"  "}
                          {item.from} : {item.to}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              )
          )}
        </Row>
      </Container>

      {newAppointmentModal && (
        <Modal
          show={newAppointmentModal}
          onHide={() => {
            resetFields();
            setNewAppointmentModal(false);
          }}
          centered
        >
          <ModalHeader closeButton className="h4 fw-bold">
            New Appointment
          </ModalHeader>
          <ModalBody>
            <Form>
              <Form.Group
                as={Row}
                controlId="daySelect"
                className={FormStyleClasses}
              >
                <Form.Label as={Col} sm="2" xs="2" style={FormLabelStyle}>
                  Day:
                </Form.Label>
                <Col sm="7" xs="9">
                  <Form.Select
                    as="select"
                    value={selectedDay}
                    onChange={handleDayChange}
                  >
                    <option value="">Select Day</option>
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="fromTimeSelect"
                className={FormStyleClasses}
              >
                <Form.Label as={Col} sm="2" xs="2" style={FormLabelStyle}>
                  From:
                </Form.Label>
                <Col sm="7" xs="9">
                  <Form.Select
                    as="select"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    {workHours.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="toTimeSelect"
                className={FormStyleClasses}
              >
                <Form.Label as={Col} sm="2" xs="2" style={FormLabelStyle}>
                  To:
                </Form.Label>
                <Col sm="7" xs="9">
                  <Form.Select
                    as="select"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    {workHours.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="noteInput"
                className={FormStyleClasses}
              >
                <Form.Label as={Col} sm="2" xs="2" style={FormLabelStyle}>
                  Group:
                </Form.Label>
                <Col sm="7" xs="9">
                  <Form.Select
                    type="select"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <option value="">Select a group</option>
                    <option value="1st Secondary">1st Secondary</option>
                    <option value="2nd Secondary">2nd Secondary</option>
                    <option value="3rd Secondary">3rd Secondary</option>
                    <option value="Speak-E Course">Speak-E Course</option>
                    <option value="No Group">No Group</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="noteInput"
                className={FormStyleClasses}
              >
                <Form.Label as={Col} sm="2" xs="2" style={FormLabelStyle}>
                  Note:
                </Form.Label>
                <Col sm="7" xs="9">
                  <Form.Control
                    as="textarea"
                    value={note}
                    onChange={handleNoteChange}
                    placeholder="Enter note..."
                  />
                </Col>
              </Form.Group>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => {
                resetFields();
                setNewAppointmentModal(false);
              }}
            >
              Close
            </Button>
            <Button
              variant={
                selectedDay && fromTime && toTime && group
                  ? "primary"
                  : "secondary"
              }
              onClick={() => {
                setNewAppointmentModal(false);
                handleAddUnavailableTime();
              }}
              disabled={!selectedDay || !fromTime || !toTime || !group}
            >
              {group === "No Group" ? "Add Unavailable Time" : "Add New Class"}
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {deleteConfirmModal && (
        <Modal
          show={deleteConfirmModal}
          onHide={() => setDeleteConfirmModal(false)}
          centered
        >
          <ModalHeader closeButton className="fw-bold">
            Delete Confirmation
          </ModalHeader>
          <ModalBody>
            Are you sure you want to{" "}
            <span className="fw-bold" style={{ color: "red" }}>
              DELETE
            </span>{" "}
            the class held every{" "}
            <span>
              {deletedClass.day} from {deletedClass.from} to {deletedClass.to}{" "}
              for {deletedClass.group}
            </span>
            ?
          </ModalBody>
          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirmModal(false)}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setDeleteConfirmModal(false);
                handleDelete(deletedClass._id);
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default Planner;
