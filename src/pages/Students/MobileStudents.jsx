import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Table,
  TableBody,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";

import {
  copyToClipboard,
  openWhatsAppChat,
  triggerCall,
  formatDateWithTimeOrdinal,
  convertTime,
} from "../../utils/functions";

import BadgeIcon from "@mui/icons-material/Badge";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StyleIcon from "@mui/icons-material/Style";

import { formatPhoneNumber } from "../../utils/dataCleaning";
import {
  setEditStudent,
  setOldStudent,
  setSelectedStudents,
} from "../../rtk/slices/students-slice";
import CardRow from "../../components/CardRow/CardRow";
import OpenPkg from "../../components/Icons/OpenPkg";

// import MobileCRMLoader from "./MobileCRMLoader";
import TypeRenderer from "../CRM/renderers/TypeRenderer/TypeRenderer";
import MobileStudentsLoader from "./MobileStudentsLoader";

const MobileStudents = ({
  setEditStudentDialog,
  setDeleteStudentDialog,
  setSellCouponDialog,
  setStudentCouponsDialog,
  filteredStudents,
  searchTerm,
}) => {
  const dispatch = useDispatch();
  const studentsStore = useSelector((state) => state.students);
  const { selectedStudents, areStudentsLoading } = studentsStore;

  const filtersStore = useSelector((state) => state.filters);
  const { studentFilterParams } = filtersStore;

  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const studentsPerPage = 5;
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [studentFilterParams, searchTerm]);

  return (
    <Grid container gap={1} justifyContent="center">
      <Grid
        container
        gap={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Chip label={`Students: ${filteredStudents.length}`} color="success" />

        {filteredStudents.length > 0 && (
          <Pagination
            sx={{ mt: 1, mb: 1 }}
            shape="rounded"
            count={Math.ceil(filteredStudents.length / studentsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={0}
          />
        )}

        {paginatedStudents.length ? (
          paginatedStudents.map((student) => (
            <Card
              key={student.id}
              elevation={5}
              onDoubleClick={() => {
                if (selectedStudents.includes(student.id)) {
                  const updatedselectedStudents = [...selectedStudents].filter(
                    (id) => id !== student.id
                  );
                  dispatch(setSelectedStudents(updatedselectedStudents));
                } else {
                  const updatedselectedStudents = [
                    ...selectedStudents,
                    student.id,
                  ];
                  dispatch(setSelectedStudents(updatedselectedStudents));
                }
              }}
              sx={{
                width: 350,
                backgroundColor:
                  selectedStudents.includes(student.id) && "#f1f2f3",
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
                      {student.name || "Unknown"}
                    </Grid>

                    <Alert
                      severity="info"
                      icon={<BadgeIcon />}
                      sx={{
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      {student.studentId}
                    </Alert>
                  </Grid>
                }
              />
              <Divider />
              <CardContent sx={{ p: 0 }}>
                <Table size="small">
                  <TableBody>
                    <CardRow
                      firstCell="Tel"
                      secondCell={formatPhoneNumber(student.phoneNum)}
                    />

                    {student.area && student.area !== "n/a" && (
                      <CardRow firstCell="Area" secondCell={student.area} />
                    )}

                    {student.category && student.category !== "n/a" && (
                      <CardRow
                        firstCell="Category"
                        secondCell={student.category}
                      />
                    )}

                    {student.class && student.class !== "n/a" && (
                      <CardRow
                        firstCell="Class"
                        secondCell={
                          classes.find(
                            (sessionClass) => sessionClass.id === student.class
                          ) ? (
                            <Grid container alignItems="center" gap={0.5}>
                              <Grid item>
                                [{" "}
                                <strong>
                                  {classes
                                    .find(
                                      (sessionClass) =>
                                        sessionClass.id === student.class
                                    )
                                    ?.days?.join(" - ")}
                                </strong>{" "}
                                ]
                              </Grid>
                              <Grid item>
                                {convertTime(
                                  classes.find(
                                    (sessionClass) =>
                                      sessionClass.id === student.class
                                  )?.startTime
                                )}{" "}
                                :{" "}
                              </Grid>
                              <Grid item>
                                {convertTime(
                                  classes.find(
                                    (sessionClass) =>
                                      sessionClass.id === student.class
                                  )?.endTime
                                )}
                              </Grid>
                              <Grid item>
                                {
                                  <TypeRenderer
                                    value={
                                      classes.find(
                                        (sessionClass) =>
                                          sessionClass.id === student.class
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

                    {student.type && student.type !== "n/a" && (
                      <CardRow
                        firstCell="Type"
                        secondCell={<TypeRenderer value={student.type} />}
                      />
                    )}

                    {student.notes && (
                      <CardRow
                        firstCell="Notes"
                        secondCell={student.notes}
                        sc={student.notes}
                      />
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <Divider />
              <CardActions>
                <Grid container justifyContent="space-between">
                  <ButtonGroup>
                    <Tooltip title="Edit Student">
                      <IconButton
                        color="info"
                        onClick={() => {
                          dispatch(setEditStudent(student));
                          setEditStudentDialog(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Student">
                      <IconButton
                        color="error"
                        onClick={() => {
                          dispatch(setEditStudent(student));
                          setDeleteStudentDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>

                    <IconButton
                      color="success"
                      onClick={() => {
                        dispatch(setEditStudent(student));
                        setStudentCouponsDialog(true);
                      }}
                    >
                      <Tooltip title="Student Coupons">
                        <StyleIcon fontSize="inherit" />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      color="secondary"
                      onClick={() => {
                        dispatch(setEditStudent(student));
                        setSellCouponDialog(true);
                      }}
                    >
                      <Tooltip title="Sell Coupon">
                        <ShoppingCartIcon fontSize="inherit" />
                      </Tooltip>
                    </IconButton>
                  </ButtonGroup>

                  <ButtonGroup>
                    <IconButton
                      onClick={() => triggerCall(student.phoneNum)}
                      sx={{ color: "black" }}
                      disabled={!student.phoneNum}
                    >
                      <Tooltip title="Make a call">
                        <PhoneEnabledIcon fontSize="inherit" />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      onClick={() => openWhatsAppChat(student.phoneNum)}
                      disabled={!student.phoneNum}
                    >
                      <Tooltip title="Start a conversation">
                        <WhatsAppIcon
                          fontSize="inherit"
                          sx={{ color: student.phoneNum && "#25D366" }}
                        />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      sx={{ color: "black" }}
                      onClick={() => copyToClipboard(student.phoneNum)}
                      disabled={!student.phoneNum}
                    >
                      <Tooltip title="Copy number">
                        <ContentCopyIcon fontSize="inherit" />
                      </Tooltip>
                    </IconButton>
                  </ButtonGroup>
                </Grid>
              </CardActions>
            </Card>
          ))
        ) : areStudentsLoading ? (
          Array(5)
            .fill(null)
            .map((_, index) => <MobileStudentsLoader key={index} />)
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
          label={`Students: ${filteredStudents.length}`}
          color="success"
          sx={{ mt: 1 }}
        />

        {filteredStudents.length > 0 && (
          <Pagination
            sx={{ mt: 1 }}
            shape="rounded"
            count={Math.ceil(filteredStudents.length / studentsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={0}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default MobileStudents;
