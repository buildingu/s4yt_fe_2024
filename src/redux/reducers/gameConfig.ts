import { UPDATE_CONFIGURATION } from "@actions/index";

interface GameConfigState {
  countdown?: number;
  restrictedAccess?: boolean; // When there is no countdown or there is problems with the user's profile.
  gameStart?: boolean; // When there is a countdown.
  reviewStart?: boolean; // When gameStart ends.
  winnersAnnounced?: boolean; // When reviewStart ends, we maybe don't need this one because we can just use if gameStart is false?
}

const initialState: GameConfigState = {
  restrictedAccess: true,
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
