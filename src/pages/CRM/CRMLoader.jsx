import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { ButtonGroup, IconButton, Skeleton, Tooltip } from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CRMLoader = () => {
  const columns = [
    {
      field: "leadId",
      headerName: "ID",
      width: 40,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "phoneNum",
      headerName: "Tel No.",
      sortable: false,
      width: 105,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "area",
      headerName: "Area",
      sortable: false,
      width: 90,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "leadSource",
      headerName: "Source",
      sortable: false,
      width: 60,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "calls",
      headerName: "Calls",
      sortable: false,
      width: 60,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 100,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 70,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "class",
      headerName: (
        <>
          Class
          <Tooltip title="Client Chosen Class" placement="top" arrow>
            <HelpOutlineIcon
              fontSize="small"
              sx={{ ml: 0.5, mb: 0.3, color: "grey" }}
            />
          </Tooltip>
        </>
      ),
      sortable: false,
      width: 100,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "type",
      headerName: "Type",
      sortable: false,
      width: 90,
      renderCell: () => <Skeleton animation="wave" />,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 110,
      renderCell: (params) => (
        <ButtonGroup sx={{ mt: 1.5 }}>
          <IconButton size="small" sx={{ color: "black" }}>
            <Tooltip title="Make a call">
              <PhoneEnabledIcon fontSize="inherit" />
            </Tooltip>
          </IconButton>
          <IconButton size="small">
            <Tooltip title="Start a conversation">
              <WhatsAppIcon fontSize="inherit" sx={{ color: "#25D366" }} />
            </Tooltip>
          </IconButton>
          <IconButton size="small" sx={{ color: "black" }}>
            <Tooltip title="Copy number">
              <ContentCopyIcon fontSize="inherit" />
            </Tooltip>
          </IconButton>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={Array(5).fill({ id: 0 })}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default CRMLoader;
