import {
  Alert,
  AlertTitle,
  Autocomplete,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPurchase } from "../../../rtk/slices/students-slice";

const SellCouponForm = () => {
  const dispatch = useDispatch();
  const sessionsStore = useSelector((state) => state.sessions);
  const { sessions } = sessionsStore;

  const studentsStore = useSelector((state) => state.students);
  const { editStudent, purchase } = studentsStore;

  const purchasableSessions = (session) => {
    if (!session.coupons || session.coupons.length === 0) {
      return false; // No coupons, not purchasable
    }

    if (
      editStudent.sessions?.find(
        (studentSession) => studentSession.sessionId === session.id
      )
    ) {
      return false; // Student already has a session matching a coupon
    }

    return true; // All coupons are valid for purchase
  };

  const options = sessions.filter(purchasableSessions).map((session) => ({
    id: session.id,
    label: `S${session.type[0].toUpperCase()}-${String(session.createdAt).slice(
      -4
    )} - ${session.category}`,
  }));

  const getOptionLabel = (optionId) => {
    return options.find((option) => option.id === optionId)?.label;
  };

  return (
    <Grid container mt={1} gap={1}>
      {sessions.filter(purchasableSessions).length > 0 ? (
        <Autocomplete
          fullWidth
          disablePortal
          id="sessionPurchase"
          options={options}
          value={getOptionLabel(purchase?.sessionConfirmation)}
          onChange={(e, newValue) => {
            const purchaseObject = { ...purchase, session: newValue?.id };
            dispatch(setPurchase(purchaseObject));
          }}
          renderInput={(params) => <TextField {...params} label="Session" />}
        />
      ) : (
        <Alert severity="warning" sx={{ width: "100%" }}>
          <AlertTitle>No Sessions Available!</AlertTitle>
          There are no sessions that can be sold to this student.
        </Alert>
      )}
      {purchase.session && (
        <Autocomplete
          fullWidth
          disablePortal
          id="sessionPurchaseConfirmation"
          options={options}
          value={getOptionLabel(purchase?.sessionConfirmation) || ""}
          onChange={(e, newValue) => {
            const purchaseObject = {
              ...purchase,
              sessionConfirmation: newValue?.id,
            };
            dispatch(setPurchase(purchaseObject));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Session Confirmation" />
          )}
        />
      )}
      {purchase.sessionConfirmation && (
        <TextField
          fullWidth
          label="Sale Note"
          defaultValue={purchase.note || ""}
          onBlur={(e) => {
            const purchaseObject = {
              ...purchase,
              note: e.target.value,
            };
            dispatch(setPurchase(purchaseObject));
          }}
        />
      )}
    </Grid>
  );
};

export default SellCouponForm;
