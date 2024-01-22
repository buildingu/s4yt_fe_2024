import { SPEND_COINS, RETRIEVE_COINS, INITIALIZE_COINS } from "@actions/index";

export interface Product {
  img: string;
  name: string;
  id: number;
  sponsor: string;
  sponsorLogo: string;
  availability: number;
  description: string;
  entries?: number;
}

export interface CoinTrackerState {
  remainingCoins: number;
  items: Product[];
}

const initialState: CoinTrackerState = {
  remainingCoins: 0,
  items: [],
};

const coinTracker = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SPEND_COINS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.item.id
            ? { ...item, entries: item.entries + action.payload.numEntries }
            : item
        ),
        remainingCoins: state.remainingCoins - action.payload.numEntries,
      };
    case RETRIEVE_COINS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.item.id
            ? { ...item, entries: item.entries - action.payload.numEntries }
            : item
        ),
        remainingCoins: state.remainingCoins + action.payload.numEntries,
      };
    case INITIALIZE_COINS:
      return {
        ...state,
        ...(action.payload.products && {
          items: action.payload.products.map((product: any) => ({
            ...product,
            entries: 0,
          })),
        }),
        remainingCoins: action.payload.remainingCoins,
      };
    default:
      return state;
  }
};

export default coinTracker;
