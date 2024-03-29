import { combineReducers } from "redux";
import user from "./user";
import notifications from "./notifications";
import formOptions from "./formOptions";
import gameConfig from "./gameConfig";
import coinTracker from "./coinTracker";
import getBusinesses from "./getBusinesses";
import getRaffleWinners from "./getRaffleWinners";

export default combineReducers({
  user,
  formOptions,
  notifications,
  gameConfig,
  coinTracker,
  getBusinesses,
  getRaffleWinners,
});
