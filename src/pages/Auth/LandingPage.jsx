import { Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import { Header } from "../../components/Header";
import { useMediaQueries } from "../../utils/functions";

const LandingPage = ({ setIsSignedIn }) => {
  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 2 }}
    >
      <Grid item>
        <Header text="Welcome to Easy English Dashboard!" />
      </Grid>

      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100%", p: 0 }}
        gap={1}
      >
        <Grid
          item
          width="49%"
          container
          justifyContent="center"
          alignItems="center"
        >
          <img
            src="https://i.imgur.com/tdEXvE6.jpg"
            width={xs ? 300 : 500}
            height={xs ? 300 : 500}
            style={{ borderRadius: 15 }}
          />
        </Grid>

        <Grid
          item
          width={xs ? "100%" : "49%"}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Login setIsSignedIn={setIsSignedIn} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
