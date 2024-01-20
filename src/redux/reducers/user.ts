import UserCredentials from "@typings/UserCredentials";
import {
  SET_TOKEN,
  SET_CURRENT_USER,
  SET_NEW_LOGIN_FLAG,
  LOGOUT,
} from "@actions/index";

export interface UserReduxState {
  credentials?: UserCredentials;
  token?: string;
  newLogin?: any;
}

const initialState: UserReduxState = {};

const user = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_NEW_LOGIN_FLAG:
      return { ...state, newLogin: action.payload };
    case SET_CURRENT_USER:
      return { ...state, credentials: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default user;
