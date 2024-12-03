import React, { useState } from "react";
import StudentCard from "../components/StudentCard";
import axios from "axios";
import { ApiServer } from "../server";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { AwesomeButton } from "react-awesome-button";
import { Header } from "../components/Header";
import { SingleStudent } from "../components/SingleStudent";

function MultiStudents() {
  const [iterations, setIterations] = useState(1);
  const [loading, setLoading] = useState(false);

  const initialStudent = {
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

  const [students, setStudents] = useState(
    Array.from({ length: iterations }, () => ({ ...initialStudent }))
  );

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;

    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      const studentToUpdate = updatedStudents[index];

      if (name === "startTime" || name === "endTime") {
        // If the input name is "startTime" or "endTime", update the class object
        studentToUpdate.class = {
          ...studentToUpdate.class,
          [name]: value,
        };
      } else {
        // For other fields, update the student object
        studentToUpdate[name] = type === "checkbox" ? checked : value;
      }

      return updatedStudents;
    });
  };

  const handleCheckboxChange = (e, index) => {
    const { value, checked } = e.target;

    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      const studentToUpdate = updatedStudents[index];
      const dayIndex = studentToUpdate.class.day.indexOf(value);

      if (checked) {
        if (studentToUpdate.class.day.length < 2 && dayIndex === -1) {
          // Add the selected day to the class.day array if it's not already present
          studentToUpdate.class.day.push(value);
        } else {
          // If the user tries to select more than 2 days or a day that's already selected, don't allow it
          e.target.checked = false;
        }
      } else {
        // Remove the unselected day from the class.day array
        if (dayIndex !== -1) {
          studentToUpdate.class.day.splice(dayIndex, 1);
        }
      }

      return updatedStudents;
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);

    // Send the data to the server.
    try {
      const parentPromises = students.map(async (student) => {
        let parentResponse;
        parentResponse = await axios.post(`${ApiServer}/parents`, {
          parentName: student.parentName || "N.N.",
          parentNumber: student.parentNumber || "",
          children: [],
        });
        return parentResponse;
      });

      const parentResponses = await Promise.all(parentPromises);

      // Create an array of students to send in one request
      const studentsToCreate = students.map((student, index) => ({
        ...student,
        studentNumber: student.studentNumber || "",
        parent: parentResponses[index].data._id,
      }));

      // Send all students in one request
      const studentResponses = await toast.promise(
        axios.post(`${ApiServer}/students`, studentsToCreate),
        {
          pending: {
            render: "Saving Students...",
          },
          success: {
            render: "Students saved successfully!",
            type: "success",
          },
          // Message and options for the "error" state
          error: {
            render: "Failed to save students!",
            type: "error",
          },
        }
      );

      // Update parent's children array
      for (let i = 0; i < parentResponses.length; i++) {
        if (!parentResponses[i]) {
          throw new Error(`ParentResponse at index ${i} is undefined`);
        }
        parentResponses[i].data.children.push(studentResponses.data[i]._id);
        await axios.put(
          `${ApiServer}/parents/${parentResponses[i].data._id}`,
          parentResponses[i].data
        );
      }
      setLoading(false);
      console.log("Created students:", studentResponses);

      /* Reset Component */
      setStudents((prevStudents) => {
        // Empty the first student card (index 0)
        const updatedStudents = prevStudents.map((student, index) => {
          if (index === 0) {
            return { ...initialStudent };
          }
          return student;
        });

        // If there are more than one student cards, remove the extra ones
        if (updatedStudents.length > 1) {
          return updatedStudents.slice(0, 1); // Keep the first card
        } else {
          return updatedStudents;
        }
      });
      setIterations(1);

      // toast.success("Students saved successfully!", {
      //   position: "top-right",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    } catch (error) {
      console.error("Error creating data:", error);
      setLoading(false);
      // toast.error("Failed to save students!", {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };

  const addStudent = () => {
    setIterations(iterations + 1);
    // Add a new student object to the students array
    setStudents((prevStudents) => [...prevStudents, { ...initialStudent }]);
  };

  const deleteStudentCard = (index) => {
    setStudents((prevStudents) => {
      // Check if there's more than one student card
      if (prevStudents.length > 1) {
        // Create a new array without the student at the specified index
        const updatedStudents = prevStudents.filter((_, i) => i !== index);
        return updatedStudents;
      } else {
        alert("You cannot delete the last student.");
        return prevStudents;
      }
    });
  };

  return (
    <div>
      <Header
        text={"New Student(s)"}
        img=""
        alt="new-students"
        extraItem={
          <AwesomeButton
            type="primary"
            className="aws-btn-s sm-button"
            onPress={() => addStudent()}
          >
            Add a student
          </AwesomeButton>
        }
      />

      <main className="m-3">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {students.map((student, index) =>
              iterations > 1 ? (
                <StudentCard
                  key={index}
                  index={index}
                  student={student}
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange}
                  deleteStudentCard={deleteStudentCard}
                />
              ) : (
                <SingleStudent
                  key={index}
                  index={index}
                  student={student}
                  handleChange={handleChange}
                />
              )
            )}
          </div>

          {loading ? (
            <>
              <LoadingSpinner text="Saving Students" size={20} />
            </>
          ) : (
            <div className="d-flex justify-content-center">
              <AwesomeButton
                type="primary"
                onPress={() => handleSubmit()}
                disabled={
                  students.every((student) => student.studentName)
                    ? false
                    : true
                }
              >
                SAVE STUDENT(S)
              </AwesomeButton>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default MultiStudents;
