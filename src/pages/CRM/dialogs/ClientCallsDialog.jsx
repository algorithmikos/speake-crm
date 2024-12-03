import React, { useEffect, useState } from "react";
import ClientCallsForm from "../forms/ClientCallsForm";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Button, Grid } from "@mui/material";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import { setEditClient, setOldClient } from "../../../rtk/slices/clients-slice";
import { updateClient } from "../../../backend/clients";

import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import UnsavedDialog from "./UnsavedDialog";
import { areArraysIdentical, compareObjects } from "../../../utils/functions";
import { LoadingButton } from "@mui/lab";
import { auth } from "../../../firebase.config";

const ClientCallsDialog = ({ state, setState, setEditClientDialog }) => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { editClient, compareClient, oldClient } = clients;

  const [calls, setCalls] = useState(null);

  useEffect(() => {
    const callsNumberSetter = () => {
      if (editClient.calls) {
        setCalls(editClient.calls.length);
      } else {
        setCalls(0);
      }
    };

    return callsNumberSetter();
  }, [editClient]);

  const [unsavedDialogState, setUnsavedDialogState] = useState(false);

  const [callsEditable, setCallsEditable] = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const [isSavingForEdit, setIsSavingForEdit] = useState(false);

  return (
    <>
      <CustomDialog
        title="Client Calls"
        content={
          <ClientCallsForm
            calls={calls}
            setCalls={setCalls}
            callsEditable={callsEditable}
            setCallsEditable={setCallsEditable}
          />
        }
        buttons={
          <Grid container gap={1} justifyContent="space-around">
            <Grid item>
              <Button
                width="100%"
                variant="contained"
                color="success"
                startIcon={<AddIcCallIcon />}
                onClick={() => {
                  dispatch(
                    setEditClient({
                      ...editClient,
                      calls: [
                        ...(editClient.calls || []),
                        {
                          date: Number(new Date()),
                          status: "call-later",
                          note: "",
                          caller: auth.currentUser.uid,
                        },
                      ],
                    })
                  );
                  setCalls(calls + 1);
                  // Add in Edit Mode
                  const index = editClient.calls?.length || 0;
                  const oldCallsEditable = [...callsEditable];
                  oldCallsEditable[index] = !oldCallsEditable[index];
                  setCallsEditable(oldCallsEditable);
                }}
              >
                Add Call
              </Button>
            </Grid>

            <Grid item>
              <LoadingButton
                loading={isSavingForEdit}
                loadingPosition="start"
                startIcon={<SaveAsIcon />}
                variant="contained"
                onClick={async () => {
                  setIsSavingForEdit(true);
                  updateClient(
                    editClient,
                    compareObjects(oldClient, editClient)
                  )
                    .then(() => {
                      setIsSavingForEdit(false);
                      setState(false);
                      setEditClientDialog(true);
                    })
                    .catch((e) => {
                      console.error(e);
                      setIsSavingForEdit(false);
                    });
                }}
                disabled={areArraysIdentical(
                  editClient.calls || [],
                  oldClient.calls || []
                )}
              >
                Save & Edit
              </LoadingButton>
            </Grid>

            <Grid item>
              <LoadingButton
                loading={isSaving}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={async () => {
                  setIsSaving(true);
                  updateClient(
                    editClient,
                    compareObjects(oldClient, editClient)
                  )
                    .then(() => {
                      setIsSaving(false);
                      setState(false);
                      dispatch(setEditClient({}));
                      dispatch(setOldClient({}));
                    })
                    .catch((e) => {
                      console.error(e);
                      setIsSaving(false);
                    });
                }}
                disabled={areArraysIdentical(
                  editClient.calls || [],
                  oldClient.calls || []
                )}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        }
        open={state}
        onClose={() => {}}
        closeButton={() => {
          if (!editClient.calls && !oldClient.calls) {
            setState(false);
            dispatch(setEditClient({}));
            dispatch(setOldClient({}));
          } else {
            if (!areArraysIdentical(editClient.calls, oldClient.calls)) {
              setUnsavedDialogState(true);
            } else {
              setState(false);
              dispatch(setEditClient({}));
              dispatch(setOldClient({}));
            }
          }
        }}
      />
      <UnsavedDialog
        state={unsavedDialogState}
        setState={setUnsavedDialogState}
        setFatherDialogState={setState}
      />
    </>
  );
};

export default ClientCallsDialog;
