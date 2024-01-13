import { SET_CURRENT_USER, SET_TOKEN } from "@actions/index";

// TODO: if the user logs out then we can delete both token and user.
const initialState = {
  credentials: {},
  token: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, credentials: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default user;
