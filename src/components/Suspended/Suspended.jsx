import { Alert, AlertTitle, Backdrop, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Suspended = ({
  target = "/",
  targetSentence = "get back to home page",
  component,
}) => {
  const [open, setOpen] = useState(true);
  const [devClicks, setDevClicks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (devClicks === 5) {
      setOpen(false);
      toast("Development Mode Activated", { theme: "dark" });
    }
  }, [devClicks]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Grid container justifyContent="center" width="50%">
          <Alert
            severity="warning"
            sx={{ fontSize: 20, fontWeight: "bold" }}
            className="app-font"
          >
            <AlertTitle
              sx={{ fontSize: 20, fontWeight: "bold" }}
              className="app-font"
              onClick={() => {
                setDevClicks((prev) => prev + 1);
              }}
            >
              Under Maintenance
            </AlertTitle>
            This section is currently under maintenance, please revisit it in a
            newer version or contact the developer.{" "}
            <a
              style={{
                color: "#0d6efd",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate(target)}
            >
              For now you can {targetSentence}
            </a>
            .
          </Alert>
        </Grid>
      </Backdrop>
      {component}
    </>
  );
};

export default Suspended;
