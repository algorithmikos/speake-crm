import React from "react";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import PlaceIcon from "@mui/icons-material/Place";
import WeekendIcon from "@mui/icons-material/Weekend";

const TypeRenderer = ({ value }) => {
  if (value === "centre") {
    return (
      <div className="cell-container">
        <PlaceIcon fontSize="small" sx={{ mr: 0.5 }} />
        Centre
      </div>
    );
  } else if (value === "online") {
    return (
      <div className="cell-container">
        <CastConnectedIcon fontSize="small" sx={{ mr: 0.5 }} />
        Online
      </div>
    );
  } else if (value === "private") {
    return (
      <div className="cell-container">
        <WeekendIcon fontSize="small" sx={{ mr: 0.5 }} />
        Private
      </div>
    );
  } else if (value === "dokki") {
    return (
      <div className="cell-container">
        <PlaceIcon fontSize="small" sx={{ mr: 0.5 }} />
        Dokki
      </div>
    );
  } else if (value === "maadi") {
    return (
      <div className="cell-container">
        <PlaceIcon fontSize="small" sx={{ mr: 0.5 }} />
        Maadi
      </div>
    );
  } else {
    return "";
  }
};

export default TypeRenderer;
