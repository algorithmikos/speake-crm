import React from "react";
import CardRow from "../../components/CardRow/CardRow";
import {
  Alert,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  Tooltip,
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TtyIcon from "@mui/icons-material/Tty";

const MobileCRMLoader = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item width="50%">
              <Skeleton animation="wave" />
            </Grid>

            <Alert
              severity="info"
              icon={<BadgeIcon />}
              sx={{
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              <Skeleton animation="wave" width={20} />
            </Alert>
          </Grid>
        }
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        <Table size="small">
          <TableBody>
            {[
              "Tel",
              "Area",
              "Source",
              "Calls",
              "Called",
              "Status",
              "Priority",
              "Class",
              "Place",
            ].map((item) => (
              <CardRow
                key={item}
                firstCell={item}
                secondCell={<Skeleton animation="wave" />}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justifyContent="space-between">
          <ButtonGroup>
            <Tooltip title="Edit Selected Client">
              <IconButton color="info">
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Client Calls">
              <IconButton color="secondary">
                <TtyIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Selected Client">
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>

          <ButtonGroup>
            <IconButton sx={{ color: "black" }}>
              <Tooltip title="Make a call">
                <PhoneEnabledIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>

            <IconButton>
              <Tooltip title="Start a conversation">
                <WhatsAppIcon fontSize="inherit" sx={{ color: "#25D366" }} />
              </Tooltip>
            </IconButton>

            <IconButton sx={{ color: "black" }}>
              <Tooltip title="Copy number">
                <ContentCopyIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>
          </ButtonGroup>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default MobileCRMLoader;
