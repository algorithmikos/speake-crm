import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Alert,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Table,
  TableBody,
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import CardRow from "../../components/CardRow/CardRow";
import TypeRenderer from "../CRM/renderers/TypeRenderer/TypeRenderer";

const MobileClasses = ({ searchTerm }) => {
  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const [filterSection, setFilterSection] = useState(false);
  const [filterParams, setFilterParams] = useState({
    leadSource: [],
    status: [],
    priority: [],
    type: [],
    date: null,
    calls: null,
  });

  return (
    <>
      <Grid container gap={1} justifyContent="center">
        {classes.length
          ? classes
              .filter((sessionClass) => {
                const isEmptyFilter = Object.values(filterParams).every(
                  (value) => value?.length === 0 || value === null
                );

                let keepSessionClass = true;

                // Skip checks if all filters are empty
                if (isEmptyFilter) {
                  return true;
                }

                // Lead Source Filter
                if (
                  filterParams.leadSource.length > 0 &&
                  !filterParams.leadSource.includes(sessionClass.leadSource)
                ) {
                  keepSessionClass = false;
                }

                // Status Filter
                if (
                  filterParams.status.length > 0 &&
                  !filterParams.status.includes(sessionClass.status)
                ) {
                  keepSessionClass = false;
                }

                // Priority Filter
                if (
                  filterParams.priority.length > 0 &&
                  !filterParams.priority.includes(sessionClass.priority)
                ) {
                  keepSessionClass = false;
                }

                // Place Filter
                if (
                  filterParams.type.length > 0 &&
                  !filterParams.type.includes(sessionClass.type)
                ) {
                  keepSessionClass = false;
                }

                return keepSessionClass;
              })
              .filter((sessionClass) => {
                // Loop through each key-value pair in the sessionClass object
                for (const key in sessionClass) {
                  // Convert the value to a string for case-insensitive search (optional)
                  const valueString =
                    typeof sessionClass[key] === "string"
                      ? sessionClass[key]
                      : JSON.stringify(sessionClass[key]);

                  // Check if the searchTerm is included in the current field value (case-insensitive)
                  if (
                    valueString.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return true; // Include the sessionClass if a match is found
                  }
                }

                // If no match found in any field, return false (exclude the sessionClass)
                return false;
              })
              .map((sessionClass, index) => (
                <Card
                  key={sessionClass.id}
                  elevation={5}
                  onDoubleClick={() => {
                    // if (selectedclasses.includes(sessionClass.id)) {
                    //   const updatedselectedclasses = [...selectedclasses].filter(
                    //     (id) => id !== sessionClass.id
                    //   );
                    //   dispatch(setSelectedclasses(updatedselectedclasses));
                    // } else {
                    //   const updatedselectedclasses = [
                    //     ...selectedclasses,
                    //     sessionClass.id,
                    //   ];
                    //   dispatch(setSelectedclasses(updatedselectedclasses));
                    // }
                  }}
                  sx={{
                    width: 290,
                    // backgroundColor:
                    //   selectedclasses.includes(sessionClass.id) && "#f1f2f3",
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
                          Class {index + 1}
                        </Grid>
                      </Grid>
                    }
                  />
                  <Divider />
                  <CardContent sx={{ p: 0 }}>
                    <Table size="small">
                      <TableBody>
                        <CardRow
                          firstCell="Days"
                          secondCell={sessionClass.days.join(", ")}
                        />

                        <CardRow
                          firstCell="Start"
                          secondCell={sessionClass.startTime}
                        />

                        <CardRow
                          firstCell="End"
                          secondCell={sessionClass.endTime}
                        />

                        <CardRow
                          firstCell="Place"
                          secondCell={
                            <TypeRenderer value={sessionClass.place} />
                          }
                        />
                      </TableBody>
                    </Table>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    {/* <Grid container justifyContent="space-between">
                    <ButtonGroup>
                      <Tooltip title="Edit Selected sessionClass">
                        <IconButton
                          color="info"
                          onClick={() => {
                            dispatch(setEditSessionClass(sessionClass));
                            setEditSessionClassDialog(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="sessionClass Calls">
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            dispatch(setEditSessionClass(sessionClass));
                            setSessionClassCallsDialog(true);
                          }}
                        >
                          <TtyIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Selected sessionClass">
                        <IconButton
                          color="error"
                          onClick={() => {
                            dispatch(setEditSessionClass(sessionClass));
                            setDeleteSessionClassDialog(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>

                    <ButtonGroup>
                      <IconButton
                        onClick={() => triggerCall(sessionClass.phoneNum)}
                        sx={{ color: "black" }}
                        disabled={!sessionClass.phoneNum}
                      >
                        <Tooltip title="Make a call">
                          <PhoneEnabledIcon fontSize="inherit" />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        onClick={() => openWhatsAppChat(sessionClass.phoneNum)}
                        disabled={!sessionClass.phoneNum}
                      >
                        <Tooltip title="Start a conversation">
                          <WhatsAppIcon
                            fontSize="inherit"
                            sx={{ color: sessionClass.phoneNum && "#25D366" }}
                          />
                        </Tooltip>
                      </IconButton>

                      <IconButton
                        sx={{ color: "black" }}
                        onClick={() => copyToClipboard(sessionClass.phoneNum)}
                        disabled={!sessionClass.phoneNum}
                      >
                        <Tooltip title="Copy number">
                          <ContentCopyIcon fontSize="inherit" />
                        </Tooltip>
                      </IconButton>
                    </ButtonGroup>
                  </Grid> */}
                  </CardActions>
                </Card>
              ))
          : Array(5)
              .fill(null)
              .map((_, index) => <MobileCRMLoader key={index} />)}
      </Grid>
    </>
  );
};

export default MobileClasses;
