import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { version as currentAppVersion } from "../../../package.json";
import { updateVersion } from "../../backend/admin";
import { toast } from "react-toastify";

const Admin = () => {
  const [currentAppVer, setCurrentAppVer] = useState(currentAppVersion);

  return (
    <Paper elevation={0}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <Grid item>
          <Typography className="app-font" variant="h3">
            Admin Control Panel
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            label="Upgrade Version"
            defaultValue={currentAppVer}
            onBlur={(e) => setCurrentAppVer(e.target.value)}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              const updateResult = updateVersion(currentAppVer);
              if (updateResult !== 1) {
                toast.success("Upgraded Successfully", { theme: "dark" });
              }
            }}
          >
            Upgrade
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Admin;
