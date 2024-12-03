import React, { useState } from "react";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import EditReplyForm from "../forms/EditReplyForm";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Save from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { updateReply } from "../../../backend/replies";
import { setEditReply } from "../../../rtk/slices/utils-slice";

const EditReplyDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const utilsStore = useSelector((state) => state.utils);
  const { editReply, replies } = utilsStore;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="Edit Reply"
      content={<EditReplyForm />}
      buttons={
        <Grid container justifyContent="center">
          <LoadingButton
            variant="contained"
            startIcon={<Save />}
            loading={isSaving}
            loadingPosition="start"
            onClick={() => {
              setIsSaving(true);
              const updatedReplies = [...replies];
              updatedReplies[editReply.index] = {
                title: editReply.title.trim(),
                text: editReply.text.trim(),
              };
              updateReply(updatedReplies)
                .then(() => {
                  setIsSaving(false);
                  setState(false);
                  dispatch(setEditReply({ title: "", text: "", index: -1 }));
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

export default EditReplyDialog;
