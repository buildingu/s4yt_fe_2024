import UserCredentials from "@typings/UserCredentials";
import { INITIALIZE_SESSION, SET_NEW_LOGIN_FLAG, UPDATE_CURRENT_USER, LOGOUT } from "@actions/index";

export interface UserReduxState {
  credentials?: UserCredentials;
  tokens: { access?: string; csrf?: string };
  newLogin?: boolean;
}

const initialState: UserReduxState = {
  tokens: {}
};

const user = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case INITIALIZE_SESSION:
      return {
        credentials: action.payload.user,
        tokens: action.payload.tokens,
        newLogin: true
      };
    case SET_NEW_LOGIN_FLAG:
      return { ...state, newLogin: action.payload };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        credentials: { ...state.credentials, ...action.payload },
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
