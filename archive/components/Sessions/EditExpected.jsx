import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSession } from "../../rtk/slices/generals-slice";
import Icon from "../Icon";

export const EditExpected = ({ selectedSession }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const sessions = useSelector((state) => state.sessions);
  const chosenSession = sessions.find(
    (session) => session._id === selectedSession
  );
  const [session, setSession] = useState(chosenSession);

  const handleChange = (name, value) => {
    return setSession((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [expected, setExpected] = useState(() => {
    if (session.expected && session.expected.length > 0) {
      // Case 1: Use the mapped values if session.expected is not empty
      const filteredAndMapped = session.expected
        .map((expectedStudent) =>
          students.find((student) => student._id === expectedStudent)
        )
        .filter((student) => student.studentName !== "Deleted Student");
      return filteredAndMapped;
    } else {
      // Case 2: Use the filtered values based on status and grade
      return students.filter(
        (st) =>
          st.studentName !== "Deleted Student" &&
          st.status === session.status &&
          st.grade === session.group.toLowerCase()
      );
    }
  });

  useEffect(() => {
    dispatch(setSelectedSession(session));
    // Clean-up function (if needed)
    return () => {
      // Perform any cleanup actions here
    };
  }, [session]);

  useEffect(() => {
    handleChange(
      "expected",
      expected.map((student) => student._id)
    );
  }, [expected]);

  return (
    <>
      <ol>
        {expected.map((stu) => (
          <li key={stu._id}>
            <div
              className="d-flex justify-content-between align-items-center mb-1"
              style={{ width: 300 }}
            >
              {stu.studentName}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  setExpected(
                    expected.filter((student) => student._id !== stu._id)
                  );
                }}
              >
                <Icon icon="faTrash" />
              </button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};
