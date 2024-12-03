import React, { useEffect, useState } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { generateUID } from "../../../utils/functions";

import { setNewCampaign } from "../../../rtk/slices/campaigns-slice";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CellTowerIcon from "@mui/icons-material/CellTower";
import MultipleSelectCheckmarks from "../../../components/MultipleSelectCheckmarks/MultipleSelectCheckmarks";

const NewCampaignForm = () => {
  const dispatch = useDispatch();
  const campaigns = useSelector((state) => state.campaigns);
  const { newCampaign } = campaigns;

  useEffect(() => {
    dispatch(setNewCampaign({ ...newCampaign, id: generateUID() }));
  }, []);

  useEffect(() => {
    console.log(newCampaign);
  }, [newCampaign]);

  return (
    <Grid container direction="column" gap={1} sx={{ mt: 1 }}>
      <Grid item>
        <MultipleSelectCheckmarks
          options={[
            {
              value: "facebook",
              label: "Facebook",
              icon: <FacebookIcon sx={{ color: "#1877F2" }} />,
            },
            {
              value: "instagram",
              label: "Instagram",
              icon: <InstagramIcon sx={{ color: "#f50092" }} />,
            },
            {
              value: "whatsapp",
              label: "WhatsApp",
              icon: <WhatsAppIcon sx={{ color: "#25D366" }} />,
            },
            {
              value: "other",
              label: "Other",
              icon: <CellTowerIcon />,
            },
          ]}
          label="Campaign Platform"
          value={newCampaign.campaignPlatform || []}
          onChange={(e) => {
            const value = e.target.value;
            dispatch(
              setNewCampaign({
                ...newCampaign,
                campaignPlatform:
                  typeof value === "string" ? value.split(",") : value,
              })
            );
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          label="Platform Ad Id"
          name="platform-ad-id"
          inputProps={{ className: "app-font" }}
          placeholder="Leave empty if doesn't exist"
          defaultValue={newCampaign.platformAdId}
          onBlur={(e) => {
            dispatch(
              setNewCampaign({ ...newCampaign, platformAdId: e.target.value })
            );
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          label="Ad Name"
          name="ad-name"
          inputProps={{ className: "app-font" }}
          defaultValue={newCampaign.adName}
          onBlur={(e) => {
            dispatch(
              setNewCampaign({ ...newCampaign, adName: e.target.value })
            );
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          fullWidth
          label="Ad Description"
          name="ad-description"
          inputProps={{ className: "app-font" }}
          defaultValue={newCampaign.adDescription}
          onBlur={(e) => {
            dispatch(
              setNewCampaign({ ...newCampaign, adDescription: e.target.value })
            );
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          label="Status"
          name="status"
          select
          required
          fullWidth
          value={newCampaign.status}
          onChange={(e) => {
            dispatch(
              setNewCampaign({ ...newCampaign, status: e.target.value })
            );
          }}
        >
          <MenuItem value="n/a">Select Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="on-hold">On-hold</MenuItem>
          <MenuItem value="finished">Finished</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default NewCampaignForm;
