import {
  AUTH_ERROR,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../../typs";

const initialState = {
  token: localStorage.getItem("token"),
  IsAuthenticate: false,
  loading: true,
  user: null,
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        IsAuthenticate: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        IsAuthenticate: true,
        loading: false,
      };
    case REGISTER_FAILED:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        IsAuthenticate: false,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
