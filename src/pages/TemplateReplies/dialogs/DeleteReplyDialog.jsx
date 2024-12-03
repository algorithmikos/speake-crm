import React, { useState } from "react";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import { Chip, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Delete from "@mui/icons-material/Delete";
import { setEditReply } from "../../../rtk/slices/utils-slice";
import { deleteReply, updateReply } from "../../../backend/replies";

const DeleteReplyDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const utilsStore = useSelector((state) => state.utils);
  const { editReply, replies } = utilsStore;

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <CustomDialog
      title="New Reply"
      content={
        <Typography variant="body1">
          Are you sure you want to delete reply:{" "}
          <Chip label={editReply.title} variant="outlined" color="info" />
        </Typography>
      }
      buttons={
        <Grid container justifyContent="center">
          <LoadingButton
            variant="contained"
            color="error"
            startIcon={<Delete />}
            loading={isDeleting}
            loadingPosition="start"
            onClick={() => {
              setIsDeleting(true);

              const updatedReplies = [...replies].filter(
                (_, index) => index !== editReply.index
              );

              deleteReply(updatedReplies)
                .then(() => {
                  setIsDeleting(false);
                  setState(false);
                  dispatch(setEditReply({ title: "", text: "" }));
                })
                .catch((e) => {
                  console.warn(e);
                  setIsDeleting(false);
                });
            }}
          >
            Delete
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

export default DeleteReplyDialog;
