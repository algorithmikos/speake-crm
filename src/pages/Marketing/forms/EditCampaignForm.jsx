import React, { useEffect } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setEditCampaign } from "../../../rtk/slices/campaigns-slice";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CellTowerIcon from "@mui/icons-material/CellTower";
import MultipleSelectCheckmarks from "../../../components/MultipleSelectCheckmarks/MultipleSelectCheckmarks";

const EditCampaignForm = () => {
  const dispatch = useDispatch();
  const campaigns = useSelector((state) => state.campaigns);
  const { editCampaign } = campaigns;

  useEffect(() => {
    console.log(editCampaign);
  }, [editCampaign]);

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
          value={editCampaign.campaignPlatform || []}
          onChange={(e) => {
            const value = e.target.value;
            dispatch(
              setEditCampaign({
                ...editCampaign,
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
          defaultValue={editCampaign.platformAdId}
          onBlur={(e) => {
            dispatch(
              setEditCampaign({ ...editCampaign, platformAdId: e.target.value })
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
          defaultValue={editCampaign.adName}
          onBlur={(e) => {
            dispatch(
              setEditCampaign({ ...editCampaign, adName: e.target.value })
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
          defaultValue={editCampaign.adDescription}
          onBlur={(e) => {
            dispatch(
              setEditCampaign({
                ...editCampaign,
                adDescription: e.target.value,
              })
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
          value={editCampaign.status}
          onChange={(e) => {
            dispatch(
              setEditCampaign({ ...editCampaign, status: e.target.value })
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

export default EditCampaignForm;
