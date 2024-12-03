import React, { useState } from "react";
import NewClassForm from "../forms/NewClassForm";
import { Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import { setNewClass } from "../../../rtk/slices/classes-slice";
import { createClass } from "../../../backend/classes";
import { LoadingButton } from "@mui/lab";

const NewClassDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes);
  const { newClass, newClassTemp } = classes;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="New Class"
      content={<NewClassForm />}
      buttons={
        <Grid container gap={1} justifyContent="center">
          <Grid item>
            <LoadingButton
              loading={isSaving}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={async () => {
                setIsSaving(true);
                await createClass(newClass);
                dispatch(setNewClass(newClassTemp));
                setIsSaving(false);
                setState(false);
              }}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      }
      open={state}
      onClose={() => {}}
      closeButton={() => {
        setState(false);
        dispatch(setNewClass(newClassTemp));
      }}
    />
  );
};

export default NewClassDialog;
