import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../../../components/Dialog/CustomDialog";

import NewCampaignForm from "../forms/NewCampaignForm";
import { setNewCampaign } from "../../../rtk/slices/campaigns-slice";
import { createCampaign } from "../../../backend/campaigns";
import { LoadingButton } from "@mui/lab";

const NewCampaignDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const campaigns = useSelector((state) => state.campaigns);
  const { newCampaign, newCampaignTemp } = campaigns;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="New Campaign"
      content={<NewCampaignForm />}
      buttons={
        <Grid container gap={1} justifyContent="center">
          <Grid item>
            <LoadingButton
              variant="contained"
              loading={isSaving}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              onClick={() => {
                setIsSaving(true);
                createCampaign(newCampaign)
                  .then((campaign) => {
                    setIsSaving(false);
                    if (campaign === 2) {
                      dispatch(setNewCampaign(newCampaignTemp));
                      setState(false);
                    }
                  })
                  .catch((e) => {
                    console.warn(e);
                    setIsSaving(false);
                  });
              }}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      }
      open={state}
      onClose={() => {}}
      closeButton={() => {
        setState(false);
        dispatch(setNewCampaign(newCampaignTemp));
      }}
    />
  );
};

export default NewCampaignDialog;
