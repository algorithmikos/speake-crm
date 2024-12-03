import React, { useEffect, useState } from "react";
import "./Test.css";
import {
  Alert,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Paper,
  TextField,
  Divider,
} from "@mui/material";
import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { handleFirestoreErrors } from "./handleErrorCodes";

function Test() {
  // const assetId = "309348712253542";
  // const businessId = "389559414232471";
  // const selectedItemId = "399052433285451";
  // const threadType = "WEC_MESSAGE" || "FB_MESSAGE";

  // const msgLink = `https://business.facebook.com/latest/inbox/all?asset_id=${assetId}&business_id=${businessId}&mailbox_id=&selected_item_id=${selectedItemId}&thread_type=${threadType}`;

  // `https://business.facebook.com/latest/inbox/all?asset_id=309348712253542&business_id=389559414232471&mailbox_id=&selected_item_id=100081299890259&thread_type=FB_MESSAGE`;

  // `https://business.facebook.com/latest/inbox/all?asset_id=309348712253542&business_id=389559414232471&mailbox_id=&selected_item_id=100070986041399&thread_type=FB_MESSAGE`

  // `https://business.facebook.com/latest/inbox/all?asset_id=309348712253542&business_id=389559414232471&mailbox_id=&selected_item_id=100081299890259&thread_type=FB_MESSAGE`;

  const deleteStudent = async () => {
    const umarDocId = "K7E01mI9SkrRqHCHPvJT";

    try {
      await deleteDoc(doc(db, "students", umarDocId));
    } catch (e) {
      console.warn(e.code);
      handleFirestoreErrors(e.code);
    }
  };

  const [userId, setUserId] = useState("");

  return (
    <Paper sx={{ p: 5, mt: 10 }} elevation={0}>
      <Divider>Write to userGroups</Divider>
      <TextField
        label="Add Admin"
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      />
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          deleteStudent();
        }}
      >
        Delete
      </Button>
    </Paper>
  );
}

export default Test;
