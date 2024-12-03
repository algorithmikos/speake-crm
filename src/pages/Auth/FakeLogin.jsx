import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

const FakeLogin = () => {
  const utilsStore = useSelector((state) => state.utils);
  const { isSignedIn } = utilsStore;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn]);

  return <div></div>;
};

export default FakeLogin;
