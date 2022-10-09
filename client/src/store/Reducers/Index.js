import { combineReducers } from "redux";
import AlretReducer from "./alert/AlertReducer";
import AuthReducer from "./auth/AuthReducer";
import UserReducer from "./user/UserReducer";

const rootReducer = combineReducers({
  users: UserReducer,
  alert: AlretReducer,
  auth: AuthReducer,
});

export default rootReducer;
