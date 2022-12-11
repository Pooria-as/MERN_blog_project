import { combineReducers } from "redux";
import AlretReducer from "./alert/AlertReducer";
import AuthReducer from "./auth/AuthReducer";
import ProfileReducer from "./profile/ProfileReducer";

const rootReducer = combineReducers({
  alert: AlretReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
});

export default rootReducer;
