import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../components/Overlays/NoRowsOverlay";
import {
  copyToClipboard,
  formatDateWithTimeOrdinal,
  openWhatsAppChat,
  triggerCall,
  useMediaQueries,
} from "../../utils/functions";
import { formatPhoneNumber, timestampToDate } from "../../utils/dataCleaning";

import TypeRenderer from "../CRM/renderers/TypeRenderer/TypeRenderer";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";

import XsView from "../../components/XsView/XsView";
import { setSelectedSessions } from "../../rtk/slices/sessions-slice";
import SplitButton from "../../components/SplitButton/SplitButton";
import Filters from "../CRM/Filters/Filters";
import ArchiveOption from "../../components/Archive/ArchiveOption";

import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExtensionOffIcon from "@mui/icons-material/ExtensionOff";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import NewSessionDialog from "./dialogs/NewSessionDialog";
import EditSessionDialog from "./dialogs/EditSessionDialog";
import DeleteSessionDialog from "./dialogs/DeleteSessionDialog";
import AddCouponsDialog from "./dialogs/AddCouponsDialog";
import { setEditSession } from "../../rtk/slices/sessions-slice";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase.config";
import { setSessions } from "../../rtk/slices/sessions-slice";

const Sessions = () => {
  const dispatch = useDispatch();
  const sessionsStore = useSelector((state) => state.sessions);
  const { sessions, selectedSessions } = sessionsStore;

  const [filteredSessions, setFilteredSessions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [newSessionDialog, setNewSessionDialog] = useState(false);
  const [editSessionDialog, setEditSessionDialog] = useState(false);
  const [addCouponsDialog, setAddCouponsDialog] = useState(false);
  const [deleteSessionDialog, setDeleteSessionDialog] = useState(false);

  const { xs, sm, md, lg, xl } = useMediaQueries();

  const columns = [
    // Session Number
    {
      field: "sessionId",
      headerName: "ID",
      width: 140,
      renderCell: (params) =>
        `S${params.row.type[0].toUpperCase()}-${String(
          params.row.createdAt
        ).slice(-4)} - ${params.row.category}`,
    },
    // Type
    {
      field: "type",
      headerName: "Type",
      width: 90,
      renderCell: (params) => <TypeRenderer value={params.value} />,
    },
    // Sold Count
    {
      field: "sold",
      headerName: "Sold",
      width: 80,
      renderCell: (params) => (
        <Chip
          color={params.value ? "success" : "warning"}
          label={`${params.value || "None"}`}
        />
      ),
    },
    // Coupons left
    {
      field: "coupons",
      headerName: "Coupons",
      width: 100,
      renderCell: (params) =>
        params.row.type === "online" ? (
          <Chip
            color={params.value?.length ? "info" : "error"}
            label={`${params.value?.length || "Depleted"}`}
          />
        ) : (
          <Tooltip title="This feature is only available for online sessions">
            <ExtensionOffIcon sx={{ ml: 1, color: "grey" }} />
          </Tooltip>
        ),
    },
    // Session Description
    {
      field: "description",
      headerName: "Description",
      width: 120,
    },
    // CreatedAt
    {
      field: "createdAt",
      headerName: "Added",
      width: 200,
      valueGetter: (value) => formatDateWithTimeOrdinal(new Date(value)),
    },
    // Actions
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          {params.row.type === "online" && (
            <IconButton
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(setEditSession(params.row));
                setAddCouponsDialog(true);
              }}
            >
              <Tooltip title="Add Coupons">
                <AddCardIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>
          )}

          <IconButton
            size="small"
            color="info"
            onClick={() => {
              dispatch(setEditSession(params.row));
              setEditSessionDialog(true);
            }}
          >
            <Tooltip title="Edit Session">
              <EditIcon fontSize="inherit" />
            </Tooltip>
          </IconButton>

          <Tooltip title="Delete Session">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                // dispatch(setEditClient(params.row));
                setDeleteSessionDialog(true);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    setFilteredSessions(sessions);
  }, [sessions]);

  const Actions = ({ session }) => {
    return (
      <>
        <ButtonGroup>
          {session.type === "online" && (
            <IconButton
              color="secondary"
              onClick={() => {
                dispatch(setEditSession(session));
                setAddCouponsDialog(true);
              }}
            >
              <Tooltip title="Add Coupons">
                <AddCardIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>
          )}
        </ButtonGroup>

        <ButtonGroup>
          <IconButton
            color="info"
            onClick={() => {
              dispatch(setEditSession(session));
              setEditSessionDialog(true);
            }}
          >
            <Tooltip title="Edit Session">
              <EditIcon fontSize="inherit" />
            </Tooltip>
          </IconButton>

          <Tooltip title="Delete Session">
            <IconButton
              color="error"
              onClick={() => {
                // dispatch(setEditClient(session));
                setDeleteSessionDialog(true);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </>
    );
  };

  return (
    <Paper elevation={0} sx={{ mt: 10 }}>
      {/* Toolbar Start */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        gap={1}
        mb={1}
      >
        {/* New Session Button Start */}
        <Grid item width={xs ? "100%" : "auto"}>
          <Button
            variant="outlined"
            fullWidth={xs}
            startIcon={<Diversity3Icon />}
            onClick={() => setNewSessionDialog(true)}
          >
            New Session
          </Button>
        </Grid>
        {/* New Session Button End */}

        {/* Apply Action Split Button Start */}
        {selectedSessions.length > 0 && (
          <Grid item width={xs ? "100%" : "auto"}>
            <SplitButton
              mainButton={`Apply to ${selectedSessions.length} leads`}
              options={[
                {
                  title: "Convert to student(s)",
                  onClick: () => {
                    const selectedDocs = selectedSessions.map((client) =>
                      sessions.find((doc) => doc.id === client)
                    );

                    convertClientsToStudents(selectedDocs);
                  },
                },
              ]}
            />
          </Grid>
        )}
        {/* Apply Action Split Button End */}

        {/* Filters Button Start */}
        {/* <Grid item width={xs ? "100%" : "auto"}>
          <Filters />
        </Grid> */}
        {/* Filters Button End */}

        {/* Search Field Start */}
        {/* <Grid item sx={{ width: xs ? "100%" : "auto" }}>
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
        </Grid> */}
        {/* Search Field End */}

        {/* Archive Option Checkbox Start */}
        {/* <Grid item>
          <ArchiveOption />
        </Grid> */}
        {/* Archive Option Checkbox End */}
      </Grid>
      {/* Toolbar End */}

      {/* Table of sessions start */}
      {!xs && (
        <DataGrid
          columns={columns}
          rows={filteredSessions}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{ "--DataGrid-overlayHeight": "200px" }}
        />
      )}
      {/* Table of sessions End */}

      {/* Slider */}
      {/* {xs && (
        <Swiper effect={"cover-flow"} grabCursor={true} centered>
          {filteredSessions?.map((session, index) => (
            <SwiperSlide>
              <XsView
                key={session.id}
                mapKey={session.id}
                item={session}
                rows={[
                  {
                    firstCell: "Added",
                    secondCell: formatDateWithTimeOrdinal(
                      new Date(session.createdAt)
                    ),
                  },
                  {
                    firstCell: "Coupons",
                    secondCell: (
                      <Chip
                        color={session.coupons?.length ? "info" : "error"}
                        label={`${session.coupons?.length || "Depleted"}`}
                      />
                    ),
                    value: session.type === "online",
                    hideEmpty: true,
                  },
                  {
                    firstCell: "Sold",
                    secondCell: (
                      <Chip
                        color={session.sold ? "success" : "warning"}
                        label={`${session.sold || "None"}`}
                      />
                    ),
                  },
                  {
                    firstCell: "Description",
                    secondCell: session.description,
                    value: session.description,
                    hideEmpty: true,
                  },
                ]}
                selectedItems={selectedSessions}
                setSelectedItems={setSelectedSessions}
                itemBadgeName={`S${session.type[0].toUpperCase()}-${String(
                  session.createdAt
                ).slice(-4)} - ${session.category}`}
                buttons={<Actions session={session} />}
                showItemBadgeId={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )} */}
      {/* Slider */}

      {/* Cards of sessions Start */}
      {xs && (
        <Grid container justifyContent="center" gap={1}>
          {filteredSessions?.map((session, index) => (
            <XsView
              key={session.id}
              mapKey={session.id}
              item={session}
              rows={[
                {
                  firstCell: "Added",
                  secondCell: formatDateWithTimeOrdinal(
                    new Date(session.createdAt)
                  ),
                },
                {
                  firstCell: "Coupons",
                  secondCell: (
                    <Chip
                      color={session.coupons?.length ? "info" : "error"}
                      label={`${session.coupons?.length || "Depleted"}`}
                    />
                  ),
                  value: session.type === "online",
                  hideEmpty: true,
                },
                {
                  firstCell: "Sold",
                  secondCell: (
                    <Chip
                      color={session.sold ? "success" : "warning"}
                      label={`${session.sold || "None"}`}
                    />
                  ),
                },
                {
                  firstCell: "Description",
                  secondCell: session.description,
                  value: session.description,
                  hideEmpty: true,
                },
              ]}
              selectedItems={selectedSessions}
              setSelectedItems={setSelectedSessions}
              itemBadgeName={`S${session.type[0].toUpperCase()}-${String(
                session.createdAt
              ).slice(-4)} - ${session.category}`}
              buttons={<Actions session={session} />}
              showItemBadgeId={false}
            />
          ))}
        </Grid>
      )}
      {/* Cards of sessions End */}

      {/* Dialogs Start */}
      <NewSessionDialog
        state={newSessionDialog}
        setState={setNewSessionDialog}
      />

      <EditSessionDialog
        state={editSessionDialog}
        setState={setEditSessionDialog}
      />

      <AddCouponsDialog
        state={addCouponsDialog}
        setState={setAddCouponsDialog}
      />

      <DeleteSessionDialog
        state={deleteSessionDialog}
        setState={setDeleteSessionDialog}
      />
      {/* Dialogs End */}
    </Paper>
  );
};

export default Sessions;
