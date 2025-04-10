import {
  INITIALIZE_COINS,
  UPDATE_USER_COINS,
  CLEAR_GAME,
  SET_RAFFLE_ITEMS,
  UPDATE_RAFFLE_ITEM,
  UPDATE_RAFFLE_STAKE,
  SET_RAFFLE_TIMESTAMP,
  REFRESH_RAFFLE,
  SET_LEARN_AND_EARN_CHESTS,
} from "@actions/index";

export interface RaffleItem {
  item_id: string;
  name: string;
  description: string;
  image_src: string;
  raffle_partner: {
    name: string;
    logo: string; // Donated by logo.
    resource_name: string;
    resource_logo: string;
    resource_link: string;
    resource_category: string;
  };
  stock: number;
  coins: number;
  silver: boolean;
}

export type QuizChestGrouping = {
  question: string;
  answers: {
    choices: {
      a: string;
      b: string;
      c: string;
    };
    correct: string;
    explanation: string;
  };
}[];
export type QuizChests = {
  chest_id: string;
  group: QuizChestGrouping;
}[];

export interface GameReduxState {
  userCoins: number;
  // Raffle
  raffleItems: RaffleItem[];
  staked: {
    remainingCoins: number;
    raffleItem?: { [item_id: string]: boolean };
  };
  raffleTimestamp?: { getRaffleItems: number, submission: number } // Timestamps is in milliseconds.
  // Learn and Earn
  quizChests: QuizChests;
}

const initialState: GameReduxState = {
  userCoins: 0,
  raffleItems: [],
  staked: { remainingCoins: 0 },
  quizChests: []
};

const game = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case INITIALIZE_COINS:
      return {
        ...state,
        userCoins: action.payload,
        staked: { ...state.staked, remainingCoins: action.payload },
      };
    case UPDATE_USER_COINS:
      return {
        ...state,
        userCoins: action.payload.override
          ? action.payload.coins
          : state.userCoins + (action.payload.coins || 0)
      };
    case CLEAR_GAME:
      return initialState;
    // <======================================/ Raffle \======================================>
    case SET_RAFFLE_ITEMS:
      return {
        ...state,
        raffleItems: action.payload
      };
    // Use for updating 'base' fields (was used only for changing "coins" or "silver").
    case UPDATE_RAFFLE_ITEM:
      return {
        ...state,
        raffleItems: state.raffleItems.map((item) =>
          item.item_id === action.payload.item_id
            ? {
                ...item,
                ...action.payload.update,
                ...(action.payload.update.coins && {
                  coins: item.coins + action.payload.update.coins
                })
              }
            : item
        ),
      };
    case UPDATE_RAFFLE_STAKE:
      return {
        ...state,
        staked: {
          remainingCoins:
            state.staked.remainingCoins + (action.payload.remainingCoins || 0),
          raffleItem: {
            ...state.staked.raffleItem,
            ...action.payload.raffleItem
          }
        }
      };
    case SET_RAFFLE_TIMESTAMP:
      return {
        ...state,
        raffleTimestamp: { ...state.raffleTimestamp, ...action.payload }
      };
    case REFRESH_RAFFLE:
      return {
        ...state,
        raffleItems: initialState.raffleItems,
        staked: { remainingCoins: state.userCoins }
      };
    // <==================================/ Learn and Earn \==================================>
    case SET_LEARN_AND_EARN_CHESTS:
      return { ...state, quizChests: action.payload };
    default:
      return state;
  }
};

export default game;
