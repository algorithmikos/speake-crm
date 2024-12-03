import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  Fade,
  FormControl,
  Grid,
  Grow,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Zoom,
  capitalize,
} from "@mui/material";
import LeadSourceRenderer from "./renderers/LeadSourceRenderer/LeadSourceRenderer";
import StatusRenderer from "./renderers/StatusRenderer/StatusRenderer";
import PriorityRenderer from "./renderers/PriorityRenderer/PriorityRenderer";

import {
  copyToClipboard,
  openWhatsAppChat,
  triggerCall,
  formatDateWithTimeOrdinal,
  convertTime,
  textDir,
} from "../../utils/functions";

import BadgeIcon from "@mui/icons-material/Badge";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TtyIcon from "@mui/icons-material/Tty";

import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

import TypeRenderer from "./renderers/TypeRenderer/TypeRenderer";
import { formatPhoneNumber } from "../../utils/dataCleaning";
import {
  setEditClient,
  setCompareClient,
  setSelectedClients,
} from "../../rtk/slices/clients-slice";
import CardRow from "../../components/CardRow/CardRow";
import MobileCRMLoader from "./MobileCRMLoader";
import RoleRenderer from "./renderers/RoleRenderer/RoleRenderer";
import OpenPkg from "../../components/Icons/OpenPkg";
import NextActionRenderer from "./renderers/NextActionRenderer/NextActionRenderer";

import ReactSliderViews from "react-slider-views";

const MobileCRM = ({
  setEditClientDialog,
  setDeleteClientDialog,
  setClientCallsDialog,
  filteredClients,
  searchTerm,
}) => {
  const dispatch = useDispatch();
  const clientsStore = useSelector((state) => state.clients);
  const { selectedClients, areClientsLoading } = clientsStore;

  const filtersStore = useSelector((state) => state.filters);
  const { clientFilterParams } = filtersStore;

  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const usersStore = useSelector((state) => state.users);
  const { users } = usersStore;

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const clientsPerPage = 5;
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [clientFilterParams, searchTerm]);

  return (
    <Grid container gap={1} justifyContent="center">
      <Grid
        container
        gap={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Chip label={`Clients: ${filteredClients.length}`} color="success" />

        {filteredClients.length > 0 && (
          <Pagination
            sx={{ mt: 1, mb: 1 }}
            shape="rounded"
            count={Math.ceil(filteredClients.length / clientsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={0}
          />
        )}

        {paginatedClients.length ? (
          <ReactSliderViews
            // axis="y"
            resistance
            containerStyle={{
              width: 350,
              height: "100%",
              marginRight: -40,
            }}
          >
            {paginatedClients.map((client) => (
              <Card
                key={client.id}
                elevation={5}
                onDoubleClick={() => {
                  if (selectedClients.includes(client.id)) {
                    const updatedselectedClients = [...selectedClients].filter(
                      (id) => id !== client.id
                    );
                    dispatch(setSelectedClients(updatedselectedClients));
                  } else {
                    const updatedselectedClients = [
                      ...selectedClients,
                      client.id,
                    ];
                    dispatch(setSelectedClients(updatedselectedClients));
                  }
                }}
                sx={{
                  m: 0.5,
                  width: 300,
                  backgroundColor:
                    selectedClients.includes(client.id) && "#f1f2f3",
                }}
              >
                <CardHeader
                  title={
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item width="50%">
                        {client.name || "Unknown"}
                      </Grid>

                      <Alert
                        severity="info"
                        icon={<BadgeIcon />}
                        sx={{
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                      >
                        {client.leadId}
                      </Alert>
                    </Grid>
                  }
                />
                <Divider />
                <CardContent sx={{ p: 0 }}>
                  <Table size="small">
                    <TableBody>
                      {client.role && client.role !== "n/a" && (
                        <CardRow
                          firstCell="Role"
                          secondCell={
                            <RoleRenderer value={client.role} declarative />
                          }
                        />
                      )}

                      <CardRow
                        firstCell="Tel"
                        secondCell={formatPhoneNumber(client.phoneNum)}
                      />

                      {client.area && client.area !== "n/a" && (
                        <CardRow firstCell="Area" secondCell={client.area} />
                      )}

                      <CardRow
                        firstCell="Source"
                        secondCell={
                          <LeadSourceRenderer
                            value={client.leadSource}
                            isCard
                          />
                        }
                      />

                      {client.request && client.request !== "n/a" && (
                        <CardRow
                          firstCell="Request"
                          secondCell={client.request}
                        />
                      )}

                      <CardRow
                        firstCell="Calls"
                        secondCell={client.calls?.length || 0}
                      />

                      {client.calls?.[client.calls?.length - 1]?.date && (
                        <CardRow
                          firstCell="Called"
                          secondCell={formatDateWithTimeOrdinal(
                            new Date(
                              client.calls?.[client.calls.length - 1]?.date
                            )
                          )}
                        />
                      )}

                      <CardRow
                        firstCell="Agent"
                        secondCell={
                          client.calls?.[client.calls.length - 1]?.caller
                            ? users?.find(
                                (user) =>
                                  user.id ===
                                  client.calls?.[client.calls.length - 1]
                                    ?.caller
                              )?.name
                            : "Manar Fayez"
                        }
                      />

                      <CardRow
                        firstCell="Status"
                        secondCell={
                          <StatusRenderer
                            value={
                              client.calls?.[client.calls.length - 1]?.status
                            }
                          />
                        }
                      />

                      {client.priority && client.priority !== "n/a" && (
                        <CardRow
                          firstCell="Priority"
                          secondCell={
                            <>
                              <PriorityRenderer value={client.priority} />{" "}
                              {client.priority !== "n/a"
                                ? capitalize(client.priority)
                                : "Unassigned"}
                            </>
                          }
                        />
                      )}

                      {client.class && client.class !== "n/a" && (
                        <CardRow
                          firstCell="Class"
                          secondCell={
                            classes.find(
                              (sessionClass) => sessionClass.id === client.class
                            ) ? (
                              <Grid container alignItems="center" gap={0.5}>
                                <Grid item>
                                  [{" "}
                                  <strong>
                                    {classes
                                      .find(
                                        (sessionClass) =>
                                          sessionClass.id === client.class
                                      )
                                      ?.days?.join(" - ")}
                                  </strong>{" "}
                                  ]
                                </Grid>
                                <Grid item>
                                  {convertTime(
                                    classes.find(
                                      (sessionClass) =>
                                        sessionClass.id === client.class
                                    )?.startTime
                                  )}{" "}
                                  :{" "}
                                </Grid>
                                <Grid item>
                                  {convertTime(
                                    classes.find(
                                      (sessionClass) =>
                                        sessionClass.id === client.class
                                    )?.endTime
                                  )}
                                </Grid>
                                <Grid item>
                                  {
                                    <TypeRenderer
                                      value={
                                        classes.find(
                                          (sessionClass) =>
                                            sessionClass.id === client.class
                                        )?.place
                                      }
                                    />
                                  }
                                </Grid>
                              </Grid>
                            ) : (
                              ""
                            )
                          }
                        />
                      )}

                      {client.type && client.type !== "n/a" && (
                        <CardRow
                          firstCell="Type"
                          secondCell={<TypeRenderer value={client.type} />}
                        />
                      )}

                      <CardRow
                        firstCell="Next Action"
                        secondCell={
                          <NextActionRenderer value={client.nextAction} />
                        }
                      />

                      {client.notes && (
                        <CardRow
                          firstCell="Notes"
                          secondCell={client.notes}
                          sc={client.notes}
                        />
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <Divider />
                <CardActions>
                  <Grid container justifyContent="space-between">
                    <ButtonGroup>
                      <Tooltip title="Edit Selected Client">
                        <IconButton
                          color="info"
                          onClick={() => {
                            dispatch(setEditClient(client));
                            setEditClientDialog(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Client Calls">
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            dispatch(setEditClient(client));
                            dispatch(setCompareClient(client));
                            setClientCallsDialog(true);
                          }}
                        >
                          <TtyIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Selected Client">
                        <IconButton
                          color="error"
                          onClick={() => {
                            dispatch(setEditClient(client));
                            setDeleteClientDialog(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>

                    <ButtonGroup>
                      <IconButton
                        onClick={() => triggerCall(client.phoneNum)}
                        sx={{ color: "black" }}
                        disabled={!client.phoneNum}
                      >
                        <Tooltip title="Make a call">
                          <PhoneEnabledIcon fontSize="inherit" />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        onClick={() => openWhatsAppChat(client.phoneNum)}
                        disabled={!client.phoneNum}
                      >
                        <Tooltip title="Start a conversation">
                          <WhatsAppIcon
                            fontSize="inherit"
                            sx={{ color: client.phoneNum && "#25D366" }}
                          />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        sx={{ color: "black" }}
                        onClick={() => copyToClipboard(client.phoneNum)}
                        disabled={!client.phoneNum}
                      >
                        <Tooltip title="Copy number">
                          <ContentCopyIcon fontSize="inherit" />
                        </Tooltip>
                      </IconButton>
                    </ButtonGroup>
                  </Grid>
                </CardActions>
              </Card>
            ))}
          </ReactSliderViews>
        ) : areClientsLoading ? (
          Array(5)
            .fill(null)
            .map((_, index) => <MobileCRMLoader key={index} />)
        ) : (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <OpenPkg />
            <Typography variant="h6" className="app-font" textAlign="center">
              No results found!
            </Typography>
          </Grid>
        )}

        <Chip
          label={`Clients: ${filteredClients.length}`}
          color="success"
          sx={{ mt: 1 }}
        />

        {filteredClients.length > 0 && (
          <Pagination
            sx={{ mt: 1 }}
            shape="rounded"
            count={Math.ceil(filteredClients.length / clientsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={0}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default MobileCRM;
