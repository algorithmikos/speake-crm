import React, { useState } from "react";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import NewReplyForm from "../forms/NewReplyForm";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Save from "@mui/icons-material/Save";
import { createReply } from "../../../backend/replies";
import { useDispatch, useSelector } from "react-redux";
import { setNewReply } from "../../../rtk/slices/utils-slice";

const NewReplyDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const utilsStore = useSelector((state) => state.utils);
  const { newReply } = utilsStore;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="New Reply"
      content={<NewReplyForm />}
      buttons={
        <Grid container justifyContent="center">
          <LoadingButton
            variant="contained"
            startIcon={<Save />}
            loading={isSaving}
            loadingPosition="start"
            onClick={() => {
              setIsSaving(true);
              createReply({
                title: newReply.title.trim(),
                text: newReply.text.trim(),
              })
                .then(() => {
                  setIsSaving(false);
                  setState(false);
                  dispatch(setNewReply({ title: "", text: "" }));
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
      open={state}
      closeButton={() => {
        setState(false);
      }}
    />
  );
};

export default NewReplyDialog;
