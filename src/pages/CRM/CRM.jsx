import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClients,
  setCompareClient,
  setEditClient,
  setSelectedClients,
} from "../../rtk/slices/clients-slice";

import {
  convertTime,
  copyToClipboard,
  formatDateWithTimeOrdinal,
  openWhatsAppChat,
  triggerCall,
  useMediaQueries,
} from "../../utils/functions";

import { formatPhoneNumber } from "../../utils/dataCleaning";

import "./CRM.css";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../components/Overlays/NoRowsOverlay";
import {
  Alert,
  AppBar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";

import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import MouseIcon from "@mui/icons-material/Mouse";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NewClientDialog from "./dialogs/NewClientDialog";
import TtyIcon from "@mui/icons-material/Tty";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";

import EditClientDialog from "./dialogs/EditClientDialog";
import LeadSourceRenderer from "./renderers/LeadSourceRenderer/LeadSourceRenderer";
import StatusRenderer from "./renderers/StatusRenderer/StatusRenderer";
import PriorityRenderer from "./renderers/PriorityRenderer/PriorityRenderer";

import DeleteClientDialog from "./dialogs/DeleteClientDialog";
import TypeRenderer from "./renderers/TypeRenderer/TypeRenderer";

import ClientCallsDialog from "./dialogs/ClientCallsDialog";
import SplitButton from "../../components/SplitButton/SplitButton";
import MobileCRM from "./MobileCRM";
import CRMLoader from "./CRMLoader";
import RoleRenderer from "./renderers/RoleRenderer/RoleRenderer";
import ArchiveOption from "../../components/Archive/ArchiveOption";

import NextActionRenderer from "./renderers/NextActionRenderer/NextActionRenderer";
import Filters from "./Filters/Filters";
import { convertClientsToStudents } from "../../backend/students";
import { deleteClient } from "../../backend/clients";
import ClassRenderer from "../Classes/renderers/ClassRenderer/ClassRenderer";

const CRM = () => {
  const dispatch = useDispatch();
  const clientsStore = useSelector((state) => state.clients);
  const {
    clients,
    editClient,
    selectedClients,
    areClientsLoading,
    isArchiveIncluded,
  } = clientsStore;

  const filtersStore = useSelector((state) => state.filters);
  const { clientFilterParams } = filtersStore;

  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const columns = [
    // leadId
    {
      field: "leadId",
      headerName: "ID",
      width: 40,
    },
    // name
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <>
          <RoleRenderer value={params.row.role} /> {params.value}
        </>
      ),
    },
    // phoneNum
    {
      field: "phoneNum",
      headerName: "Tel No.",
      sortable: false,
      width: 105,
      renderCell: (params) => formatPhoneNumber(params.value),
    },
    // area
    {
      field: "area",
      headerName: "Area",
      sortable: false,
      width: 90,
    },
    // leadSource
    {
      field: "leadSource",
      headerName: "Source",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <LeadSourceRenderer
          value={params.value}
          isCard
          className="text-center"
        />
      ),
    },
    // calls
    {
      field: "calls",
      headerName: "Calls",
      width: 60,
      renderCell: (params) => (
        <div className="text-center">{params.value?.length || 0}</div>
      ),
    },
    // status
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <Tooltip
            arrow
            placement="right"
            title={`${
              params.row.calls?.[params.row.calls.length - 1]?.date
                ? `LAST CALLED: ${formatDateWithTimeOrdinal(
                    new Date(
                      params.row.calls?.[params.row.calls.length - 1]?.date
                    )
                  )}`
                : ""
            }`}
          >
            <div>
              <StatusRenderer
                value={params.row.calls?.[params.row.calls.length - 1]?.status}
              />
            </div>
          </Tooltip>
        );
      },
    },
    // nextAction
    {
      field: "nextAction",
      headerName: "Next",
      width: 100,
      renderCell: (params) => <NextActionRenderer value={params.value} />,
    },
    // priority
    {
      field: "priority",
      headerName: "Priority",
      width: 70,
      renderCell: (params) => <PriorityRenderer value={params.value} />,
    },
    // class
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
      renderCell: (params) => {
        const sessionClass = classes.find(
          (sessionClass) => sessionClass.id === params.value
        );
        if (sessionClass) {
          return (
            <Tooltip
              title={
                <>
                  <ClassRenderer classId={params.value} />
                </>
              }
              sx={{ m: 0 }}
              placement="top"
              arrow
            >
              <ClassRenderer classId={params.value} />
            </Tooltip>
          );
        } else {
          return "";
        }
      },
    },
    // type
    {
      field: "type",
      headerName: "Type",
      // sortable: false,
      width: 90,
      renderCell: (params) => <TypeRenderer value={params.value} />,
    },
    // request
    {
      field: "request",
      headerName: "Request",
      // sortable: false,
      width: 90,
    },
    // actions
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item>
            <IconButton
              onClick={() => triggerCall(params.row.phoneNum)}
              size="small"
              sx={{ color: "black" }}
            >
              <Tooltip title="Make a call">
                <PhoneEnabledIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>

            <IconButton
              size="small"
              onClick={() => openWhatsAppChat(params.row.phoneNum)}
            >
              <Tooltip title="Start a conversation">
                <WhatsAppIcon fontSize="inherit" sx={{ color: "#25D366" }} />
              </Tooltip>
            </IconButton>

            <IconButton
              size="small"
              sx={{ color: "black" }}
              onClick={() => copyToClipboard(params.row.phoneNum)}
            >
              <Tooltip title="Copy number">
                <ContentCopyIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton
              size="small"
              color="info"
              onClick={() => {
                dispatch(setEditClient(params.row));
                setEditClientDialog(true);
              }}
            >
              <Tooltip title="Edit Client">
                <EditIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>

            <Tooltip title="Client Calls">
              <IconButton
                size="small"
                color="secondary"
                onClick={() => {
                  dispatch(setEditClient(params.row));

                  dispatch(setCompareClient(params.row));
                  setClientCallsDialog(true);
                }}
              >
                <TtyIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Client">
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  dispatch(setEditClient(params.row));
                  setDeleteClientDialog(true);
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ),
    },
  ];

  const [newClientDialog, setNewClientDialog] = useState(false);
  const [editClientDialog, setEditClientDialog] = useState(false);
  const [deleteClientDialog, setDeleteClientDialog] = useState(false);
  const [clientCallsDialog, setClientCallsDialog] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredClients, setFilteredClients] = useState([]);

  const dataFilter = (client) => {
    const isEmptyFilter = Object.values(clientFilterParams).every(
      (value) => value?.length === 0 || value === null
    );

    let keepClient = true;

    // Skip checks if all filters are empty
    if (isEmptyFilter) {
      return true;
    }

    // Lead Source Filter
    if (
      clientFilterParams.leadSource.length > 0 &&
      !clientFilterParams.leadSource.includes(
        client.leadSource.includes("|")
          ? client.leadSource.slice(0, client.leadSource.indexOf("|"))
          : client.leadSource
      )
    ) {
      keepClient = false;
    }

    // Status Filter
    const lastCallStatus = client.calls
      ? client.calls[client.calls?.length - 1].status
      : "";
    if (
      clientFilterParams.status?.length > 0 &&
      !clientFilterParams.status.includes(lastCallStatus)
    ) {
      keepClient = false;
    }

    // Next Action Filter
    if (
      clientFilterParams.nextAction?.length > 0 &&
      !clientFilterParams.nextAction.includes(client.nextAction)
    ) {
      keepClient = false;
    }

    if (
      clientFilterParams.nextAction?.length > 0 &&
      clientFilterParams.nextAction?.includes("") &&
      !client.nextAction
    ) {
      keepClient = true;
    }

    // Priority Filter
    if (
      clientFilterParams.priority.length > 0 &&
      !clientFilterParams.priority.includes(client.priority)
    ) {
      keepClient = false;
    }

    // Place Filter
    if (
      clientFilterParams.type.length > 0 &&
      !clientFilterParams.type.includes(client.type)
    ) {
      keepClient = false;
    }

    // Calls Filter
    if (
      clientFilterParams.calls &&
      client.calls?.length !== Number(clientFilterParams.calls)
    ) {
      keepClient = false;
    }

    // Date Filter
    const lastCallDate = client.calls
      ? client.calls[client.calls?.length - 1].date
      : "";

    const compareTwoDates = (date1, date2) => {
      const firstDate = new Date(date1);
      const secondDate = new Date(date2);
      const firstDateString = `${firstDate.getFullYear()}-${
        firstDate.getMonth() + 1
      }-${firstDate.getDate()}`;
      const secondDateString = `${secondDate.getFullYear()}-${
        secondDate.getMonth() + 1
      }-${secondDate.getDate()}`;
      return firstDateString === secondDateString;
    };

    if (
      clientFilterParams.startDate &&
      clientFilterParams.endDate &&
      !(
        lastCallDate > Number(new Date(clientFilterParams.startDate)) &&
        lastCallDate < Number(new Date(clientFilterParams.endDate))
      )
    ) {
      keepClient = false;
    }

    return keepClient;
  };

  const searchFilter = (client) => {
    // Loop through each key-value pair in the client object
    for (const key in client) {
      // Convert the value to a string for case-insensitive search (optional)
      const valueString =
        typeof client[key] === "string"
          ? client[key]
          : JSON.stringify(client[key]);

      // Check if the searchTerm is included in the current field value (case-insensitive)
      if (valueString.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true; // Include the client if a match is found
      }
    }

    // If no match found in any field, return false (exclude the client)
    return false;
  };

  useEffect(() => {
    const filteredClients = clients.filter(dataFilter).filter(searchFilter);

    setFilteredClients(filteredClients);
  }, [clientFilterParams, searchTerm]);

  useEffect(() => {
    const filteredClients = clients.filter(dataFilter).filter(searchFilter);
    setFilteredClients(filteredClients);
  }, [clients]);

  const { xs, sm, md, lg, xl } = useMediaQueries();

  const [alertState, setAlertState] = useState(true);

  return (
    <Paper elevation={0} sx={{ mt: 10 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={1}
        mb={1}
      >
        <Grid item width={xs ? "100%" : "auto"}>
          <Button
            variant="outlined"
            fullWidth={xs}
            startIcon={<PersonIcon />}
            onClick={() => setNewClientDialog(true)}
          >
            New Client
          </Button>
        </Grid>

        {selectedClients.length > 0 && (
          <Grid item width={xs ? "100%" : "auto"}>
            <SplitButton
              mainButton={`Apply to ${selectedClients.length} leads`}
              options={[
                {
                  title: "Convert to student(s)",
                  onClick: () => {
                    const selectedDocs = selectedClients.map((client) =>
                      clients.find((doc) => doc.id === client)
                    );

                    convertClientsToStudents(selectedDocs);
                  },
                },
                {
                  title: "Delete Selected Students",
                  onClick: () => {
                    const selectedDocs = selectedClients.map((client) =>
                      clients.find((doc) => doc.id === client)
                    );
                    selectedDocs.forEach(deleteClient);
                  },
                },
              ]}
            />
          </Grid>
        )}

        <Grid item width={xs ? "100%" : "auto"}>
          <Filters />
        </Grid>

        <Grid item sx={{ width: xs ? "100%" : "auto" }}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Search with any value..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                  <ClearIcon onClick={() => setSearchTerm("")} />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        <Grid item>
          <ArchiveOption />
        </Grid>
      </Grid>

      {!xs && (
        <>
          {alertState && (
            <Alert
              severity="info"
              sx={{ mt: 1, mb: 0.5 }}
              onClose={() => setAlertState(false)}
            >
              Click <PresentToAllIcon fontSize="30px !important" />{" "}
              <code>SHIFT</code> and hold while using{" "}
              <MouseIcon fontSize="30px !important" /> mouse wheel to scroll{" "}
              <SyncAltIcon fontSize="30px !important" /> horizontally{" "}
            </Alert>
          )}

          {!areClientsLoading ? (
            <DataGrid
              rows={filteredClients}
              columns={columns}
              rowHeight={50}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    phoneNum: false,
                    area: false,
                    class: false,
                  },
                },
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50]}
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnFilter
              onRowSelectionModelChange={(newRowSelectionModel) => {
                dispatch(setSelectedClients(newRowSelectionModel));
              }}
              rowSelectionModel={selectedClients}
              // onCellClick={(e) => {
              //   if (e.field === "phoneNum") {
              //     triggerCall(e.row.phoneNum);
              //   }
              // }}
              getRowClassName={(params) => {
                return params.indexRelativeToCurrentPage % 2 === 0
                  ? "evenRow"
                  : "oddRow";
              }}
              getCellClassName={(params) => {
                // // Example logic: Apply a different class based on the field name
                // if (
                //   params.field === "status" &&
                //   params.row.status === "call-later"
                // ) {
                //   return "red"; // Create class names based on status value
                // }

                if (params.field === "priority") {
                  return "text-center"; // Create class names based on status value
                }

                // // Return an empty string for default styling
                // return "";
              }}
              autoHeight
              slots={{ noRowsOverlay: CustomNoRowsOverlay }}
              sx={{ "--DataGrid-overlayHeight": "200px" }}
            />
          ) : (
            <CRMLoader />
          )}
        </>
      )}

      {xs && (
        <>
          <MobileCRM
            filteredClients={filteredClients}
            searchTerm={searchTerm}
            setEditClientDialog={setEditClientDialog}
            setDeleteClientDialog={setDeleteClientDialog}
            setClientCallsDialog={setClientCallsDialog}
          />
        </>
      )}

      {/* Dialogs Start */}
      <NewClientDialog state={newClientDialog} setState={setNewClientDialog} />
      <ClientCallsDialog
        state={clientCallsDialog}
        setState={setClientCallsDialog}
        setEditClientDialog={setEditClientDialog}
      />
      <EditClientDialog
        state={editClientDialog}
        setState={setEditClientDialog}
      />
      <DeleteClientDialog
        state={deleteClientDialog}
        setState={setDeleteClientDialog}
      />
      {/* Dialogs End */}
    </Paper>
  );
};

export default CRM;
