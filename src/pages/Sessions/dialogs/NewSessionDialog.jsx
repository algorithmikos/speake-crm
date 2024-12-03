import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewSession } from "../../../rtk/slices/sessions-slice";
import { createSession } from "../../../backend/sessions";

import CustomDialog from "../../../components/Dialog/CustomDialog";
import NewSessionForm from "../forms/NewSessionForm";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import SaveIcon from "@mui/icons-material/Save";

const NewSessionDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const sessionsStore = useSelector((state) => state.sessions);
  const { newSession } = sessionsStore;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="New Session"
      content={<NewSessionForm />}
      open={state}
      closeButton={() => setState(false)}
      buttons={
        <Grid container justifyContent="center">
          <LoadingButton
            variant="contained"
            loading={isSaving}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={() => {
              setIsSaving(true);
              createSession(newSession)
                .then((result) => {
                  setIsSaving(false);
                  if (result) {
                    dispatch(setNewSession({}));
                    setState(false);
                  }
                })
                .catch((e) => {
                  console.warn(e);
                  setIsSaving(false);
                });
            }}
          >
            Save
          </LoadingButton>
        </Grid>
      }
    />
  );
};

export default NewSessionDialog;
