import React from "react";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import { Button, Grid, Typography } from "@mui/material";
import PanToolIcon from '@mui/icons-material/PanTool';
import CancelIcon from '@mui/icons-material/Cancel';

const UnsavedDialog = ({ state, setState, setFatherDialogState }) => {
  return (
    <CustomDialog
      title="Unsaved Changes"
      content={
        <Typography variant="body1">
          You've not saved your changes. If you close without saving it, all the
          changes you made will be lost.
        </Typography>
      }
      buttons={
        <Grid container justifyContent="space-evenly">
          <Grid item>
            <Button
              variant="contained"
              startIcon={<PanToolIcon />}
              onClick={() => {
                setState(false);
              }}
            >
              Keep Changes
            </Button>
          </Grid>

          <Grid item>
            <Button
              width="100%"
              variant="contained"
              color="error"
              startIcon={<CancelIcon />}
              onClick={() => {
                setFatherDialogState(false);
                setState(false);
              }}
            >
              Cancel Changes
            </Button>
          </Grid>
        </Grid>
      }
      open={state}
      onClose={() => {}}
      closeButton={() => setState(false)}
    />
  );
};

export default UnsavedDialog;
