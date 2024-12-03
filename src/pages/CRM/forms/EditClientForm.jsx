import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  ListSubheader,
  MenuItem,
  TextField,
} from "@mui/material";

import CastConnectedIcon from "@mui/icons-material/CastConnected";
import PlaceIcon from "@mui/icons-material/Place";
import WeekendIcon from "@mui/icons-material/Weekend";

import CircleIcon from "@mui/icons-material/Circle";

import Face6Icon from "@mui/icons-material/Face6";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GroupsIcon from "@mui/icons-material/Groups";
import CellTowerIcon from "@mui/icons-material/CellTower";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";

import { useDispatch, useSelector } from "react-redux";
import { setEditClient } from "../../../rtk/slices/clients-slice";
import TypeRenderer from "../renderers/TypeRenderer/TypeRenderer";
import {
  convertTime,
  textDir,
  useMediaQueries,
} from "../../../utils/functions";

const EditClientForm = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { editClient } = clients;

  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const campaignsStore = useSelector((state) => state.campaigns);
  const { campaigns } = campaignsStore;

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
          defaultValue={editClient.name}
          onBlur={(e) => {
            dispatch(
              setEditClient({
                ...editClient,
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
          defaultValue={editClient.phoneNum}
          onBlur={(e) => {
            dispatch(
              setEditClient({ ...editClient, phoneNum: e.target.value })
            );
          }}
        />
      </Grid>

      {/* Lead Source Field */}
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
          value={editClient.leadSource || ""}
          onChange={(e) => {
            dispatch(
              setEditClient({
                ...editClient,
                leadSource: e.target.value,
              })
            );
          }}
        >
          {/* The Current Selected Option */}
          {campaigns
            .filter(
              (campaign) =>
                editClient.leadSource?.includes(campaign.id) &&
                campaign.status !== "active"
            )
            ?.map((campaign) => (
              <MenuItem
                key={campaign.id}
                value={editClient.leadSource}
                className="app-font"
                sx={{
                  direction:
                    textDir(campaign.adName) === "right" ? "rtl" : "ltr",
                }}
              >
                {campaign.adName}
              </MenuItem>
            ))}
          {/* The Current Selected Option */}

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

          <MenuItem value="instagram" className="app-font">
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

      {/* Role Field */}
      <Grid item>
        <TextField
          label="Role"
          name="role"
          select
          required
          fullWidth
          value={editClient.role || ""}
          onChange={(e) => {
            dispatch(setEditClient({ ...editClient, role: e.target.value }));
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

      {/* Area Field */}
      <Grid item>
        <TextField
          label="Client Area"
          name="client_area"
          fullWidth
          defaultValue={editClient.area || ""}
          onBlur={(e) => {
            dispatch(setEditClient({ ...editClient, area: e.target.value }));
          }}
        />
      </Grid>

      {/* Priority Field */}
      <Grid item>
        <TextField
          label="Priority"
          name="priority"
          select
          required
          fullWidth
          value={editClient.priority}
          onChange={(e) => {
            dispatch(
              setEditClient({ ...editClient, priority: e.target.value })
            );
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

      {/* Next Action Field Start */}
      <TextField
        fullWidth
        label="Next Action"
        name="next-action"
        select
        required
        value={editClient.nextAction || ""}
        onChange={(e) => {
          dispatch(
            setEditClient({
              ...editClient,
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
      {/* Next Action Field End */}

      {/* Class Select Field Start */}
      <Grid item>
        <TextField
          label="Class"
          name="class"
          select
          required
          fullWidth
          value={editClient.class || ""}
          onChange={(e) => {
            dispatch(setEditClient({ ...editClient, class: e.target.value }));
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
          label="Request"
          name="request"
          select
          required
          sx={{ width: xs ? "50%" : "65%" }}
          value={editClient.request || ""}
          onChange={(e) => {
            dispatch(setEditClient({ ...editClient, request: e.target.value }));
          }}
        >
          <MenuItem value="n/a">Select Request</MenuItem>
          {moreProducts && <ListSubheader>Main Products</ListSubheader>}
          <MenuItem value="3rd-sec">3rd Sec</MenuItem>
          <MenuItem value="english-course">English Course</MenuItem>

          {moreProducts && (
            <ListSubheader>Rest of secondary School</ListSubheader>
          )}
          {(moreProducts || editClient.request === "1st-sec") && (
            <MenuItem value="1st-sec">1st Sec</MenuItem>
          )}
          {(moreProducts || editClient.request === "2nd-sec") && (
            <MenuItem value="2nd-sec">2nd Sec</MenuItem>
          )}

          {moreProducts && <ListSubheader>Preparatory School</ListSubheader>}
          {(moreProducts || editClient.request === "1st-prep") && (
            <MenuItem value="1st-prep">1st Prep</MenuItem>
          )}
          {(moreProducts || editClient.request === "2nd-prep") && (
            <MenuItem value="2nd-prep">2nd Prep</MenuItem>
          )}
          {(moreProducts || editClient.request === "3rd-prep") && (
            <MenuItem value="3rd-prep">3rd Prep</MenuItem>
          )}

          {moreProducts && <ListSubheader>Primary School</ListSubheader>}
          {(moreProducts || editClient.request === "1st-primary") && (
            <MenuItem value="1st-primary">1st Primary</MenuItem>
          )}
          {(moreProducts || editClient.request === "2nd-primary") && (
            <MenuItem value="2nd-primary">2nd Primary</MenuItem>
          )}
          {(moreProducts || editClient.request === "3rd-primary") && (
            <MenuItem value="3rd-primary">3rd Primary</MenuItem>
          )}
          {(moreProducts || editClient.request === "4th-primary") && (
            <MenuItem value="4th-primary">4th Primary</MenuItem>
          )}
          {(moreProducts || editClient.request === "5th-primary") && (
            <MenuItem value="5th-primary">5th Primary</MenuItem>
          )}
          {(moreProducts || editClient.request === "6th-primary") && (
            <MenuItem value="6th-primary">6th Primary</MenuItem>
          )}

          {moreProducts && <ListSubheader>Pre-school</ListSubheader>}
          {(moreProducts || editClient.request === "kg-1") && (
            <MenuItem value="kg-1">1st Kindergarten</MenuItem>
          )}
          {(moreProducts || editClient.request === "kg-2") && (
            <MenuItem value="kg-2">2nd Kindergarten</MenuItem>
          )}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              value={moreProducts}
              onChange={(e) => {
                dispatch(setEditClient({ ...editClient, request: "n/a" }));
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
          value={editClient.type || ""}
          onChange={(e) => {
            dispatch(setEditClient({ ...editClient, type: e.target.value }));
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
            direction: textDir(editClient.notes) === "right" ? "rtl" : "ltr",
          }}
          defaultValue={editClient.notes || ""}
          onBlur={(e) => {
            dispatch(
              setEditClient({
                ...editClient,
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

export default EditClientForm;
