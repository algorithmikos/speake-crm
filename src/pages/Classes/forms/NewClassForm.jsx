import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import CastConnectedIcon from "@mui/icons-material/CastConnected";
import PlaceIcon from "@mui/icons-material/Place";

import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch, useSelector } from "react-redux";
import { setNewClass } from "../../../rtk/slices/classes-slice";
import { generateUID } from "../../../utils/functions";

const NewClassForm = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes);
  const { newClass } = classes;

  useEffect(() => {
    dispatch(setNewClass({ id: generateUID(), ...newClass }));
  }, []);

  useEffect(() => {
    console.log(newClass);
  }, [newClass]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Grid container direction="column" gap={1}>
      <Grid item sx={{ width: "100%" }}>
        <FormLabel sx={{ mb: 0.5 }}>Days</FormLabel>
        <ButtonGroup fullWidth>
          {days.map((day) => (
            <Button
              key={day}
              variant={newClass.days?.includes(day) ? "contained" : "outlined"}
              onClick={() => {
                if (newClass.days) {
                  if (newClass.days?.includes(day)) {
                    const classDays = [...newClass.days].filter(
                      (selectedDay) => day !== selectedDay
                    );
                    dispatch(
                      setNewClass({
                        ...newClass,
                        days: classDays,
                      })
                    );
                  } else {
                    const classDays = [...newClass.days, day];
                    dispatch(
                      setNewClass({
                        ...newClass,
                        days: classDays,
                      })
                    );
                  }
                } else {
                  dispatch(
                    setNewClass({
                      ...newClass,
                      days: [day],
                    })
                  );
                }
              }}
            >
              {day}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>

      <Grid item container justifyContent="space-between">
        <TextField
          sx={{ width: "49%" }}
          label="Start Time"
          name="start-time"
          type="time"
          value={newClass.startTime}
          onChange={(e) => {
            dispatch(setNewClass({ ...newClass, startTime: e.target.value }));
          }}
        />

        <TextField
          sx={{ width: "49%" }}
          label="End Time"
          name="end-time"
          type="time"
          value={newClass.endTime}
          onChange={(e) => {
            dispatch(setNewClass({ ...newClass, endTime: e.target.value }));
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Place"
          name="place"
          select
          required
          fullWidth
          value={newClass.place}
          onChange={(e) => {
            dispatch(setNewClass({ ...newClass, place: e.target.value }));
          }}
        >
          <MenuItem value="n/a">Select Place</MenuItem>
          <MenuItem value="online">
            <CastConnectedIcon />
            Online
          </MenuItem>
          <MenuItem value="dokki">
            <PlaceIcon /> Dokki
          </MenuItem>
          <MenuItem value="maadi">
            <PlaceIcon /> Maadi
          </MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default NewClassForm;
