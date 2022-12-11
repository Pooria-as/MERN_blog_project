import axios from "axios";
import setAuthToken from "../../utilities/SetAuthToken";
import {
  AUTH_ERROR,
  CLEAR_PROFILE,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../typs";
import { setAlert } from "./Alert";

//Register USER
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const bodyData = JSON.stringify({ name, email, password });

    try {
      const response = await axios.post("/api/users", bodyData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      dispatch(userLoad());
    } catch (err) {
      const errors = err.response;
      if (errors) {
        dispatch(setAlert(errors.data, "danger"));
      }
      dispatch({ type: REGISTER_FAILED });
    }
  };

//UserLoad
export const userLoad = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const response = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    dispatch(userLoad());
  } catch (err) {
    const errors = err.response;
    if (errors) {
      dispatch(setAlert(errors.data, "danger"));
    }
    dispatch({ type: LOGIN_FAILED });
  }
};

//logut
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });

  dispatch({
    type: CLEAR_PROFILE,
  });
};
