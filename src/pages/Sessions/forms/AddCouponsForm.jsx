import React from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";

const AddCouponsForm = ({ state, setState }) => {
  const dispatch = useDispatch();

  return (
    <TextField
      label="New Coupons"
      fullWidth
      multiline
      minRows={3}
      placeholder={
        "Separate coupons by new line. Example:\nCoupon 1\nCoupon 2\nCoupon 3\nCoupon ..."
      }
      onBlur={(e) => {
        const newCoupons = e.target.value
          .split("\n")
          .filter((line) => line !== "");

        let existingCoupons;
        if (state.coupons) {
          existingCoupons = [...state.coupons];
        } else {
          existingCoupons = [];
        }

        const session = {
          ...state,
          coupons: [...new Set([...existingCoupons, ...newCoupons])],
        };
        dispatch(setState(session));
      }}
    />
  );
};

export default AddCouponsForm;
