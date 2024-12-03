import React, { useState } from "react";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Grid } from "@mui/material";
import { setEditClient, setOldClient } from "../../../rtk/slices/clients-slice";
import { updateClient } from "../../../backend/clients";
import EditClientForm from "../forms/EditClientForm";
import { LoadingButton } from "@mui/lab";
import { setEditStudent } from "../../../rtk/slices/students-slice";
import { compareObjects } from "../../../utils/functions";

const EditClientDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { editClient, oldClient } = clients;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="Edit Client"
      content={<EditClientForm />}
      buttons={
        <Grid container gap={1} justifyContent="center">
          <Grid item>
            <LoadingButton
              variant="contained"
              loading={isSaving}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              onClick={async () => {
                setIsSaving(true);
                updateClient(editClient, compareObjects(oldClient, editClient))
                  .then(() => {
                    setIsSaving(false);
                    setState(false);
                    dispatch(setEditStudent({}));
                    dispatch(setOldClient({}));
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
        </Grid>
      }
      open={state}
      onClose={() => {}}
      closeButton={() => {
        setState(false);
        dispatch(setEditClient({}));
        dispatch(setOldClient({}));
      }}
    />
  );
};

export default EditClientDialog;
