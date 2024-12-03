import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSession } from "../../rtk/slices/generals-slice";
import Icon from "../Icon";

export const DeleteSession = ({ selectedSession }) => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const sessions = useSelector((state) => state.sessions);
  const chosenSession = sessions.find(
    (session) => session._id === selectedSession
  );
  const [session, setSession] = useState(chosenSession);

  useEffect(() => {
    dispatch(setSelectedSession(session));
    // Clean-up function (if needed)
    return () => {
      // Perform any cleanup actions here
    };
  }, [session]);

  return (
    <>
      Are you sure you want to{" "}
      <span style={{ fontWeight: "bold", color: "red" }}>DELETE</span> Session:{" "}
      {session.date.slice(0, 10)} for {session.group} which was to be held{" "}
      {session.status === "Offline" ? "face-to-face" : "online"}.
    </>
  );
};
