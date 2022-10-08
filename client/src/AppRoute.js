import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar/NavBar";
import Home from "./Page/Home/Home";
import SingIn from "./Page/SingIn/SingIn";
import SingUp from "./Page/SingUp/SingUp";

const AppRoute = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SingIn />} />
        <Route path="/singup" element={<SingUp />} />
      </Routes>
    </>
  );
};

export default AppRoute;
