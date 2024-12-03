import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import CustomDialog from "../../../components/Dialog/CustomDialog";
import SellCouponForm from "../forms/SellCouponForm";

import SellIcon from "@mui/icons-material/Sell";
import {
  setEditStudent,
  setPurchase,
} from "../../../rtk/slices/students-slice";
import { updateSessionPostPurchase } from "../../../backend/sessions";
import { updateStudent } from "../../../backend/students";
import FinaliseSellDialog from "./FinaliseSellDialog";
import { serverTimestamp } from "firebase/firestore";

const SellCouponDialog = ({ state, setState }) => {
  const dispatch = useDispatch();
  const studentsStore = useSelector((state) => state.students);
  const { editStudent, purchase } = studentsStore;

  const sessionsStore = useSelector((state) => state.sessions);
  const { sessions } = sessionsStore;

  const [isSaving, setIsSaving] = useState(false);

  const [finaliseSellDialog, setFinaliseSellDialog] = useState();
  const [soldCoupon, setSoldCoupon] = useState("");
  return (
    <>
      <CustomDialog
        title="Sell student a coupon"
        content={<SellCouponForm />}
        open={state}
        closeButton={() => setState(false)}
        buttons={
          <Grid container justifyContent="center">
            <LoadingButton
              disabled={
                (!purchase.session && !purchase.sessionConfirmation) ||
                purchase.session !== purchase.sessionConfirmation
              }
              variant="contained"
              loading={isSaving}
              loadingPosition="start"
              startIcon={<SellIcon />}
              onClick={async () => {
                setIsSaving(true);
                const session = sessions.find(
                  (session) => session.id === purchase.session
                );
                const couponToSell = session.coupons[0];
                setSoldCoupon(couponToSell);

                const studentSession = {
                  sessionId: session.id,
                  coupon: couponToSell,
                  purchasedAt: Number(new Date()),
                };

                if (purchase.note) {
                  studentSession.note = purchase.note;
                }

                let studentSessions = [];
                if (editStudent.sessions) {
                  studentSessions = editStudent.sessions;
                }

                const student = {
                  ...editStudent,
                  sessions: [...studentSessions, studentSession],
                };

                updateStudent(student, student.phoneNum)
                  .then(async () => {
                    await updateSessionPostPurchase(session, couponToSell);
                    setIsSaving(false);
                    dispatch(setEditStudent({}));
                    dispatch(setPurchase({}));
                    setFinaliseSellDialog(true);
                  })
                  .catch((e) => {
                    console.warn(e);
                    setIsSaving(false);
                  });
              }}
            >
              Sell
            </LoadingButton>
          </Grid>
        }
      />
      <FinaliseSellDialog
        state={finaliseSellDialog}
        setState={setFinaliseSellDialog}
        fatherStateSetter={setState}
        soldCoupon={soldCoupon}
      />
    </>
  );
};

export default SellCouponDialog;
