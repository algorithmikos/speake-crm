import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Page404 } from "../pages/Page404";

import Login from "../pages/Auth/Login";
import LandingPage from "../pages/Auth/LandingPage";
import Test from "../pages/Test/Test";

const AuthRoutes = ({ setIsSignedIn }) => {
  const RedirectToHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate("/");
    }, []);
    return <div id="redirection"></div>;
  };

  const authRoutes = [
    {
      path: "/",
      element: <LandingPage setIsSignedIn={setIsSignedIn} />,
    },

    { path: "/test", element: <Test /> },
    
    { path: "*", element: <RedirectToHome /> },
  ];

  return (
    <Routes>
      {authRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AuthRoutes;
