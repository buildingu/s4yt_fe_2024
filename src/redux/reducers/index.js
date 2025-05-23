import { combineReducers } from "redux";
import user from "./user";
import notifications from "./notifications";
import formOptions from "./formOptions";
import game from "./game";
import gameConfig from "./gameConfig";
import businesses from "./businesses";
import winners from "./winners";

export default combineReducers({
  user,
  formOptions,
  notifications,
  game,
  gameConfig,
  businesses,
  winners
});
