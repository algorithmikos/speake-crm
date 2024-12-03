import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { textDir } from "../../utils/functions";

const CardRow = ({
  firstCell,
  secondCell,
  fcWidth = "25%",
  scWidth = "",
  fc,
  sc,
  secondCellSx,
  className,
}) => {
  return (
    <TableRow className={className}>
      <TableCell
        className="app-font"
        sx={{
          width: fcWidth,
          borderRight: 1,
          borderTop: 1,
          borderColor: "#e0e0e0",
        }}
      >
        {firstCell}
      </TableCell>
      <TableCell
        className="app-font"
        sx={{
          borderTop: 1,
          borderColor: "#e0e0e0",
          direction: sc ? (textDir(sc) === "left" ? "ltr" : "rtl") : "auto",
          textAlign: sc ? textDir(sc) : "start",
          ...secondCellSx,
        }}
      >
        {secondCell}
      </TableCell>
    </TableRow>
  );
};

export default CardRow;
