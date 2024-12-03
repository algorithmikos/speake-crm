import {
  Checkbox,
  FormControlLabel,
  Grid,
  ListSubheader,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditSession } from "../../../rtk/slices/sessions-slice";
import { useMediaQueries } from "../../../utils/functions";
import TypeRenderer from "../../CRM/renderers/TypeRenderer/TypeRenderer";

const EditSessionForm = () => {
  const dispatch = useDispatch();
  const sessionsStore = useSelector((state) => state.sessions);
  const { editSession } = sessionsStore;

  const [moreProducts, setMoreProducts] = useState(false);

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Grid container mt={1} gap={1}>
      {/* Category Select Field Start */}
      <Grid item container justifyContent="start" alignItems="center" gap={1}>
        <TextField
          label="Category"
          name="category"
          select
          required
          sx={{ width: xs ? "50%" : "65%" }}
          value={editSession.category || ""}
          onChange={(e) => {
            const session = { ...editSession, category: e.target.value };
            dispatch(setEditSession(session));
          }}
        >
          {moreProducts && <ListSubheader>Main Products</ListSubheader>}
          <MenuItem value="3rd-sec">3rd Sec</MenuItem>
          <MenuItem value="english-course">English Course</MenuItem>

          {moreProducts && (
            <ListSubheader>Rest of secondary School</ListSubheader>
          )}
          {moreProducts && <MenuItem value="1st-sec">1st Sec</MenuItem>}
          {moreProducts && <MenuItem value="2nd-sec">2nd Sec</MenuItem>}

          {moreProducts && <ListSubheader>Preparatory School</ListSubheader>}
          {moreProducts && <MenuItem value="1st-prep">1st Prep</MenuItem>}
          {moreProducts && <MenuItem value="2nd-prep">2nd Prep</MenuItem>}
          {moreProducts && <MenuItem value="3rd-prep">3rd Prep</MenuItem>}

          {moreProducts && <ListSubheader>Primary School</ListSubheader>}
          {moreProducts && <MenuItem value="1st-primary">1st Primary</MenuItem>}
          {moreProducts && <MenuItem value="2nd-primary">2nd Primary</MenuItem>}
          {moreProducts && <MenuItem value="3rd-primary">3rd Primary</MenuItem>}
          {moreProducts && <MenuItem value="4th-primary">4th Primary</MenuItem>}
          {moreProducts && <MenuItem value="5th-primary">5th Primary</MenuItem>}
          {moreProducts && <MenuItem value="6th-primary">6th Primary</MenuItem>}

          {moreProducts && <ListSubheader>Pre-school</ListSubheader>}
          {moreProducts && <MenuItem value="kg-1">1st Kindergarten</MenuItem>}
          {moreProducts && <MenuItem value="kg-2">2nd Kindergarten</MenuItem>}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              checked={moreProducts}
              onChange={(e) => {
                const session = { ...editSession, category: "" };
                dispatch(setEditSession(session));
                setMoreProducts(e.target.checked);
              }}
            />
          }
          label={moreProducts ? "Less options" : "More options"}
          labelPlacement="end" // Adjust label placement if needed
        />
      </Grid>
      {/* Category Select Field End */}

      {/* Type Select Field Start */}
      <TextField
        label="Type"
        name="type"
        select
        required
        fullWidth
        value={editSession.type || ""}
        onChange={(e) => {
          dispatch(setEditSession({ ...editSession, type: e.target.value }));
        }}
      >
        <MenuItem value="online">
          <TypeRenderer value="online" />
        </MenuItem>
        <MenuItem value="centre">
          <TypeRenderer value="centre" />
        </MenuItem>
        <MenuItem value="private">
          <TypeRenderer value="private" />
        </MenuItem>
      </TextField>
      {/* Type Select Field End */}

      {/* Description Field Start */}
      <TextField
        fullWidth
        multiline
        label="Description"
        defaultValue={editSession.description || ""}
        onBlur={(e) => {
          const session = { ...editSession, description: e.target.value };
          dispatch(setEditSession(session));
        }}
      />
      {/* Description Field End */}
    </Grid>
  );
};

export default EditSessionForm;
