import { SET_TOKEN_SUCCESS } from "@actions/index";

// TODO: if the user logs out then we can delete both token and user.
const initialState = {
  user: {},
  token: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN_SUCCESS:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export default user;
