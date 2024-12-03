import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsArchiveIncluded } from "../../rtk/slices/clients-slice";

import { Checkbox, FormControlLabel } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

const ArchiveOption = () => {
  const dispatch = useDispatch();
  const clientsStore = useSelector((state) => state.clients);
  const { isArchiveIncluded } = clientsStore;

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isArchiveIncluded}
          onChange={(e) => dispatch(setIsArchiveIncluded(e.target.checked))}
        />
      }
      label={
        <span>
          <InventoryIcon
            sx={{ ml: -0.75, mr: 0.25 }}
            color={isArchiveIncluded ? "secondary" : "action"}
          />
          {isArchiveIncluded ? "Exclude Archive?" : "Include Archive?"}
        </span>
      }
      labelPlacement="end"
    />
  );
};

export default ArchiveOption;
