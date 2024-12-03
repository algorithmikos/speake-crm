import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSession } from "../../../backend/sessions";
import { setEditSession } from "../../../rtk/slices/sessions-slice";

import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import CustomDialog from "../../../components/Dialog/CustomDialog";
import EditSessionForm from "../forms/EditSessionForm";

import SaveIcon from "@mui/icons-material/Save";

const EditSessionDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const sessionsStore = useSelector((state) => state.sessions);
  const { editSession } = sessionsStore;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="Edit Session"
      content={<EditSessionForm />}
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
              updateSession(editSession)
                .then((result) => {
                  setIsSaving(false);
                  if (result) {
                    dispatch(setEditSession({}));
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

export default EditSessionDialog;
