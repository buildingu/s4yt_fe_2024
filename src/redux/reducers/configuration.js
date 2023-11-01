import { SET_CONFIGURATION } from "@selectors";

/*

	Initial Local state

*/
const initialState = {
  loaded: false,
  register_coins: null,
  game_start: null,
  game_end: null,
  winners_announced: null,
  login_disabled: null,
  referral_coins: null,
};

const Configuration = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONFIGURATION:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default Configuration;
