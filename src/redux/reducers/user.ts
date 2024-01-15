import UserCredentials from "@typings/UserCredentials";
import { SET_CURRENT_USER, SET_TOKEN, LOGOUT } from "@actions/index";

interface UserReduxState {
  credentials?: UserCredentials;
  token?: string;
}

const initialState: UserReduxState = {};

const user = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, credentials: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default user;
