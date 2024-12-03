import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import CallEndIcon from "@mui/icons-material/CallEnd";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import PhoneLockedIcon from "@mui/icons-material/PhoneLocked";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import { setEditClient } from "../../../rtk/slices/clients-slice";
import EmptyBox from "../../../components/Icons/EmptyBox";
import {
  formatDateForTextField,
  formatDateWithTimeOrdinal,
  useMediaQueries,
} from "../../../utils/functions";
import StatusRenderer from "../renderers/StatusRenderer/StatusRenderer";

const ClientCallsForm = ({
  calls,
  setCalls,
  callsEditable,
  setCallsEditable,
}) => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { editClient } = clients;

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Grid container direction="column" p={1} gap={1}>
      {/* Calls Section */}
      <Grid item container justifyContent="center" gap={2}>
        {calls ? (
          editClient.calls?.map((call, index) => (
            <Card
              key={call.id}
              variant="elevation"
              elevation={5}
              sx={{ width: xs ? 330 : 250 }}
            >
              <CardHeader
                title={
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>Call {index + 1}</Grid>
                    <Grid item sx={{ fontSize: 15 }}>
                      <Alert icon={false} severity="warning">
                        <StatusRenderer value={call.status} />
                      </Alert>
                    </Grid>
                  </Grid>
                }
              />
              <Divider />
              <CardContent>
                <Grid container direction="column" gap={1}>
                  {!callsEditable[index] ? (
                    <>
                      <Typography variant="body2">
                        {formatDateWithTimeOrdinal(new Date(call.date))}
                      </Typography>
                      {call.note && (
                        <Alert
                          severity="info"
                          icon={false}
                          sx={{ direction: "rtl" }}
                        >
                          {call.note}
                        </Alert>
                      )}
                    </>
                  ) : (
                    <>
                      <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        size="small"
                        type="datetime-local"
                        value={formatDateForTextField(call.date) || null}
                        onChange={(e) => {
                          const updatedCalls = [...editClient.calls];
                          const matchingCallIndex = updatedCalls.findIndex(
                            (oldCall) => oldCall.date === call.date
                          );

                          updatedCalls[matchingCallIndex] = {
                            ...updatedCalls[matchingCallIndex],
                            date: e.target.value,
                          };

                          dispatch(
                            setEditClient({
                              ...editClient,
                              calls: updatedCalls,
                            })
                          );
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Status"
                        name="status"
                        size="small"
                        select
                        required
                        value={call.status}
                        onChange={(e) => {
                          const updatedCalls = [...editClient.calls];
                          const matchingCallIndex = updatedCalls.findIndex(
                            (oldCall) => oldCall.date === call.date
                          );

                          updatedCalls[matchingCallIndex] = {
                            ...updatedCalls[matchingCallIndex],
                            status: e.target.value,
                          };

                          dispatch(
                            setEditClient({
                              ...editClient,
                              calls: updatedCalls,
                            })
                          );
                        }}
                      >
                        <MenuItem value="n/a" disabled>
                          Select Status
                        </MenuItem>
                        <MenuItem value="called">
                          <CallEndIcon /> Called
                        </MenuItem>
                        <MenuItem value="call-later">
                          <AddIcCallIcon /> Call Later
                        </MenuItem>
                        <MenuItem value="booked">
                          <BeenhereIcon /> Booked
                        </MenuItem>
                        <MenuItem value="done">
                          <DoneAllIcon /> Done
                        </MenuItem>
                        <MenuItem value="no-answer">
                          <PhonePausedIcon /> No Answer
                        </MenuItem>
                        <MenuItem value="phone-closed">
                          <PhoneLockedIcon /> Phone Closed
                        </MenuItem>
                      </TextField>

                      <TextField
                        fullWidth
                        label="Reminder"
                        name="reminder"
                        size="small"
                        type="datetime-local"
                        value={formatDateForTextField(call.reminder) || null}
                        onChange={(e) => {
                          const updatedCalls = [...editClient.calls];
                          const matchingCallIndex = updatedCalls.findIndex(
                            (oldCall) => oldCall.date === call.date
                          );

                          updatedCalls[matchingCallIndex] = {
                            ...updatedCalls[matchingCallIndex],
                            reminder: e.target.value,
                          };

                          dispatch(
                            setEditClient({
                              ...editClient,
                              calls: updatedCalls,
                            })
                          );
                        }}
                      />

                      <TextField
                        inputProps={{
                          className: "app-font",
                        }}
                        dir="rtl"
                        fullWidth
                        label="Note"
                        name="note"
                        size="small"
                        multiline
                        minRows={3}
                        defaultValue={call.note || ""}
                        onBlur={(e) => {
                          const updatedCalls = [...editClient.calls];
                          const matchingCallIndex = updatedCalls.findIndex(
                            (oldCall) => oldCall.date === call.date
                          );

                          updatedCalls[matchingCallIndex] = {
                            ...updatedCalls[matchingCallIndex],
                            note: e.target.value,
                          };

                          dispatch(
                            setEditClient({
                              ...editClient,
                              calls: updatedCalls,
                            })
                          );
                        }}
                      />
                    </>
                  )}
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Grid container justifyContent="space-evenly">
                  <IconButton
                    color="info"
                    onClick={() => {
                      const oldCallsEditable = [...callsEditable];
                      oldCallsEditable[index] = !oldCallsEditable[index];
                      setCallsEditable(oldCallsEditable);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error">
                    <DeleteIcon
                      onClick={() => {
                        const updatedCalls = editClient.calls?.filter(
                          (oldCall) => oldCall.date !== call.date
                        );
                        dispatch(
                          setEditClient({
                            ...editClient,
                            calls: updatedCalls,
                          })
                        );

                        const updatedCallsEditable = [...callsEditable];
                        updatedCallsEditable.splice(index, 1);
                        setCallsEditable(updatedCallsEditable);

                        setCalls(calls - 1);
                      }}
                    />
                  </IconButton>
                </Grid>
              </CardActions>
            </Card>
          ))
        ) : (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <EmptyBox width={150} height={150} />

            <Alert severity="info">No calls yet made to that client!</Alert>
          </Grid>
        )}
      </Grid>
      {/* End of Calls Section */}
    </Grid>
  );
};

export default ClientCallsForm;
