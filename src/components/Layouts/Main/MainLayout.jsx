import * as React from "react";
import "./MainLayout.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import SideBar from "../../Sidebar/SideBar";

import AppRoutes from "../../../routes/appRoutes";

import { version } from "../../../../package.json";
import { Drawer, Grid, useScrollTrigger } from "@mui/material";
import { useMediaQueries } from "../../../utils/functions";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CutsomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function HideAppBarOnScroll({ handleDrawerOpen, handleDrawerClose, open, xs }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        background:
          "linear-gradient(90deg, rgb(250, 208, 0), rgb(255, 215, 0), rgb(245, 230, 148))",
        width: "100%",
        display: xs && trigger ? "none" : "block",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            open ? handleDrawerClose() : handleDrawerOpen();
          }}
          edge="start"
          sx={{
            marginRight: 2,
            color: "black",
            // ...(open && { display: "none" }),
          }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Grid container alignItems="center" gap={1}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="black"
            className="app-font"
            fontWeight="bold"
          >
            Speak-E & Easy English
          </Typography>
          <Typography
            variant="body2"
            noWrap
            component="div"
            color="black"
            className="app-font"
            fontWeight="bold"
          >
            v. {version}
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default function MainLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { xs, sm, md, lg, xl } = useMediaQueries();

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />

      <HideAppBarOnScroll
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        open={open}
        xs={xs}
      />

      {xs ? (
        <Drawer
          variant="temporary"
          open={open}
          onTouchEnd={handleDrawerClose}
          PaperProps={{ className: "mobile-drawer" }}
        >
          <Divider />
          <SideBar />
        </Drawer>
      ) : (
        <CutsomDrawer
          variant="permanent"
          open={open}
          onMouseLeave={handleDrawerClose}
        >
          <Divider />
          <SideBar />
        </CutsomDrawer>
      )}
      <AppRoutes />
      {/* <Box component="main" sx={{ flexGrow: 1 }}>
        <AppRoutes />
      </Box> */}
    </Box>
  );
}
