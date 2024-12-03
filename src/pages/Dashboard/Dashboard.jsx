import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Button,
  capitalize,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Fade,
  Grid,
  Grow,
  IconButton,
  ListItem,
  MenuList,
  Paper,
  Table,
  TableBody,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LeadSourceRenderer from "../CRM/renderers/LeadSourceRenderer/LeadSourceRenderer";
import { textDir, useMediaQueries } from "../../utils/functions";
import CardRow from "../../components/CardRow/CardRow";
import ArchiveOption from "../../components/Archive/ArchiveOption";
import { getLocalStorageUserDoc } from "../../backend/user";
import { auth } from "../../firebase.config";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

const Dashboard = () => {
  const clientsStore = useSelector((state) => state.clients);
  const { clients, editClient, selectedClients } = clientsStore;

  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const campaignsStore = useSelector((state) => state.campaigns);
  const { campaigns } = campaignsStore;

  const { xs, sm, md, lg, xl } = useMediaQueries();

  const bookedClientsByLeadSource = (client, leadSource) => {
    return (
      (client.leadSource.includes("|")
        ? leadSource ===
          client.leadSource.slice(0, client.leadSource.indexOf("|"))
        : leadSource === client.leadSource) &&
      client.calls?.some((call) => call.status === "booked")
    );
  };

  const clientsByLeadSource = (client, leadSource) => {
    return client.leadSource.includes("|")
      ? leadSource ===
          client.leadSource.slice(0, client.leadSource.indexOf("|"))
      : leadSource === client.leadSource;
  };

  const bookedClients = clients.filter((client) =>
    client.calls?.some((call) => call.status === "booked")
  ).length;

  function generateRandomLightColor() {
    // Generate three random numbers between 128 and 255 (inclusive) for red, green, and blue
    const red = Math.floor(Math.random() * (256 - 128) + 128);
    const green = Math.floor(Math.random() * (256 - 128) + 128);
    const blue = Math.floor(Math.random() * (256 - 128) + 128);

    // Convert the RGB values to a hexadecimal string with padding
    return `#${red.toString(16).padStart(2, "0")}${green
      .toString(16)
      .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
  }

  const getArcLabel = (params, total) => {
    const percent = params.value / total;
    return `${(percent * 100).toFixed(0)}%`;
  };

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };

  const [bookedTable, setBookedTable] = useState(false);
  const [leadTable, setLeadTable] = useState(true);

  function isNotToday(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0); // Start of input date

    return inputDate.getTime() !== today.getTime();
  }

  const clientFilters = {
    booked: (client) =>
      client.nextAction === "whatsapp-details" ||
      client.nextAction === "convert-to-student",

    bookedType: (client, type) =>
      client.type === type &&
      (client.nextAction === "whatsapp-details" ||
        client.nextAction === "convert-to-student"),

    potential: (client) =>
      client.priority !== "cold" &&
      client.calls?.length <= 3 &&
      client.nextAction !== "archive" &&
      client.nextAction !== "whatsapp-msg",

    followUp: (client) =>
      client.calls &&
      client.calls?.length &&
      isNotToday(client.calls?.[client.calls.length - 1]?.date) &&
      (client.nextAction === "call-again" ||
        client.nextAction === "waiting" ||
        client.nextAction === "whatsapp-details"),
  };

  return (
    <Paper elevation={0} sx={{ mt: 10 }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        mb={2}
        gap={2}
      >
        <Typography variant="h3" component="h1">
          Welcome, {auth?.currentUser?.displayName || "Agent"}!
        </Typography>

        <ArchiveOption />
      </Grid>

      <Grid container justifyContent="center" gap={1}>
        <Card elevation={5} sx={{ width: xs ? "100%" : "auto" }}>
          <CardHeader title="Leads" />
          <Divider />
          <CardContent>
            <ul>
              <li style={{ marginBottom: 5 }}>
                In-system Leads Total: {clients.length}
              </li>

              <li style={{ marginBottom: 5 }}>
                Booked: {clients.filter(clientFilters.booked).length}
                <IconButton
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  onClick={() => setBookedTable(!bookedTable)}
                  sx={{ p: 0, m: 0 }}
                  color={bookedTable ? "default" : "error"}
                >
                  {bookedTable ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Collapse in={bookedTable}>
                  {/* Booked Sources */}
                  <Table sx={{ mt: 1, mb: 2 }} size="small">
                    <TableBody
                      sx={{
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "#e0e0e0",
                      }}
                    >
                      {campaigns?.map((campaign, index) =>
                        campaign.campaignPlatform.map(
                          (platform, pIndex) =>
                            clients?.filter((client) => {
                              let keepClient = true;

                              if (!client.leadSource.includes(campaign.id)) {
                                keepClient = false;
                              }

                              if (!client.leadSource.includes(platform)) {
                                keepClient = false;
                              }

                              if (
                                !client.calls?.some(
                                  (call) => call.status === "booked"
                                )
                              ) {
                                keepClient = false;
                              }

                              if (
                                client.leadSource.includes(campaign.id) &&
                                client.calls?.some(
                                  (call) => call.status === "booked"
                                ) &&
                                platform === "other"
                              ) {
                                keepClient = true;
                              }

                              return keepClient;
                            })?.length > 0 && (
                              <CardRow
                                className={
                                  index % 2 !== 0 ? "evenRow" : "oddRow"
                                }
                                key={`${campaign.id}|${platform}`}
                                fcWidth="90%"
                                secondCellSx={{
                                  color: "green",
                                  fontWeight: "bold",
                                }}
                                firstCell={
                                  <Grid
                                    container
                                    justifyContent="start"
                                    alignItems="center"
                                  >
                                    <LeadSourceRenderer value={platform} />
                                    {campaign.adName}
                                  </Grid>
                                }
                                secondCell={
                                  clients?.filter((client) => {
                                    let keepClient = true;

                                    if (
                                      !client.leadSource.includes(campaign.id)
                                    ) {
                                      keepClient = false;
                                    }

                                    if (!client.leadSource.includes(platform)) {
                                      keepClient = false;
                                    }

                                    if (
                                      !client.calls?.some(
                                        (call) => call.status === "booked"
                                      )
                                    ) {
                                      keepClient = false;
                                    }

                                    if (
                                      client.leadSource.includes(campaign.id) &&
                                      client.calls?.some(
                                        (call) => call.status === "booked"
                                      ) &&
                                      platform === "other"
                                    ) {
                                      keepClient = true;
                                    }

                                    return keepClient;
                                  })?.length
                                }
                              />
                            )
                        )
                      )}

                      {[
                        "facebook",
                        "whatsapp",
                        "instagram",
                        "acquaintances",
                        "other",
                        "unknown",
                      ].map(
                        (platform, pIndex) =>
                          clients?.filter(
                            (client) =>
                              client.leadSource === platform &&
                              client.calls?.some(
                                (call) => call.status === "booked"
                              )
                          )?.length > 0 && (
                            <CardRow
                              className={
                                pIndex % 2 === 0 ? "evenRow" : "oddRow"
                              }
                              key={platform}
                              secondCellSx={{
                                color: "green",
                                fontWeight: "bold",
                              }}
                              firstCell={
                                <LeadSourceRenderer value={platform} isCard />
                              }
                              secondCell={
                                clients?.filter(
                                  (client) =>
                                    client.leadSource === platform &&
                                    client.calls?.some(
                                      (call) => call.status === "booked"
                                    )
                                )?.length
                              }
                            />
                          )
                      )}
                    </TableBody>
                  </Table>
                  {/* Booked Sources */}
                </Collapse>
              </li>

              {/* Booked Types */}
              <Table size="small" sx={{ mb: 2 }}>
                <TableBody
                  sx={{
                    borderRight: 1,
                    borderLeft: 1,
                    borderColor: "#e0e0e0",
                  }}
                >
                  <CardRow
                    fcWidth="90%"
                    className={0 % 2 !== 0 ? "evenRow" : "oddRow"}
                    firstCell="Online"
                    secondCell={
                      clients.filter((c) =>
                        clientFilters.bookedType(c, "online")
                      ).length
                    }
                  />

                  <CardRow
                    className={1 % 2 !== 0 ? "evenRow" : "oddRow"}
                    fcWidth="90%"
                    firstCell="Centre"
                    secondCell={
                      clients.filter((c) =>
                        clientFilters.bookedType(c, "centre")
                      ).length
                    }
                  />

                  <CardRow
                    className={2 % 2 !== 0 ? "evenRow" : "oddRow"}
                    fcWidth="90%"
                    firstCell="Private"
                    secondCell={
                      clients.filter((c) =>
                        clientFilters.bookedType(c, "private")
                      ).length
                    }
                  />

                  <CardRow
                    className={3 % 2 !== 0 ? "evenRow" : "oddRow"}
                    fcWidth="90%"
                    firstCell="Undecided"
                    secondCell={
                      clients.filter(
                        (c) =>
                          clientFilters.bookedType(c, "") ||
                          clientFilters.bookedType(c, "n/a")
                      ).length
                    }
                  />
                </TableBody>
              </Table>
              {/* Booked Types */}

              <li style={{ marginBottom: 5 }}>
                Potential: {clients.filter(clientFilters.potential)?.length}
              </li>

              <li style={{ marginBottom: 5 }}>
                Follow-up: {clients.filter(clientFilters.followUp)?.length}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card elevation={5} sx={{ width: xs ? "100%" : "auto" }}>
          <CardHeader title="Calls" />
          <Divider />
          <CardContent>
            <ul>
              <li>
                Remaining Calls:{" "}
                {
                  clients?.filter((client) => {
                    const lastCallIndex = client.calls?.length - 1 || 0;
                    if (!client.calls || !client.calls?.length) {
                      return true;
                    } else if (lastCallIndex > 0 && lastCallIndex <= 2) {
                      if (
                        client.calls?.filter(
                          (call) =>
                            call.status === "phone-closed" ||
                            call.status === "no-answer"
                        )?.length >= 3
                      ) {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  })?.length
                }
              </li>

              <li>
                Current Month Calls:{" "}
                {clients?.reduce((acc, client) => {
                  // Check if client has calls property
                  if (client.calls) {
                    const currentMonth = new Date().getMonth();
                    const currentYear = new Date().getFullYear();

                    // Filter calls for current month and year
                    const currentMonthCalls = client.calls.filter((call) => {
                      const callDate = new Date(call.date);
                      return (
                        callDate.getMonth() === currentMonth &&
                        callDate.getFullYear() === currentYear
                      );
                    });

                    // Add the length of current month calls to accumulator
                    acc += currentMonthCalls.length;
                  }
                  return acc;
                }, 0)}
              </li>

              <li>
                {" "}
                Last Month Calls:{" "}
                {clients?.reduce((acc, client) => {
                  // Check if client has calls property
                  if (client.calls) {
                    const lastMonth = new Date().getMonth() - 1;
                    const currentYear = new Date().getFullYear();

                    // Filter calls for current month and year
                    const currentMonthCalls = client.calls.filter((call) => {
                      const callDate = new Date(call.date);
                      return (
                        callDate.getMonth() === lastMonth &&
                        callDate.getFullYear() === currentYear
                      );
                    });

                    // Add the length of current month calls to accumulator
                    acc += currentMonthCalls.length;
                  }
                  return acc;
                }, 0)}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card elevation={5} sx={{ width: xs ? "100%" : "auto" }}>
          <CardHeader
            title="Lead Sources"
            action={
              <IconButton
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={() => setLeadTable(!leadTable)}
                color={leadTable ? "error" : "primary"}
              >
                {leadTable ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            }
          />
          <Divider />
          <Collapse in={leadTable}>
            <CardContent sx={{ p: 0 }}>
              {campaigns?.map((campaign, index) => (
                <Table key={campaign.id} sx={{ mb: 2 }} size="small">
                  {campaign.campaignPlatform.map((platform, i) => (
                    <TableBody key={platform}>
                      <CardRow
                        className={i % 2 === 0 ? "evenRow" : "oddRow"}
                        fcWidth="90%"
                        firstCell={
                          <Grid
                            container
                            justifyContent="start"
                            alignItems="center"
                          >
                            <LeadSourceRenderer value={platform} />
                            {campaign.adName}
                          </Grid>
                        }
                        secondCell={
                          clients?.filter((client) => {
                            let keepClient = true;

                            if (!client.leadSource.includes(campaign.id)) {
                              keepClient = false;
                            }

                            if (!client.leadSource.includes(platform)) {
                              keepClient = false;
                            }

                            if (
                              platform === "other" &&
                              client.leadSource.includes(campaign.id)
                            ) {
                              keepClient = true;
                            }

                            return keepClient;
                          })?.length
                        }
                      />
                    </TableBody>
                  ))}
                </Table>
              ))}

              <Table size="small">
                <TableBody>
                  {["facebook", "whatsapp", "instagram", "other"].map(
                    (platform, index) => (
                      <CardRow
                        className={index % 2 === 0 ? "evenRow" : "oddRow"}
                        key={platform}
                        fcWidth="90%"
                        firstCell={
                          <LeadSourceRenderer value={platform} isCard />
                        }
                        secondCell={
                          clients?.filter(
                            (client) => client.leadSource === platform
                          )?.length
                        }
                      />
                    )
                  )}

                  <CardRow
                    fcWidth="90%"
                    firstCell={<LeadSourceRenderer value="unknown" isCard />}
                    secondCell={
                      clients?.filter(
                        (client) =>
                          client.leadSource === "n/a" ||
                          client.leadSource === ""
                      )?.length
                    }
                  />
                </TableBody>
              </Table>
            </CardContent>
          </Collapse>
          {!leadTable && (
            <CardContent>
              <Typography variant="body1" sx={{ maxWidth: xs ? 300 : 200 }}>
                The table is collapsed. Expand it using{" "}
                <ExpandMore color="primary" /> button next to the card title to
                display its content.
              </Typography>
            </CardContent>
          )}
        </Card>

        <Card elevation={5} sx={{ width: xs ? "100%" : "auto" }}>
          <CardContent>
            <Divider>Booked Client Percentages</Divider>

            <PieChart
              sx={{ mt: 1, mb: 3 }}
              {...sizing}
              series={[
                {
                  arcLabel: (params) => getArcLabel(params, bookedClients),
                  arcLabelMinAngle: 5,
                  data: [
                    ...campaigns.map((campaign) => {
                      if (
                        clients.filter((client) =>
                          bookedClientsByLeadSource(client, campaign.id)
                        )?.length
                      ) {
                        return {
                          id: campaign.id,
                          value: clients.filter((client) =>
                            bookedClientsByLeadSource(client, campaign.id)
                          )?.length,
                          label: campaign.adName,
                          color: generateRandomLightColor(),
                        };
                      }
                    }),
                    {
                      id: 0,
                      value: clients.filter((client) =>
                        bookedClientsByLeadSource(client, "whatsapp")
                      )?.length,
                      label: "WhatsApp",
                      color: "#25D366",
                    },
                    {
                      id: 1,
                      value: clients.filter((client) =>
                        bookedClientsByLeadSource(client, "facebook")
                      )?.length,
                      label: "Facebook",
                      color: "#1877F2",
                    },
                    {
                      id: 2,
                      value: clients.filter((client) =>
                        bookedClientsByLeadSource(client, "acquaintances")
                      )?.length,
                      label: "Acquaintances",
                      color: "#FFDE4D",
                    },
                    {
                      id: 3,
                      value: clients.filter((client) =>
                        bookedClientsByLeadSource(client, "other")
                      )?.length,
                      label: "Other",
                      color: "#77E4C8",
                    },
                  ],
                  innerRadius: 50,
                  outerRadius: 120,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  startAngle: -180,
                  endAngle: 180,
                  cx: 150,
                  cy: 120,
                },
              ]}
              width={300}
              height={250}
            />

            <Divider>Lead Source Percentages</Divider>

            <PieChart
              sx={{ mt: 1, mb: 3 }}
              {...sizing}
              series={[
                {
                  arcLabel: (params) => getArcLabel(params, clients.length),
                  arcLabelMinAngle: 5,
                  data: [
                    ...campaigns.map((campaign) => {
                      if (
                        clients.filter((client) =>
                          clientsByLeadSource(client, campaign.id)
                        )?.length
                      ) {
                        return {
                          id: campaign.id,
                          value: clients.filter((client) =>
                            clientsByLeadSource(client, campaign.id)
                          )?.length,
                          label: campaign.adName,
                          color: generateRandomLightColor(),
                        };
                      }
                    }),
                    {
                      id: 0,
                      value: clients.filter((client) =>
                        clientsByLeadSource(client, "whatsapp")
                      )?.length,
                      label: "WhatsApp",
                      color: "#25D366",
                    },
                    {
                      id: 1,
                      value: clients.filter((client) =>
                        clientsByLeadSource(client, "facebook")
                      )?.length,
                      label: "Facebook",
                      color: "#1877F2",
                    },
                    {
                      id: 2,
                      value: clients.filter((client) =>
                        clientsByLeadSource(client, "acquaintances")
                      )?.length,
                      label: "Acquaintances",
                      color: "#FFDE4D",
                    },
                    {
                      id: 3,
                      value: clients.filter((client) =>
                        clientsByLeadSource(client, "other")
                      )?.length,
                      label: "Other",
                      color: "#77E4C8",
                    },
                    {
                      id: 4,
                      value: clients.filter((client) =>
                        clientsByLeadSource(client, "unknown")
                      )?.length,
                      label: "Unknown",
                      color: "grey",
                    },
                  ],
                  innerRadius: 50,
                  outerRadius: 120,
                  paddingAngle: 2,
                  cornerRadius: 5,
                  startAngle: -180,
                  endAngle: 180,
                  cx: 150,
                  cy: 120,
                },
              ]}
              width={300}
              height={250}
            />
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
