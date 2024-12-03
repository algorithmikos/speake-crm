import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditStudent, setStudents } from "../../rtk/slices/students-slice";

import {
  Alert,
  AlertTitle,
  Grid,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../components/Overlays/NoRowsOverlay";
import {
  copyToClipboard,
  openWhatsAppChat,
  triggerCall,
  useMediaQueries,
} from "../../utils/functions";
import { formatPhoneNumber } from "../../utils/dataCleaning";

import TypeRenderer from "../CRM/renderers/TypeRenderer/TypeRenderer";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import StyleIcon from "@mui/icons-material/Style";

import EditStudentDialog from "./dialogs/EditStudentDialog";
import SellCouponDialog from "./dialogs/SellCouponDialog";
import MobileStudents from "./MobileStudents";
import StudentCoupons from "./dialogs/StudentCoupons";
import ClassRenderer from "../Classes/renderers/ClassRenderer/ClassRenderer";

const Students = () => {
  const dispatch = useDispatch();
  const studentsStore = useSelector((state) => state.students);
  const { students } = studentsStore;

  const [filteredStudents, setFilteredStudents] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [editStudentDialog, setEditStudentDialog] = useState(false);
  const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
  const [sellCouponDialog, setSellCouponDialog] = useState(false);
  const [studentCouponsDialog, setStudentCouponsDialog] = useState(false);

  const { xs, sm, md, lg, xl } = useMediaQueries();

  const columns = [
    {
      field: "studentId",
      headerName: "ID",
      width: 40,
    },
    {
      field: "name",
      headerName: "Name",
      width: 120,
    },
    {
      field: "phoneNum",
      headerName: "Phone No.",
      sortable: false,
      width: 120,
      renderCell: (params) => formatPhoneNumber(params.value),
    },
    {
      field: "type",
      headerName: "Type",
      width: 80,
      renderCell: (params) => <TypeRenderer value={params.value} />,
    },
    {
      field: "class",
      headerName: "Class",
      width: 80,
      renderCell: (params) => <ClassRenderer classId={params.value} />,
    },
    {
      field: "category",
      headerName: "Category",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 240,
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
              color="secondary"
              onClick={() => {
                dispatch(setEditStudent(params.row));
                setSellCouponDialog(true);
              }}
            >
              <Tooltip title="Sell Coupon">
                <ShoppingCartIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>

            <IconButton
              size="small"
              color="success"
              onClick={() => {
                dispatch(setEditStudent(params.row));
                setStudentCouponsDialog(true);
              }}
            >
              <Tooltip title="Student Coupons">
                <StyleIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>

            <IconButton
              size="small"
              color="info"
              onClick={() => {
                dispatch(setEditStudent(params.row));
                setEditStudentDialog(true);
              }}
            >
              <Tooltip title="Edit Student">
                <EditIcon fontSize="inherit" />
              </Tooltip>
            </IconButton>

            <Tooltip title="Delete Student">
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

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  return (
    <Paper elevation={0} sx={{ mt: 10 }}>
      {/* Table of students start */}
      {!xs && (
        <DataGrid
          columns={columns}
          rows={students}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          sx={{ "--DataGrid-overlayHeight": "200px" }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                phoneNum: false,
                area: false,
              },
            },
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        />
      )}
      {/* Table of students End */}

      {/* Cards of students Start */}
      {xs && (
        <MobileStudents
          setEditStudentDialog={setEditStudentDialog}
          setDeleteStudentDialog={setDeleteStudentDialog}
          setSellCouponDialog={setSellCouponDialog}
          setStudentCouponsDialog={setStudentCouponsDialog}
          filteredStudents={filteredStudents}
          searchTerm={searchTerm}
        />
      )}
      {/* Cards of students End */}

      <EditStudentDialog
        state={editStudentDialog}
        setState={setEditStudentDialog}
      />

      <SellCouponDialog
        state={sellCouponDialog}
        setState={setSellCouponDialog}
      />

      <StudentCoupons
        state={studentCouponsDialog}
        setState={setStudentCouponsDialog}
      />
    </Paper>
  );
};

export default Students;
