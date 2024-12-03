import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

const PriorityRenderer = ({ value }) => {
  if (value === "hot") {
    return <CircleIcon fontSize="small" color="error" />;
  } else if (value === "warm") {
    return <CircleIcon fontSize="small" color="warning" />;
  } else if (value === "cold") {
    return <CircleIcon fontSize="small" color="info" />;
  } else if (value === "n/a") {
    return <CircleIcon fontSize="small" sx={{ color: "grey" }} />;
  }
};

export default PriorityRenderer;
