import {
  SPEND_COINS,
  RETRIEVE_COINS,
  INITIALIZE_COINS,
  SET_RAFFLE_ITEMS,
  SET_RAFFLE_COOLDOWN,
  RAFFLE_ACTIVE_STATE,
  CLEAR_RAFFLE_ITEMS,
  SET_LEARN_AND_EARN_CHESTS,
  CLEAR_LEARN_AND_EARN_CHESTS
} from "@actions/index";

export interface RaffleItem {
  id: number;
  name: string;
  description: string;
  image_src: string;
  stock: number;
  raffle_partner: {
    organization_name: string;
    logo_url: string;
    resource_link: string;
    education_category: string;
  };

  entries?: number;
  coins?: number;
  silver?: boolean;
}

export type QuizChestGrouping = {
  question: string;
  answers: {
    choice: {
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

export interface CoinTrackerState {
  lastSubmit?: string;
  userCoins: number;
  raffleItems: RaffleItem[];
  quizChests: QuizChests;
}

const initialState: CoinTrackerState = {
  userCoins: 0,
  raffleItems: [],
  quizChests: []
};

const coinTracker = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SPEND_COINS:
      return {
        ...state,
        ...(action.payload.item && {
          raffleItems: state.raffleItems.map((item) => item.id === action.payload.item.id
            ? { ...item, coins: item.coins + action.payload.numEntries }
            : item
          ),
        }),
        userCoins: state.userCoins - action.payload.numEntries
      };
    case RETRIEVE_COINS:
      return {
        ...state,
        ...(action.payload.item && {
          raffleItems: state.raffleItems.map((item) =>
            item.id === action.payload.item.id
              ? {
                  ...item,
                  coins: item.coins && item.coins - action.payload.numEntries
                }
              : item
          )
        }),
        userCoins: state.userCoins + action.payload.numEntries
      };
    case INITIALIZE_COINS:
      return { ...state, userCoins: action.payload };
    // <======================================/ Raffle \======================================>
    case SET_RAFFLE_ITEMS:
      return {
        ...state,
        raffleItems: action.payload.map((product: any) => ({
          ...product,
          entries: 0,
          coins: product.coins ? product.coins : 0
        }))
      };
    // Cooldown to prevent spam.
    case SET_RAFFLE_COOLDOWN:
      return { ...state, lastSubmit: action.payload };
    // Gold and sliver coins.
    case RAFFLE_ACTIVE_STATE:
      return {
        ...state,
        raffleItems: state.raffleItems.map((item) => {
          const match = action.payload.find(
            (message: { id: number; silver: boolean }) => message.id === item.id
          );
          return match ? { ...item, silver: match.silver } : item;
        })
      };
    case CLEAR_RAFFLE_ITEMS:
      return { ...state, raffleItems: [] };
    // <==================================/ Learn and Earn \==================================>
    case SET_LEARN_AND_EARN_CHESTS:
      return { ...state, quizChests: action.payload };
    case CLEAR_LEARN_AND_EARN_CHESTS:
      return { ...state, quizChests: [] };
    default:
      return state;
  }
};

export default coinTracker;
