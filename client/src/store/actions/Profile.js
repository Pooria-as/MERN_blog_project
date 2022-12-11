import axios from "axios";
import { CREATE_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../typs";
import { setAlert } from "./Alert";

const GetUserProfile = () => async (dispatch) => {
  try {
    const userProfile = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: userProfile.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: error.response.data,
    });
  }
};

const CreateProfile =
  ({ ...rest }, navigate, edit = false) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const bodyData = JSON.stringify({ ...rest });

    try {
      const response = await axios.post("/api/profile", bodyData, config);
      dispatch({
        type: CREATE_PROFILE,
        payload: response.data,
      });

      dispatch(setAlert(response.data.messgae, "success"));
      if (edit === false) {
        navigate("/dashboard");
      }
      navigate("/dashboard");
    } catch (err) {
      const errors = err.response;
      if (errors) {
        dispatch(setAlert(errors.data, "danger"));
      }
      dispatch({ type: PROFILE_ERROR });
    }
  };

export { GetUserProfile, CreateProfile };
