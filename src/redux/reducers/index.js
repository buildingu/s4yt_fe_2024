import { combineReducers } from "redux";
import user from "./user";
import notification from "./notification";
import formOptions from "./formOptions";
import configuration from "./configuration";

export default combineReducers({
  user,
  formOptions,
  notification,
  configuration,
});
