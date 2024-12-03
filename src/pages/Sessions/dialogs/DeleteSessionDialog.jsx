import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CustomDialog from "../../../components/Dialog/CustomDialog";

const DeleteSessionDialog = ({ state, setState }) => {
  return (
    <CustomDialog
      title="Delete Session"
      content={
        <Box>
          <Typography variant="body1">Are you sure?</Typography>
        </Box>
      }
      open={state}
      closeButton={() => setState(false)}
      buttons={
        <Grid container justifyContent="center">
          <LoadingButton variant="contained" color="error">
            Delete
          </LoadingButton>
        </Grid>
      }
    />
  );
};

export default DeleteSessionDialog;
