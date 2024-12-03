import { signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import { setTheme } from "../../rtk/slices/ui-slice";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useMediaQueries } from "../../utils/functions";

const Settings = () => {
  const dispatch = useDispatch();
  const UiStore = useSelector((state) => state.UI);
  const { theme } = UiStore;

  const [currentDisplayName, setCurrentDisplayName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { xs, sm, md, lg, xl } = useMediaQueries();

  useEffect(() => {
    setTimeout(() => {
      setCurrentDisplayName(auth?.currentUser?.displayName);
      setDisplayName(auth?.currentUser?.displayName);
    }, 500);
  }, []);

  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 10 }}
    >
      <Grid
        container
        justifyContent={xs ? "center" : "space-between"}
        alignItems="center"
        gap={1}
        px={2}
      >
        <Typography variant="h3" component="h1">
          Welcome, {currentDisplayName || "Agent"}!
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        >
          Log out
        </Button>
      </Grid>

      <Divider>Theme</Divider>

      <ToggleButtonGroup
        value={theme}
        onChange={(e, value) => {
          dispatch(setTheme(value));
        }}
        exclusive
      >
        <ToggleButton value="light">
          <LightMode />
        </ToggleButton>

        <ToggleButton value="dark">
          <DarkMode />
        </ToggleButton>
      </ToggleButtonGroup>

      <Divider>Profile</Divider>

      <Grid container justifyContent="center" alignItems="center" gap={1}>
        <TextField
          size="small"
          label="Display Name"
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
        <LoadingButton
          disabled={displayName === currentDisplayName || !displayName}
          variant="outlined"
          loading={isLoading}
          onClick={() => {
            setIsLoading(true);
            updateProfile(auth.currentUser, {
              displayName: displayName,
              // photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                toast.success("Updated display name successfully");
                setIsLoading(false);
              })
              .catch((error) => {
                setIsLoading(false);
              });
          }}
        >
          Save
        </LoadingButton>
      </Grid>
    </Stack>
  );
};

export default Settings;
