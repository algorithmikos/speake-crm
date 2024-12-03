import React from "react";
import { Grid } from "@mui/material";

function Father({ children }) {
  return (
    <Grid conatiner sx={{ flexGrow: 1 }}>
      {children}
    </Grid>
  );
}

export default Father;
