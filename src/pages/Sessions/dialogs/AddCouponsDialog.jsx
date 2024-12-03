import React, { useState } from "react";
import { updateSessionCoupons } from "../../../backend/sessions";
import { useSelector } from "react-redux";
import { setEditSession } from "../../../rtk/slices/sessions-slice";

import { Box, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import CustomDialog from "../../../components/Dialog/CustomDialog";
import AddCouponsForm from "../forms/AddCouponsForm";

import SaveIcon from "@mui/icons-material/Save";

const AddCouponsDialog = ({ state, setState }) => {
  const sessionsStore = useSelector((state) => state.sessions);
  const { editSession } = sessionsStore;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="Add Coupons"
      content={
        <Box mt={1}>
          <AddCouponsForm state={editSession} setState={setEditSession} />
        </Box>
      }
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
              updateSessionCoupons(editSession)
                .then((result) => {
                  setIsSaving(false);
                  if (result) {
                    setState(false);
                    dispatch(setEditSession({}));
                  }
                })
                .catch((e) => {
                  setIsSaving(false);
                  console.warn(e);
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

export default AddCouponsDialog;
