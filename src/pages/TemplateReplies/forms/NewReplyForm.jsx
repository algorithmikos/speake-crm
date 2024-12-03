import { Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewReply } from "../../../rtk/slices/utils-slice";

const NewReplyForm = () => {
  const dispatch = useDispatch();
  const utilsStore = useSelector((state) => state.utils);
  const { newReply } = utilsStore;

  return (
    <Grid container mt={2} gap={1}>
      <TextField
        sx={{ direction: "rtl" }}
        inputProps={{ className: "app-font" }}
        fullWidth
        label="Reply Title"
        value={newReply.title || ""}
        onChange={(e) =>
          dispatch(setNewReply({ ...newReply, title: e.target.value }))
        }
      />

      <TextField
        sx={{ direction: "rtl" }}
        inputProps={{ className: "app-font" }}
        fullWidth
        multiline
        minRows={3}
        label="Reply Text"
        value={newReply.text || ""}
        onChange={(e) =>
          dispatch(setNewReply({ ...newReply, text: e.target.value }))
        }
      />
    </Grid>
  );
};

export default NewReplyForm;
