import { combineReducers } from "redux";
import AlretReducer from "./alert/AlertReducer";
import AuthReducer from "./auth/AuthReducer";

const rootReducer = combineReducers({
  alert: AlretReducer,
  auth: AuthReducer,
});

export default rootReducer;
