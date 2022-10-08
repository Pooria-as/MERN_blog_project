import React, { useEffect } from "react";
import LogIn from "../../components/Login/LogIn";

const SingIn = () => {
  useEffect(() => {
    document.title = "Login";
  });
  return (
    <>
      <LogIn />
    </>
  );
};

export default SingIn;
