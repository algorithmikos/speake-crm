import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClientFilterSection,
  setClientFilterParams,
} from "../../../rtk/slices/filters-slice";

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  Grid,
  Grow,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Slide,
  TextField,
} from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import LeadSourceRenderer from "../renderers/LeadSourceRenderer/LeadSourceRenderer";
import StatusRenderer from "../renderers/StatusRenderer/StatusRenderer";
import PriorityRenderer from "../renderers/PriorityRenderer/PriorityRenderer";
import TypeRenderer from "../renderers/TypeRenderer/TypeRenderer";
import { useMediaQueries } from "../../../utils/functions";
import CustomDialog from "../../../components/Dialog/CustomDialog";

const Filters = () => {
  const dispatch = useDispatch();
  const filtersStore = useSelector((state) => state.filters);
  const { clientFilterSection, clientFilterParams } = filtersStore;

  const campaignsStore = useSelector((state) => state.campaigns);
  const { campaigns } = campaignsStore;

  const SelectableFilter = ({
    filterName,
    filterLabel,
    options,
    renderedOptions,
  }) => {
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
    return (
      <FormControl fullWidth>
        <InputLabel
          size="small"
          id="demo-multiple-name-label"
          className="app-font"
        >
          {filterLabel}
        </InputLabel>
        <Select
          size="small"
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={clientFilterParams[filterName]}
          onChange={(e) => {
            let previousFilterParams = { ...clientFilterParams };
            let previousArray = [...previousFilterParams[filterName]];

            previousArray =
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value;
            previousFilterParams[filterName] = previousArray;

            dispatch(setClientFilterParams(previousFilterParams));
          }}
          input={<OutlinedInput label={filterName} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={renderedOptions[options.indexOf(value)]}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          inputProps={{ className: "app-font" }}
        >
          {options.map((option, index) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={clientFilterParams[filterName].indexOf(option) > -1}
              />
              <ListItemText
                primary={renderedOptions[index]}
                primaryTypographyProps={{ className: "app-font" }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const DateFilter = () => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <TextField
          sx={{ width: "49%" }}
          size="small"
          label="Start Date"
          type="date"
          value={clientFilterParams.startDate}
          onChange={(e) => {
            const previousFilterParams = { ...clientFilterParams };
            previousFilterParams.startDate = e.target.value;

            dispatch(setClientFilterParams(previousFilterParams));
          }}
        />

        <TextField
          sx={{ width: "49%" }}
          size="small"
          label="End Date"
          type="date"
          value={clientFilterParams.endDate}
          onChange={(e) => {
            const previousFilterParams = { ...clientFilterParams };
            previousFilterParams.endDate = e.target.value;

            dispatch(setClientFilterParams(previousFilterParams));
          }}
        />
      </Grid>
    );
  };

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <>
      <Grid item container justifyContent="center">
        <ButtonGroup fullWidth={xs}>
          <Button
            variant="contained"
            onClick={() =>
              dispatch(setClientFilterSection(!clientFilterSection))
            }
            startIcon={<TuneIcon />}
          >
            Filters
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<FilterListOffIcon />}
            onClick={() =>
              dispatch(
                setClientFilterParams({
                  leadSource: [],
                  status: [],
                  nextAction: [],
                  priority: [],
                  type: [],
                  startDate: "",
                  endDate: "",
                  calls: "",
                })
              )
            }
            disabled={
              !clientFilterParams.leadSource.length &&
              !clientFilterParams.status.length &&
              !clientFilterParams.nextAction.length &&
              !clientFilterParams.priority.length &&
              !clientFilterParams.type.length &&
              clientFilterParams.startDate === "" &&
              clientFilterParams.endDate === "" &&
              clientFilterParams.calls === ""
            }
          >
            Reset
          </Button>
        </ButtonGroup>
      </Grid>

      <CustomDialog
        title={
          <>
            <TuneIcon sx={{ mr: 1 }} /> Change Filters
          </>
        }
        content={
          <Grid container gap={0.5} sx={{ p: 1 }}>
            <SelectableFilter
              filterName="leadSource"
              filterLabel="Lead Source"
              options={[
                ...campaigns
                  .filter((campaign) => campaign.status === "active")
                  .map((campaign) => campaign.id),
                "facebook",
                "instagram",
                "whatsapp",
                "other",
                "",
              ]}
              renderedOptions={[
                ...campaigns
                  .filter((campaign) => campaign.status === "active")
                  .map((campaign) => campaign.adName),
                <Grid container>
                  <LeadSourceRenderer value="facebook" />
                  Facebook
                </Grid>,
                <Grid container>
                  <LeadSourceRenderer value="instagram" />
                  Instagram
                </Grid>,
                <Grid container>
                  <LeadSourceRenderer value="whatsapp" />
                  WhatsApp
                </Grid>,
                <Grid container>
                  <LeadSourceRenderer value="other" />
                  Other
                </Grid>,
                <Grid container>
                  <LeadSourceRenderer value="" />
                  Unknown
                </Grid>,
              ]}
            />

            <SelectableFilter
              filterName="status"
              filterLabel="Call Status"
              options={[
                "",
                "called",
                "call-later",
                "no-answer",
                "booked",
                "done",
                "phone-closed",
              ]}
              renderedOptions={[
                <StatusRenderer value="" />,
                <StatusRenderer value="called" />,
                <StatusRenderer value="call-later" />,
                <StatusRenderer value="no-answer" />,
                <StatusRenderer value="booked" />,
                <StatusRenderer value="done" />,
                <StatusRenderer value="phone-closed" />,
              ]}
            />

            <SelectableFilter
              filterName="nextAction"
              filterLabel="Next Action"
              options={[
                "",
                "call",
                "call-again",
                "whatsapp-msg",
                "waiting",
                "whatsapp-details",
                "convert-to-student",
                "archive",
              ]}
              renderedOptions={[
                "None",
                "Call",
                "Call Again",
                "Message on WhatsApp",
                "Waiting",
                "Booked, details on WhatsApp",
                "Convert to student",
                "Archive",
              ]}
            />

            <SelectableFilter
              filterName="priority"
              filterLabel="Priority"
              options={["hot", "warm", "cold"]}
              renderedOptions={[
                <>
                  <PriorityRenderer value="hot" /> Hot
                </>,
                <>
                  <PriorityRenderer value="warm" /> Warm
                </>,
                <>
                  <PriorityRenderer value="cold" /> Cold
                </>,
              ]}
            />

            <SelectableFilter
              filterName="type"
              filterLabel="Type"
              options={["online", "centre", "private"]}
              renderedOptions={[
                <TypeRenderer value="online" />,
                <TypeRenderer value="centre" />,
                <TypeRenderer value="private" />,
              ]}
            />

            <DateFilter />

            <TextField
              size="small"
              label="Calls No."
              fullWidth
              value={clientFilterParams.calls}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  const previousFilterParams = { ...clientFilterParams };
                  previousFilterParams.calls = e.target.value;

                  dispatch(setClientFilterParams(previousFilterParams));
                }
              }}
            />
          </Grid>
        }
        open={clientFilterSection}
        closeButton={() => dispatch(setClientFilterSection(false))}
      />
    </>
  );
};

export default Filters;
