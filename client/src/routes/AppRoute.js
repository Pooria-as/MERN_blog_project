import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/layout/NavBar/NavBar";
import Dashboard from "../Page/Dashboard/Dashboard";
import Home from "../Page/Home/Home";
import SingIn from "../Page/SingIn/SingIn";
import SingUp from "../Page/SingUp/SingUp";
import { userLoad } from "../store/actions/Auth";
import setAuthToken from "../utilities/SetAuthToken";
import PrivateRoute from "./PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const AppRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLoad());
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/login" element={<SingIn />} />
        <Route path="/singup" element={<SingUp />} />
      </Routes>
    </>
  );
};

export default AppRoute;
