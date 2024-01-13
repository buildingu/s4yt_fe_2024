import { SET_CONFIGURATION } from "@actions/index";

const initialState = {
  // loaded: false,
  // register_coins: null,
  // game_start: null,
  // game_end: null,
  // winners_announced: null,
  // login_disabled: null,
  // referral_coins: null,

  countdown: null,
  gameStart: false,
  gameEnd: false,
};

const gameConfig = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONFIGURATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default gameConfig;
