import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  ListSubheader,
  MenuItem,
  TextField,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupsIcon from "@mui/icons-material/Groups";
import CellTowerIcon from "@mui/icons-material/CellTower";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";

import CastConnectedIcon from "@mui/icons-material/CastConnected";
import PlaceIcon from "@mui/icons-material/Place";
import WeekendIcon from "@mui/icons-material/Weekend";

import CallEndIcon from "@mui/icons-material/CallEnd";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PhonePausedIcon from "@mui/icons-material/PhonePaused";
import PhoneLockedIcon from "@mui/icons-material/PhoneLocked";

import Face6Icon from "@mui/icons-material/Face6";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";

import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch, useSelector } from "react-redux";
import { setNewClient } from "../../../rtk/slices/clients-slice";
import TypeRenderer from "../renderers/TypeRenderer/TypeRenderer";
import {
  convertTime,
  textDir,
  useMediaQueries,
} from "../../../utils/functions";

const NewClientForm = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { newClient } = clients;

  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const campaignsStore = useSelector((state) => state.campaigns);
  const { campaigns } = campaignsStore;

  const { xs, sm, md, lg, xl } = useMediaQueries();

  const [moreProducts, setMoreProducts] = useState(false);

  return (
    <Grid container direction="column" p={1} gap={1}>
      {/* Name Field Start */}
      <Grid item>
        <TextField
          label="Name"
          name="name"
          placeholder="Client name"
          required
          fullWidth
          defaultValue={newClient.name}
          onBlur={(e) => {
            dispatch(
              setNewClient({
                ...newClient,
                name: e.target.value,
              })
            );
          }}
        />
      </Grid>
      {/* Name Field End */}

      {/* Phone Number Field Start */}
      <Grid item>
        <TextField
          label="Phone Number"
          name="phone_number"
          placeholder="Client Phone Number"
          type="tel" // Set input type to telephone
          required
          fullWidth
          defaultValue={newClient.phoneNum}
          onBlur={(e) => {
            dispatch(
              setNewClient({
                ...newClient,
                phoneNum: e.target.value,
              })
            );
          }}
        />
      </Grid>
      {/* Phone Number Field End */}

      {/* Lead Source Field Start */}
      <Grid item>
        <TextField
          label="Lead Source"
          name="lead_source"
          select
          required
          fullWidth
          inputProps={{
            className: "app-font",
          }}
          value={newClient.leadSource}
          onChange={(e) => {
            dispatch(
              setNewClient({
                ...newClient,
                leadSource: e.target.value,
              })
            );
          }}
          helperText={
            campaigns.every((campaign) => campaign.status === "finished") &&
            "Note: All campaigns are finished. There's no new i.e. active campaigns yet."
          }
        >
          {/* Facebook Ad Campaigns Start */}
          {campaigns
            .filter(
              (campaign) =>
                campaign.campaignPlatform.includes("facebook") &&
                campaign.status === "active"
            )
            ?.map((campaign) => (
              <MenuItem
                key={campaign.id}
                value={`${campaign.id}|facebook`}
                className="app-font"
                sx={{
                  direction:
                    textDir(campaign.adName) === "right" ? "rtl" : "ltr",
                }}
              >
                <FacebookIcon sx={{ color: "#1877F2", ml: 1 }} />{" "}
                {campaign.adName}
              </MenuItem>
            ))}
          {/* Facebook Ad Campaigns Start */}

          {/* Instagram Ad Campaigns Start */}
          {campaigns
            .filter(
              (campaign) =>
                campaign.campaignPlatform.includes("instagram") &&
                campaign.status === "active"
            )
            ?.map((campaign) => (
              <MenuItem
                key={campaign.id}
                value={`${campaign.id}|instagram`}
                className="app-font"
                sx={{
                  direction:
                    textDir(campaign.adName) === "right" ? "rtl" : "ltr",
                }}
              >
                <InstagramIcon sx={{ color: "#f50092", ml: 1 }} />{" "}
                {campaign.adName}
              </MenuItem>
            ))}
          {/* Instagram Ad Campaigns Start */}

          {/* WhatsApp Ad Campaigns Start */}
          {campaigns
            .filter(
              (campaign) =>
                campaign.campaignPlatform.includes("whatsapp") &&
                campaign.status === "active"
            )
            ?.map((campaign) => (
              <MenuItem
                key={campaign.id}
                value={`${campaign.id}|whatsapp`}
                className="app-font"
                sx={{
                  direction:
                    textDir(campaign.adName) === "right" ? "rtl" : "ltr",
                }}
              >
                <WhatsAppIcon sx={{ color: "#25D366", ml: 1 }} />{" "}
                {campaign.adName}
              </MenuItem>
            ))}
          {/* WhatsApp Ad Campaigns Start */}

          {/* Other Ad Campaigns Start */}
          {campaigns
            .filter(
              (campaign) =>
                campaign.campaignPlatform.includes("other") &&
                campaign.status === "active"
            )
            ?.map((campaign) => (
              <MenuItem
                key={campaign.id}
                value={campaign.id}
                className="app-font"
                sx={{
                  direction:
                    textDir(campaign.adName) === "right" ? "rtl" : "ltr",
                }}
              >
                <CellTowerIcon sx={{ ml: 1 }} /> {campaign.adName}
              </MenuItem>
            ))}
          {/* Other Ad Campaigns Start */}

          <MenuItem value="facebook" className="app-font">
            <FacebookIcon sx={{ color: "#1877F2", mr: 1 }} /> Facebook (General)
          </MenuItem>

          <MenuItem value="whatsapp" className="app-font">
            <WhatsAppIcon sx={{ color: "#25D366", mr: 1 }} /> WhatsApp (General)
          </MenuItem>

          <MenuItem value="Instagram" className="app-font">
            <InstagramIcon sx={{ color: "#f50092", mr: 1 }} /> Instagram
            (General)
          </MenuItem>

          <MenuItem value="acquaintances" className="app-font">
            <GroupsIcon sx={{ mr: 1 }} /> Acquaintances
          </MenuItem>

          <MenuItem value="other" className="app-font">
            <CellTowerIcon sx={{ mr: 1 }} /> Other
          </MenuItem>

          <MenuItem value="unknown" className="app-font">
            <DeviceUnknownIcon sx={{ mr: 1 }} /> Unknown
          </MenuItem>
        </TextField>
      </Grid>
      {/* Lead Source Field End */}

      {/* Role Field Start */}
      <Grid item>
        <TextField
          label="Role"
          name="role"
          select
          required
          fullWidth
          value={newClient.role}
          onChange={(e) => {
            dispatch(setNewClient({ ...newClient, role: e.target.value }));
          }}
        >
          <MenuItem value="student">
            <Face6Icon />
            Student
          </MenuItem>
          <MenuItem value="parent">
            <EscalatorWarningIcon /> Parent
          </MenuItem>
        </TextField>
      </Grid>
      {/* Role Field End */}

      {/* Client Area Field Start */}
      <Grid item>
        <TextField
          label="Client Area"
          name="client_area"
          placeholder="Client Area"
          fullWidth
          defaultValue={newClient.area}
          onBlur={(e) => {
            dispatch(setNewClient({ ...newClient, area: e.target.value }));
          }}
        />
      </Grid>
      {/* Client Area Field End */}

      {/* Priority Field Start */}
      <Grid item>
        <TextField
          label="Priority"
          name="priority"
          select
          required
          fullWidth
          value={newClient.priority}
          onChange={(e) => {
            dispatch(setNewClient({ ...newClient, priority: e.target.value }));
          }}
        >
          <MenuItem value="hot">
            <CircleIcon color="error" /> Hot
          </MenuItem>
          <MenuItem value="warm">
            <CircleIcon color="warning" /> Warm
          </MenuItem>
          <MenuItem value="cold">
            <CircleIcon color="info" /> Cold
          </MenuItem>
        </TextField>
      </Grid>
      {/* Priority Field End */}

      {/* Next Action Field Start */}
      <Grid item>
        <TextField
          fullWidth
          label="Next Action"
          name="next-action"
          select
          required
          value={newClient.nextAction || "call"}
          onChange={(e) => {
            dispatch(
              setNewClient({
                ...newClient,
                nextAction: e.target.value,
              })
            );
          }}
        >
          <MenuItem value="call">Call</MenuItem>
          <MenuItem value="call-again">Call Again</MenuItem>
          <MenuItem value="whatsapp-msg">Message on WhatsApp</MenuItem>
          <MenuItem value="waiting">Waiting</MenuItem>
          <MenuItem value="whatsapp-details">
            Booked, details on WhatsApp
          </MenuItem>
          <MenuItem value="convert-to-student">Covert to student</MenuItem>
          <MenuItem value="archive">Archive</MenuItem>
        </TextField>
      </Grid>
      {/* Next Action Field End */}

      {/* Client Chosen Class Field Start */}
      <Grid item>
        <TextField
          label="Class"
          name="class"
          select
          required
          fullWidth
          value={newClient.class}
          onChange={(e) => {
            dispatch(setNewClient({ ...newClient, class: e.target.value }));
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
      {/* Client Chosen Class Field End */}

      {/* Request Select Field Start */}
      <Grid item container justifyContent="start" alignItems="center" gap={1}>
        <TextField
          label="Request"
          name="request"
          select
          required
          sx={{ width: xs ? "50%" : "65%" }}
          value={newClient.request || "n/a"}
          onChange={(e) => {
            dispatch(setNewClient({ ...newClient, request: e.target.value }));
          }}
        >
          <MenuItem value="n/a">Select Request</MenuItem>
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
              value={moreProducts}
              onChange={(e) => {
                dispatch(setNewClient({ ...newClient, request: "n/a" }));
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
          value={newClient.type}
          onChange={(e) => {
            dispatch(setNewClient({ ...newClient, type: e.target.value }));
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

      {/* Notes Field Start */}
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
            direction: textDir(newClient.notes) === "right" ? "rtl" : "ltr",
          }}
          defaultValue={newClient.notes}
          onBlur={(e) => {
            dispatch(
              setNewClient({
                ...newClient,
                notes: e.target.value,
              })
            );
          }}
        />
      </Grid>
      {/* Notes Field End */}

      {/* First Call Status Select Field Start */}
      <Grid item>
        <TextField
          label="First Call Status"
          name="status"
          select
          required
          fullWidth
          value={newClient.calls?.[0]?.status || ""}
          onChange={(e) => {
            dispatch(
              setNewClient({
                ...newClient,
                calls: [
                  {
                    date: Number(new Date()),
                    status: e.target.value,
                  },
                ],
              })
            );
          }}
        >
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
      </Grid>
      {/* First Call Status Select Field End */}

      {/* First Call Note Field Start */}
      {newClient.calls && (
        <Grid item>
          <TextField
            label="First Call Note"
            name="call-notes"
            fullWidth
            multiline
            value={newClient.calls?.[0]?.note || ""}
            onChange={(e) => {
              const updatedCalls = [...newClient.calls];
              updatedCalls[0] = {
                ...updatedCalls[0],
                note: e.target.value,
              };

              dispatch(
                setNewClient({
                  ...newClient,
                  calls: updatedCalls,
                })
              );
            }}
          />
        </Grid>
      )}
      {/* First Call Note Field End */}
    </Grid>
  );
};

export default NewClientForm;
