import {
  UPDATE_CONFIGURATION,
  UPDATE_NEW_PERIOD,
  CLEAR_CURRENT_CONFIG,
} from "@actions/index";

export interface GameConfigReduxState {
  timestamps?: {
    register_start: string; // Game wouldn't be started when before game start so just restricted to profile (Don't need I think).
    game_start: string; // When they're able to interact with the game pages.
    review_start: string; // Only player roles will not be able to interact with anything.
    review_end: string; // Award and raffle items are chosen.
    game_end: string; // Entire app end.
  };
  newPeriod: number;
  restrictedAccess?: boolean; // When there is no timestamps or there is problems with the user's profile.
  gameStart?: boolean; // When there is timestamps.
  reviewStart?: boolean; // When gameStart ends.
  winnersAnnounced?: boolean; // When it's reviewStart ends.
  gameEnd?: boolean; // When all timestamps are exceeded.
}

const initialState: GameConfigReduxState = {
  timestamps: {
    register_start: "2024-01-05T13:00:00-05:00",
    game_start: "2024-02-01T13:00:00-05:00",
    review_start: "2024-02-02T13:00:00-05:00",
    review_end: "2024-02-09T12:00:00-05:00",
    game_end: "2024-02-15T13:00:00-05:00"
  },
  newPeriod: 0,
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
