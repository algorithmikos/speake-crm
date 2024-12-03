import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import MainLayout from "./components/Layouts/Main/MainLayout";
import ServerListener from "./backend/listeners/ServerListener";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import { auth } from "./firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { Backdrop, Grid, Typography } from "@mui/material";
import WindToyIcon from "./components/Icons/WindToyIcon";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ProfessorIcon from "./components/Icons/ProfessorIcon";
import Typewriter from "./components/Typewriter/Typewriter";

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(
    localStorage.getItem("is_app_loaded") === "true"
  );

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("is_logged_in") === "true"
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setIsAppLoading(false);
        setIsSignedIn(true);
        localStorage.setItem("is_logged_in", "true");
        localStorage.setItem("is_app_loaded", "false");
        const uid = user.uid;
      } else {
        // User is signed out
        setIsAppLoading(false);
        setIsSignedIn(false);
        localStorage.removeItem("is_logged_in");
        localStorage.removeItem("is_app_loaded");
      }
    });
  });

  const dispatch = useDispatch();
  const UiStore = useSelector((state) => state.UI);
  const { theme } = UiStore;

  const darkTheme = createTheme({
    palette: {
      mode: `${theme}`,
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {isAppLoading ? (
          <Backdrop
            sx={{
              bgcolor: "white",
              color: "black",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isAppLoading}
            onClick={() => {}}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <ProfessorIcon width={250} height={150} className="fadingIn" />
              <Typewriter />
            </Grid>
          </Backdrop>
        ) : (
          <>
            <ToastContainer />
            {isSignedIn && <ServerListener />}
            {isSignedIn ? (
              <MainLayout />
            ) : (
              <AuthRoutes setIsSignedIn={setIsSignedIn} />
            )}
          </>
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
