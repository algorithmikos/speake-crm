import Circle from "@mui/icons-material/Circle";
import React from "react";

const StatusRenderer = ({ value, fontSize = "medium", mr = 0, ml = 0 }) => {
  if (value === "active") {
    return (
      <Circle color="success" sx={{ mr: mr, ml: ml }} fontSize={fontSize} />
    );
  } else if (value === "on-hold") {
    return (
      <Circle color="disabled" sx={{ mr: mr, ml: ml }} fontSize={fontSize} />
    );
  } else if (value === "finished") {
    return <Circle color="info" sx={{ mr: mr, ml: ml }} fontSize={fontSize} />;
  }
};

export default StatusRenderer;
