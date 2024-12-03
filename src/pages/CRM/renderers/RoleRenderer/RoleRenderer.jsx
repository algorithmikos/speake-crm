import React from "react";
import Face6Icon from "@mui/icons-material/Face6";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { Tooltip } from "@mui/material";

const RoleRenderer = ({ value, declarative = false }) => {
  if (value === "student") {
    return (
      <Tooltip title="Student" arrow placement="right">
        <Face6Icon /> {declarative && " Student"}
      </Tooltip>
    );
  } else if (value === "parent") {
    return (
      <Tooltip title="Parent" arrow placement="right">
        <EscalatorWarningIcon /> {declarative && " Parent"}
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Unknown" arrow placement="right">
        <PsychologyAltIcon /> {declarative && " Unknown"}
      </Tooltip>
    );
  }
};

export default RoleRenderer;
