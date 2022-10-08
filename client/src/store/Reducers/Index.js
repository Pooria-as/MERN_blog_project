import { combineReducers } from "redux";
import UserReducer from "./user/UserReducer";

const rootReducer = combineReducers({
  users: UserReducer,
});

export default rootReducer;
