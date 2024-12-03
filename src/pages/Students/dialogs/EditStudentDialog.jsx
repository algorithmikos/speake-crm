import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import EditStudentForm from "../forms/editStudentForm";
import { updateStudent } from "../../../backend/students";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import {
  setEditStudent,
  setOldStudent,
} from "../../../rtk/slices/students-slice";
import { compareObjects } from "../../../utils/functions";

const EditStudentDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const studentsStore = useSelector((state) => state.students);
  const { editStudent, oldStudent } = studentsStore;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="Edit Student"
      content={<EditStudentForm />}
      buttons={
        <Grid container justifyContent="center">
          <LoadingButton
            variant="contained"
            loading={isSaving}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            onClick={async () => {
              setIsSaving(true);
              updateStudent(
                editStudent,
                compareObjects(oldStudent, editStudent)
              )
                .then(() => {
                  setIsSaving(false);
                  setState(false);
                  dispatch(setEditStudent({}));
                  dispatch(setOldStudent({}));
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
        dispatch(setEditStudent({}));
        dispatch(setOldStudent({}));
      }}
    />
  );
};

export default EditStudentDialog;
