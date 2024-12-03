import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import { setEditClient } from "../../../rtk/slices/clients-slice";
import { deleteClient } from "../../../backend/clients";

const DeleteClientDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { editClient } = clients;

  const [clientID, setClientID] = useState("");

  return (
    <CustomDialog
      title="Delete Client Confirmation"
      content={
        <Grid container gap={1}>
          <Typography variant="body1">
            Are you sure you want to delete client{" "}
            <strong>{editClient.name}</strong> with ID{" "}
            <strong>{editClient.leadId}</strong>? Deleting this client would
            only move it to the archive of clients.{" "}
            <strong>Clients never get deleted from the system.</strong> Please
            enter client id to enable deletion button.
          </Typography>
          <TextField
            size="small"
            label="Client ID"
            value={clientID}
            onChange={(e) => setClientID(e.target.value)}
          />
        </Grid>
      }
      buttons={
        <Grid container gap={1} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={async () => {
                deleteClient(editClient);
                setState(false);
                dispatch(setEditClient({}));
              }}
              disabled={Number(editClient.leadId) !== Number(clientID)}
            >
              Confirm Deletion
            </Button>
          </Grid>
        </Grid>
      }
      open={state}
      onClose={() => {}}
      closeButton={() => setState(false)}
    />
  );
};

export default DeleteClientDialog;
