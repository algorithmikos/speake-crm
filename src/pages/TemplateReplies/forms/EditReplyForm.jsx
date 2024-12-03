import { Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditReply } from "../../../rtk/slices/utils-slice";

const EditReplyForm = () => {
  const dispatch = useDispatch();
  const utilsStore = useSelector((state) => state.utils);
  const { editReply } = utilsStore;

  return (
    <Grid container mt={2} gap={1}>
      <TextField
        sx={{ direction: "rtl" }}
        inputProps={{ className: "app-font" }}
        fullWidth
        label="Reply Title"
        value={editReply.title}
        onChange={(e) =>
          dispatch(setEditReply({ ...editReply, title: e.target.value }))
        }
      />

      <TextField
        sx={{ direction: "rtl" }}
        inputProps={{ className: "app-font" }}
        fullWidth
        multiline
        minRows={3}
        label="Reply Text"
        value={editReply.text}
        onChange={(e) =>
          dispatch(setEditReply({ ...editReply, text: e.target.value }))
        }
      />
    </Grid>
  );
};

export default EditReplyForm;
