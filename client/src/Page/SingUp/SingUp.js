import React, { useEffect } from "react";
import Register from "../../components/SingUp/Register";
const SingUp = () => {
  useEffect(() => {
    document.title = "Register";
  });
  return (
    <>
      <Register />
    </>
  );
};

export default SingUp;
