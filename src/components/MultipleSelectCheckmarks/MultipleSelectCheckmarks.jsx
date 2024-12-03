import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  options,
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {options.map((option, index) => (
            <MenuItem key={option.value} value={option.value}>
              <Grid container alignItems="center" gap={0.5}>
                <Checkbox checked={value?.indexOf(option.value) > -1} />
                {option.icon}
                <ListItemText primary={option.label} />
              </Grid>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
