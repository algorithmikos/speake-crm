import React from "react";
import CustomDialog from "../../../components/Dialog/CustomDialog";
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Grid,
  IconButton,
} from "@mui/material";
import { CopyAll, Done } from "@mui/icons-material";
import CopyToClipboard from "react-copy-to-clipboard";
import { copyToClipboard } from "../../../utils/functions";

const FinaliseSellDialog = ({
  state,
  setState,
  fatherStateSetter,
  soldCoupon,
}) => {
  return (
    <CustomDialog
      title="Sold Coupon"
      open={state}
      closeButton={() => {
        fatherStateSetter(false);
        setState(false);
      }}
      content={
        <>
          <Alert severity="success">
            <AlertTitle>Successful Sale</AlertTitle>
            Give this coupon to the student:{" "}
            <Chip color="secondary" label={soldCoupon} />
            <IconButton
              onClick={() => copyToClipboard(soldCoupon, "Copied Coupon")}
            >
              <CopyAll />
            </IconButton>
          </Alert>
          <Alert severity="info" sx={{ mt: 1 }}>
            Note that you can always get the coupons sold to that student from
            "Sold Coupons" icon in student row/card actions.
          </Alert>
        </>
      }
      buttons={
        <Grid container justifyContent="center">
          <Button
            startIcon={<Done />}
            variant="contained"
            onClick={() => {
              fatherStateSetter(false);
              setState(false);
            }}
          >
            Done
          </Button>
        </Grid>
      }
    />
  );
};

export default FinaliseSellDialog;
