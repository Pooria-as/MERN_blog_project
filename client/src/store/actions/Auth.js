import axios from "axios";
import setAuthToken from "../../utilities/SetAuthToken";
import {
  AUTH_ERROR,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../typs";
import { setAlert } from "./Alert";
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const userData = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: userData.data,
      });
    } catch (err) {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({ type: REGISTER_FAILED });
    }
  };

export const userLoad = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const UserData = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: UserData.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.mesg,
    });
  }
};
