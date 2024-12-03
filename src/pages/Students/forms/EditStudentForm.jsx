import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditStudent } from "../../../rtk/slices/students-slice";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  convertTime,
  textDir,
  useMediaQueries,
} from "../../../utils/functions";

import TypeRenderer from "../../CRM/renderers/TypeRenderer/TypeRenderer";

import CastConnectedIcon from "@mui/icons-material/CastConnected";
import PlaceIcon from "@mui/icons-material/Place";
import WeekendIcon from "@mui/icons-material/Weekend";

const EditStudentForm = () => {
  const dispatch = useDispatch();
  const studentsStore = useSelector((state) => state.students);
  const { editStudent } = studentsStore;

  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const { xs, sm, md, lg, xl } = useMediaQueries();

  const [moreProducts, setMoreProducts] = useState(false);

  return (
    <Grid container direction="column" p={1} gap={1}>
      {/* Name Field */}
      <Grid item>
        <TextField
          label="Name"
          name="name"
          required
          fullWidth
          defaultValue={editStudent.name}
          onBlur={(e) => {
            dispatch(
              setEditStudent({
                ...editStudent,
                name: e.target.value,
              })
            );
          }}
        />
      </Grid>

      {/* Phone Number Field */}
      <Grid item>
        <TextField
          label="Phone Number"
          name="phone_number"
          type="tel" // Set input type to telephone
          required
          fullWidth
          defaultValue={editStudent.phoneNum}
          onBlur={(e) => {
            dispatch(
              setEditStudent({ ...editStudent, phoneNum: e.target.value })
            );
          }}
        />
      </Grid>

      {/* Area Field */}
      <Grid item>
        <TextField
          label="Client Area"
          name="client_area"
          fullWidth
          defaultValue={editStudent.area || ""}
          onBlur={(e) => {
            dispatch(setEditStudent({ ...editStudent, area: e.target.value }));
          }}
        />
      </Grid>

      {/* Class Select Field Start */}
      <Grid item>
        <TextField
          label="Class"
          name="class"
          select
          required
          fullWidth
          value={editStudent.class || ""}
          onChange={(e) => {
            dispatch(setEditStudent({ ...editStudent, class: e.target.value }));
          }}
        >
          {classes.map((sessionClass, index) => (
            <MenuItem key={sessionClass.id} value={sessionClass.id}>
              <Grid container alignItems="center" gap={0.5}>
                <Grid item>{index + 1}.</Grid>
                <Grid item>{<TypeRenderer value={sessionClass.place} />}</Grid>
                <Grid item>
                  [ <strong>{sessionClass.days.join(" - ")}</strong> ]
                </Grid>
                <Grid item>{convertTime(sessionClass.startTime)} : </Grid>
                <Grid item>{convertTime(sessionClass.endTime)}</Grid>
              </Grid>
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {/* Class Select Field End */}

      {/* Request Select Field Start */}
      <Grid item container justifyContent="start" alignItems="center" gap={1}>
        <TextField
          label="Category"
          name="category"
          select
          required
          sx={{ width: xs ? "50%" : "65%" }}
          value={editStudent.category || ""}
          onChange={(e) => {
            dispatch(
              setEditStudent({ ...editStudent, category: e.target.value })
            );
          }}
        >
          {moreProducts && <ListSubheader>Main Products</ListSubheader>}
          <MenuItem value="3rd-sec">3rd Sec</MenuItem>
          <MenuItem value="english-course">English Course</MenuItem>

          {moreProducts && (
            <ListSubheader>Rest of secondary School</ListSubheader>
          )}
          {(moreProducts || editStudent.request === "1st-sec") && (
            <MenuItem value="1st-sec">1st Sec</MenuItem>
          )}
          {(moreProducts || editStudent.request === "2nd-sec") && (
            <MenuItem value="2nd-sec">2nd Sec</MenuItem>
          )}

          {moreProducts && <ListSubheader>Preparatory School</ListSubheader>}
          {(moreProducts || editStudent.request === "1st-prep") && (
            <MenuItem value="1st-prep">1st Prep</MenuItem>
          )}
          {(moreProducts || editStudent.request === "2nd-prep") && (
            <MenuItem value="2nd-prep">2nd Prep</MenuItem>
          )}
          {(moreProducts || editStudent.request === "3rd-prep") && (
            <MenuItem value="3rd-prep">3rd Prep</MenuItem>
          )}

          {moreProducts && <ListSubheader>Primary School</ListSubheader>}
          {(moreProducts || editStudent.request === "1st-primary") && (
            <MenuItem value="1st-primary">1st Primary</MenuItem>
          )}
          {(moreProducts || editStudent.request === "2nd-primary") && (
            <MenuItem value="2nd-primary">2nd Primary</MenuItem>
          )}
          {(moreProducts || editStudent.request === "3rd-primary") && (
            <MenuItem value="3rd-primary">3rd Primary</MenuItem>
          )}
          {(moreProducts || editStudent.request === "4th-primary") && (
            <MenuItem value="4th-primary">4th Primary</MenuItem>
          )}
          {(moreProducts || editStudent.request === "5th-primary") && (
            <MenuItem value="5th-primary">5th Primary</MenuItem>
          )}
          {(moreProducts || editStudent.request === "6th-primary") && (
            <MenuItem value="6th-primary">6th Primary</MenuItem>
          )}

          {moreProducts && <ListSubheader>Pre-school</ListSubheader>}
          {(moreProducts || editStudent.request === "kg-1") && (
            <MenuItem value="kg-1">1st Kindergarten</MenuItem>
          )}
          {(moreProducts || editStudent.request === "kg-2") && (
            <MenuItem value="kg-2">2nd Kindergarten</MenuItem>
          )}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              value={moreProducts}
              onChange={(e) => {
                dispatch(setEditStudent({ ...editStudent, request: "" }));
                setMoreProducts(e.target.checked);
              }}
            />
          }
          label={moreProducts ? "Less options" : "More options"}
          labelPlacement="end" // Adjust label placement if needed
        />
      </Grid>
      {/* Request Select Field End */}

      {/* Type Select Field Start */}
      <Grid item>
        <TextField
          label="Type"
          name="type"
          select
          required
          fullWidth
          value={editStudent.type || ""}
          onChange={(e) => {
            dispatch(setEditStudent({ ...editStudent, type: e.target.value }));
          }}
        >
          <MenuItem value="online">
            <CastConnectedIcon sx={{ mr: 1 }} />
            Online
          </MenuItem>

          <MenuItem value="centre">
            <PlaceIcon sx={{ mr: 1 }} /> Centre
          </MenuItem>

          <MenuItem value="private">
            <WeekendIcon sx={{ mr: 1 }} /> Private
          </MenuItem>
        </TextField>
      </Grid>
      {/* Type Select Field End */}

      {/* Note Field Start */}
      <Grid item>
        <TextField
          label="Notes"
          name="notes"
          fullWidth
          multiline
          minRows={3}
          inputProps={{
            className: "app-font",
          }}
          sx={{
            direction: textDir(editStudent.notes) === "right" ? "rtl" : "ltr",
          }}
          defaultValue={editStudent.notes || ""}
          onBlur={(e) => {
            dispatch(
              setEditStudent({
                ...editStudent,
                notes: e.target.value,
              })
            );
          }}
        />
      </Grid>
      {/* Note Field Start */}
    </Grid>
  );
};

export default EditStudentForm;
