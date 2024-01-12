import { SET_CONFIGURATION } from "@actions/index";

// TODO: this will change and the name probably.
const initialState = {
  loaded: false,
  register_coins: null,
  game_start: null,
  game_end: null,
  winners_announced: null,
  login_disabled: null,
  referral_coins: null,
};

const configuration = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONFIGURATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default configuration;
