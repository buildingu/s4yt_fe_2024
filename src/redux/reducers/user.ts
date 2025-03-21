import UserCredentials from "@typings/UserCredentials";
import { SET_TOKENS, SET_CURRENT_USER, UPDATE_CURRENT_USER, LOGOUT } from "@actions/index";

export interface UserReduxState {
  credentials?: UserCredentials;
  tokens: { access?: string; csrf?: string };
}

const initialState: UserReduxState = {
  tokens: {}
};

const user = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        tokens: { access: action.payload.access, csrf: action.payload.csrf }
      };
    case SET_CURRENT_USER:
      return { ...state, credentials: action.payload };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        credentials: { ...state.credentials, ...action.payload }
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
