import React, { useState } from "react";
import NewClientForm from "../forms/NewClientForm";
import { Button, Grid, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { addNewClient } from "../../../backend/clients";
import { setNewClient } from "../../../rtk/slices/clients-slice";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import { LoadingButton } from "@mui/lab";

const NewClientDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { newClient, newClientTemp } = clients;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="New Client"
      content={<NewClientForm />}
      buttons={
        <Grid container gap={1} justifyContent="center">
          <Grid item>
            <LoadingButton
              loading={isSaving}
              loadingPosition="start"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => {
                setIsSaving(true);
                addNewClient(newClient)
                  .then((result) => {
                    if (result) {
                      setIsSaving(false);
                      dispatch(setNewClient(newClientTemp));
                      setState(false);
                    } else {
                      setIsSaving(false);
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
        </Grid>
      }
      open={state}
      onClose={() => {}}
      closeButton={() => {
        setState(false);
        dispatch(setNewClient(newClientTemp));
      }}
    />
  );
};

export default NewClientDialog;
