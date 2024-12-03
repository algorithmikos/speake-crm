import React, { useState } from "react";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import CustomDialog from "../../../components/Dialog/CustomDialog";

import EditCampaignForm from "../forms/EditCampaignForm";
import { setEditCampaign } from "../../../rtk/slices/campaigns-slice";
import { updateCampaign } from "../../../backend/campaigns";

const EditCampaignDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const campaignsStore = useSelector((state) => state.campaigns);
  const { campaigns, editCampaign } = campaignsStore;

  const [isSaving, setIsSaving] = useState(false);

  return (
    <CustomDialog
      title="Edit Campaign"
      content={<EditCampaignForm />}
      buttons={
        <Grid container gap={1} justifyContent="center">
          <Grid item>
            <LoadingButton
              loading={isSaving}
              loadingPosition="start"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={async () => {
                setIsSaving(true);

                const updatedCampaigns = [...campaigns].map((campaign) => {
                  if (campaign.id === editCampaign.id) {
                    return editCampaign;
                  } else {
                    return campaign;
                  }
                });

                updateCampaign(editCampaign, updatedCampaigns)
                  .then((campaign) => {
                    if (campaign === 2) {
                      setIsSaving(false);
                      dispatch(setEditCampaign({}));
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
        dispatch(setEditCampaign({}));
      }}
    />
  );
};

export default EditCampaignDialog;
