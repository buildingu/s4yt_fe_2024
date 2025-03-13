import {
  UPDATE_CONFIGURATION,
  UPDATE_NEW_PERIOD,
  CLEAR_CURRENT_CONFIG,
} from "@actions/index";

export interface GameConfigReduxState {
  timestamps?: {
    // (profile is always open (expect for review_start))
    pre_game: string; // This is when the students 'learn', so they only do the learn and earn question and the raffle.
    game_start: string; // They can now move to the business challenge questions. So, they're able to interact with all pages except the learn and earn and the event results of course.
    review_start: string; // Everything is closed until review_end.
    review_end: string; // Award and raffle items are chosen and can only go to event results.
    game_end: string; // Entire app end.
  };
  newPeriod: number;
  restrictedAccess?: boolean; // When there is no timestamps, so pre_game haven't started yet, they're restricted to their profile only.
  preGame?: boolean;
  gameStart?: boolean;
  reviewStart?: boolean; // When gameStart ends.
  winnersAnnounced?: boolean; // When it's reviewStart ends.
  gameEnd?: boolean; // When all timestamps are exceeded.
}

const initialState: GameConfigReduxState = {
  newPeriod: 0
};

const gameConfig = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case UPDATE_CONFIGURATION:
      return { ...state, ...action.payload };
    case UPDATE_NEW_PERIOD:
      return { ...state, newPeriod: state.newPeriod + 1 };
    case CLEAR_CURRENT_CONFIG:
      return initialState;
    default:
      return state;
  }
};

export default gameConfig;
