import LoginOutlined from "@mui/icons-material/LoginOutlined";
import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleFirebaseAuthErrors } from "../Test/handleErrorCodes";

const Login = ({ width, setIsSignedIn }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;

  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLogin = () => {
    setIsSigningIn(true);
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setIsSignedIn(true);
            setIsSigningIn(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            handleFirebaseAuthErrors(errorCode);
            setIsSigningIn(false);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        handleFirebaseAuthErrors(errorCode);
        setIsSigningIn(false);
      });
  };

  return (
    <Card
      elevation={7}
      sx={{
        // height: 500,
        width: "80%",
        // background: "linear-gradient(90deg, #fad000, #ffd700, #f5e694)",
      }}
    >
      <CardHeader
        title="Log-in"
        titleTypographyProps={{ className: "app-font" }}
      />
      <Divider />
      <CardContent>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <TextField
            fullWidth
            label="E-Mail"
            value={username}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />

          <TextField
            fullWidth
            label="Password"
            value={password}
            type="password"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </Grid>
      </CardContent>
      <Divider />

      <CardActions>
        <Grid container alignItems="end" justifyContent="center">
          <LoadingButton
            variant="contained"
            size="large"
            startIcon={<LoginOutlined />}
            loadingPosition="start"
            loading={isSigningIn}
            onClick={handleLogin}
          >
            Login
          </LoadingButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Login;
