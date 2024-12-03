import React, { useEffect, useState } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setClasses } from "../../rtk/slices/classes-slice";
import NewClassDialog from "./dialogs/NewClassDialog";
import TypeRenderer from "../CRM/renderers/TypeRenderer/TypeRenderer";
import { convertTime, useMediaQueries } from "../../utils/functions";
import MobileClasses from "./MobileClasses";

const Classes = () => {
  const dispatch = useDispatch();
  const classesStore = useSelector((state) => state.classes);
  const { classes } = classesStore;

  const [classesLoading, setClassesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [createClassDialog, setCreateClassDialog] = useState(false);

  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 40,
      valueGetter: (value) => {
        return `${
          classes.indexOf(
            classes.find((sessionClass) => sessionClass.id === value)
          ) + 1
        }`;
      },
    },
    {
      field: "days",
      headerName: "Days",
      width: 140,
      renderCell: (params) => {
        const classDays = [...params.value].sort(
          (a, b) => days.indexOf(a) - days.indexOf(b)
        );
        let string = [];
        for (let i = 0; i < classDays.length; i++) {
          if (classDays.length - 1 === i) {
            string.push(`and ${classDays[i]}`);
            return string;
          }
          if (classDays.length - 2 === i) {
            string.push(`${classDays[i]} `);
          } else {
            string.push(`${classDays[i]}, `);
          }
        }
        return string;
      },
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 80,
      valueGetter: (value) => convertTime(value),
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 80,
      valueGetter: (value) => convertTime(value),
    },
    {
      field: "place",
      headerName: "Place",
      width: 120,
      renderCell: (params) => (
        <TypeRenderer value={params.value} className="text-center" />
      ),
    },
  ];

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Paper elevation={0} sx={{ mt: 10 }}>
      <Grid container justifyContent="center">
        <Button
          sx={{ mt: xs ? 0 : 1, mb: 2 }}
          variant="contained"
          onClick={() => setCreateClassDialog(true)}
        >
          Create Class
        </Button>
      </Grid>

      {!xs && classes.length && (
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            // loading={classesLoading}
            rows={classes?.filter((client) => {
              // Loop through each key-value pair in the client object
              for (const key in client) {
                // Convert the value to a string for case-insensitive search (optional)
                const valueString =
                  typeof client[key] === "string"
                    ? client[key]
                    : JSON.stringify(client[key]);

                // Check if the searchTerm is included in the current field value (case-insensitive)
                if (
                  valueString.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return true; // Include the client if a match is found
                }
              }

              // If no match found in any field, return false (exclude the client)
              return false;
            })}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setSelectedRows(newRowSelectionModel);
            }}
            rowSelectionModel={selectedRows}
          />
        </div>
      )}

      {xs && classes.length && <MobileClasses searchTerm={searchTerm} />}
      <NewClassDialog
        state={createClassDialog}
        setState={setCreateClassDialog}
      />
    </Paper>
  );
};

export default Classes;
