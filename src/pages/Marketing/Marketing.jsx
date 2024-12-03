import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Tooltip,
} from "@mui/material";

import NewCampaignDialog from "./dialogs/NewCampaignDialog";
import { setEditCampaign } from "../../rtk/slices/campaigns-slice";
import EditCampaignDialog from "./dialogs/EditCampaignDialog";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQueries } from "../../utils/functions";
import LeadSourceRenderer from "../CRM/renderers/LeadSourceRenderer/LeadSourceRenderer";
import StatusRenderer from "./renderers/StatusRenderer";

import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const Marketing = () => {
  const dispatch = useDispatch();
  const campaignsStore = useSelector((state) => state.campaigns);
  const { campaigns } = campaignsStore;

  const [newCampaignDialog, setNewCampaignDialog] = useState(false);
  const [editCampaignDialog, setEditCampaignDialog] = useState(false);

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Paper elevation={0} sx={{ mt: 10 }}>
      <Grid
        container
        direction="column"
        gap={1}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="outlined"
          startIcon={<AddBusinessIcon />}
          onClick={() => {
            setNewCampaignDialog(true);
          }}
        >
          New Ad Campaign
        </Button>

        <Grid item container gap={1} justifyContent="center">
          {/* Table View */}
          {!xs && (
            <DataGrid
              checkboxSelection
              disableRowSelectionOnClick
              rows={campaigns}
              columns={[
                // Campaign Name
                {
                  field: "adName",
                  headerName: "Campaign Name",
                  width: 225,
                  renderCell: (params) => (
                    <Grid container alignItems="center">
                      <Tooltip
                        title={params.row.status}
                        arrow
                        placement="right"
                      >
                        <StatusRenderer
                          value={params.row.status}
                          mr={1}
                          fontSize="small"
                        />
                        {params.value}
                      </Tooltip>
                    </Grid>
                  ),
                },
                // Campaign Platform
                {
                  field: "campaignPlatform",
                  headerName: "Platform(s)",
                  width: 300,
                  renderCell: (params) => (
                    <Grid container gap={1} overflow="clip">
                      {params.value?.map((platform) => (
                        <LeadSourceRenderer value={platform} isCard />
                      ))}
                    </Grid>
                  ),
                },
                // Platform Ad Id
                {
                  field: "platformAdId",
                  headerName: "Platform Ad Id",
                  width: 150,
                },
                // Actions
                {
                  field: "actions",
                  headerName: "Actions",
                  width: 150,
                  renderCell: (params) => (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        dispatch(setEditCampaign(params.row));
                        setEditCampaignDialog(true);
                      }}
                    >
                      Edit Campaign
                    </Button>
                  ),
                },
              ]}
            />
          )}

          {/* Cards View */}
          {xs &&
            campaigns.map((campaign, index) => (
              <Card key={campaign.id} elevation={5} sx={{ width: 290 }}>
                <CardHeader
                  title={campaign.adName}
                  titleTypographyProps={{ className: "app-font" }}
                />
                <Divider />
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch(setEditCampaign(campaign));
                      setEditCampaignDialog(true);
                    }}
                  >
                    Edit Campaign
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Grid>
      </Grid>

      <NewCampaignDialog
        state={newCampaignDialog}
        setState={setNewCampaignDialog}
      />
      <EditCampaignDialog
        state={editCampaignDialog}
        setState={setEditCampaignDialog}
      />
    </Paper>
  );
};

export default Marketing;
