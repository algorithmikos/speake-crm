import {
  Checkbox,
  FormControlLabel,
  Grid,
  ListSubheader,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddCouponsForm from "./AddCouponsForm";
import { useDispatch, useSelector } from "react-redux";
import { setNewSession } from "../../../rtk/slices/sessions-slice";
import { useMediaQueries } from "../../../utils/functions";
import TypeRenderer from "../../CRM/renderers/TypeRenderer/TypeRenderer";

const NewSessionForm = () => {
  const dispatch = useDispatch();
  const sessionsStore = useSelector((state) => state.sessions);
  const { newSession } = sessionsStore;

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
          value={newSession.category || ""}
          onChange={(e) => {
            const session = { ...newSession, category: e.target.value };
            dispatch(setNewSession(session));
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
                const session = { ...newSession, category: "" };
                dispatch(setNewSession(session));
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
        value={newSession.type || ""}
        onChange={(e) => {
          dispatch(setNewSession({ ...newSession, type: e.target.value }));
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
        label="Description"
        placeholder="You can leave it empty if you do not have any notes"
        fullWidth
        defaultValue={newSession.description || ""}
        onBlur={(e) => {
          const session = { ...newSession, description: e.target.value };
          dispatch(setNewSession(session));
        }}
      />
      {/* Description Field End */}

      {/* Add Coupons Field Start */}
      {newSession.type === "online" && (
        <AddCouponsForm state={newSession} setState={setNewSession} />
      )}
      {/* Add Coupons Field End */}
    </Grid>
  );
};

export default NewSessionForm;
