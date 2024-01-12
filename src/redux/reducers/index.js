import { combineReducers } from "redux";
import user from "./user";
import notifications from "./notifications";
import formOptions from "./formOptions";
import configuration from "./configuration";
import coinTracker from "./coinTracker";

export default combineReducers({
  user,
  formOptions,
  notifications,
  configuration,
  coinTracker,
});
