import React from "react";
import { Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";

import Father from "../components/Father";

import CRM from "../pages/CRM/CRM";
import Classes from "../pages/Classes/Classes";
import TemplateReplies from "../pages/TemplateReplies/TemplateReplies";

import { Page404 } from "../pages/Page404";

import Test from "../pages/Test/Test";

import Dashboard from "../pages/Dashboard/Dashboard";
import Marketing from "../pages/Marketing/Marketing";
import Admin from "../pages/Admin/Admin";
import Changelog from "../pages/Changelog/Changelog";
import FakeLogin from "../pages/Auth/FakeLogin";
import Settings from "../pages/Settings/Settings";
import Students from "../pages/Students/Students";
import Sessions from "../pages/Sessions/Sessions";

const AppRoutes = () => {
  const appRoutes = [
    {
      path: "/",
      element: <Dashboard />,
    },

    { path: "/crm", element: <CRM /> },
    { path: "/marketing", element: <Marketing /> },
    { path: "/replies", element: <TemplateReplies /> },

    { path: "/students", element: <Students /> },
    { path: "/classes", element: <Classes /> },
    { path: "/sessions", element: <Sessions /> },

    { path: "/settings", element: <Settings /> },

    { path: "/changelog", element: <Changelog /> },

    { path: "/test", element: <Test /> },

    { path: "/admin", element: <Admin /> },

    { path: "/login", element: <FakeLogin /> },

    { path: "*", element: <Page404 /> },
  ];

  const Wrapper = ({ component }) => {
    return (
      <Father>
        <Grid item m={2} mt={2}>
          {component}
        </Grid>
      </Father>
    );
  };

  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<Wrapper component={route.element} />}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
