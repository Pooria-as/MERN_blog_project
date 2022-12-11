import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/layout/NavBar/NavBar";
import AddEducation from "../components/Profile/AddEducation";
import AddExprience from "../components/Profile/AddExprience";
import Edit from "../components/Profile/Edit";
import CreateProfilePage from "../Page/CreateProfile/CreateProfilePage";
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

        <Route
          path="/create-profile"
          element={
            <PrivateRoute>
              <CreateProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-education"
          element={
            <PrivateRoute>
              <AddEducation />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <Edit/>
            </PrivateRoute>
          }
        />

        <Route
          path="/add-exprience"
          element={
            <PrivateRoute>
              <AddExprience />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<SingIn />} />
        <Route path="/singup" element={<SingUp />} />
      </Routes>
    </>
  );
};

export default AppRoute;
