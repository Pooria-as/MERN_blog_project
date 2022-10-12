import {
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../../typs";

const initialState = {
  token: localStorage.getItem("token"),
  IsAuthenticate: null,
  loading: true,
  user: null,
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
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
    case LOGIN_FAILED:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        IsAuthenticate: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
