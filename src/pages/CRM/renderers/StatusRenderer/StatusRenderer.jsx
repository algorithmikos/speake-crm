import React from "react";
import CallEndIcon from "@mui/icons-material/CallEnd";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import PhoneLockedIcon from "@mui/icons-material/PhoneLocked";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const StatusRenderer = ({ value }) => {
  if (value === "called") {
    return (
      <div className="cell-container">
        <CallEndIcon fontSize="small" sx={{ mr: 0.5 }} />
        Called
      </div>
    );
  } else if (value === "call-later") {
    return (
      <div className="cell-container">
        <AddIcCallIcon fontSize="small" sx={{ mr: 0.5 }} />
        Call Later
      </div>
    );
  } else if (value === "booked") {
    return (
      <div className="cell-container">
        <BeenhereIcon fontSize="small" sx={{ mr: 0.5 }} />
        Booked
      </div>
    );
  } else if (value === "done") {
    return (
      <div className="cell-container">
        <DoneAllIcon fontSize="small" sx={{ mr: 0.5 }} />
        Done
      </div>
    );
  } else if (value === "no-answer") {
    return (
      <div className="cell-container">
        <PhonePausedIcon fontSize="small" sx={{ mr: 0.5 }} />
        No Answer
      </div>
    );
  } else if (value === "phone-closed") {
    return (
      <div className="cell-container">
        <PhoneLockedIcon fontSize="small" sx={{ mr: 0.5 }} />
        Phone Closed
      </div>
    );
  } else {
    return (
      <div className="cell-container">
        <ContactPhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
        Not Called
      </div>
    );
  }
};

export default StatusRenderer;
