import { UPDATE_CONFIGURATION } from "@actions/index";

export interface GameConfigReduxState {
  timestamps?: {
    register_start: string; // Game wouldn't be started when before game start so just restricted to profile (Don't need I think).
    game_start: string; // When they're able to interact with the game pages.
    review_start: string; // Only player roles will not be able to interact with anything.
    review_end: string; // Award and raffle items are chosen.
    game_end: string; // Entire app end.
  };
  countdown?: string;
  restrictedAccess?: boolean; // When there is no countdown or there is problems with the user's profile.
  gameStart?: boolean; // When there is a countdown.
  reviewStart?: boolean; // When gameStart ends.
  winnersAnnounced?: boolean; // When reviewStart ends, we maybe don't need this one because we can just use if gameStart is false?
  gameEnd?: boolean;
}

const initialState: GameConfigReduxState = {
  timestamps: {
    register_start: "2023-01-19T13:00:00-05:00",
    game_start: "2024-01-22T10:00:00-05:00",
    review_start: "2024-01-28T10:00:00-05:00",
    review_end: "2024-01-29T11:00:00-05:00",
    game_end: "2024-02-01T17:00:00-05:00",
  },
};

const gameConfig = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case UPDATE_CONFIGURATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default gameConfig;
