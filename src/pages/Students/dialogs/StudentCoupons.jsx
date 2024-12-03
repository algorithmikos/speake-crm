import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TextField,
} from "@mui/material";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import { CopyAll } from "@mui/icons-material";
import {
  copyToClipboard,
  formatDateWithTimeOrdinal,
  useMediaQueries,
} from "../../../utils/functions";
import CardRow from "../../../components/CardRow/CardRow";
import XsView from "../../../components/XsView/XsView";

const StudentCoupons = ({ state, setState }) => {
  const studentsStore = useSelector((state) => state.students);
  const { editStudent } = studentsStore;

  const sessionsStore = useSelector((state) => state.sessions);
  const { sessions } = sessionsStore;

  const { xs, sm, md, lg, xl } = useMediaQueries();

  const getSessionTitle = (sessionId) => {
    const session = sessions.find((session) => session.id === sessionId);
    if (session) {
      return `S${session?.type[0].toUpperCase()}-${String(
        session?.createdAt
      ).slice(-4)} - ${session?.category}`;
    } else {
      return "Deleted Session";
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSessions, setFilteredSessions] = useState([]);

  useEffect(() => {
    setFilteredSessions(editStudent.sessions);
  }, [editStudent]);

  useEffect(() => {
    const filteredSessions = editStudent.sessions?.filter((session) =>
      getSessionTitle(session.sessionId).includes(searchTerm)
    );
    setFilteredSessions(filteredSessions);
  }, [searchTerm]);

  return (
    <CustomDialog
      title="Student Sessions"
      open={state}
      closeButton={() => setState(false)}
      content={
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          mt={1}
          gap={1}
        >
          <TextField
            label="Search"
            sx={{ width: xs ? "100%" : "65%" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredSessions?.map((session, index) => (
            <XsView
              key={session.sessionId}
              itemBadgeName={getSessionTitle(session.sessionId)}
              showItemBadgeId={false}
              showActionArea={false}
              item={session}
              rows={[
                {
                  firstCell: "Coupon",
                  secondCell: (
                    <>
                      <Chip color="success" label={session.coupon} />
                      <IconButton
                        onClick={() =>
                          copyToClipboard(
                            session.coupon,
                            `Copied Coupon: ${session.coupon}`
                          )
                        }
                      >
                        <CopyAll />
                      </IconButton>
                    </>
                  ),
                },
                {
                  firstCell: "Purchased",
                  secondCell:
                    formatDateWithTimeOrdinal(new Date(session.purchasedAt)) ||
                    "Unknown",
                  value: session.purchasedAt,
                  hideEmpty: true,
                },
                {
                  firstCell: "Note",
                  secondCell: session.note,
                  value: session.note,
                  hideEmpty: true,
                },
              ]}
            />
          ))}
        </Grid>
      }
    />
  );
};

export default StudentCoupons;
