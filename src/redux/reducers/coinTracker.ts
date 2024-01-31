import {
  SPEND_COINS,
  RETRIEVE_COINS,
  INITIALIZE_COINS,
  SET_RAFFLE_ITEMS,
} from "@actions/index";

export interface Product {
  id: number;
  name: string;
  description: string;
  image_src: string;
  stock: number;
  raffle_partner: {
    organization_name: string;
    logo_default: string;
    resource_link: string;
  };
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
        ...(action.payload.item && {
          items: state.items.map((item) =>
            item.id === action.payload.item.id
              ? { ...item, entries: item.entries + action.payload.numEntries }
              : item
          ),
        }),
        remainingCoins: state.remainingCoins - action.payload.numEntries,
      };
    case RETRIEVE_COINS:
      return {
        ...state,
        ...(action.payload.item && {
          items: state.items.map((item) =>
            item.id === action.payload.item.id
              ? {
                  ...item,
                  entries:
                    item.entries && item.entries - action.payload.numEntries,
                }
              : item
          ),
        }),
        remainingCoins: state.remainingCoins + action.payload.numEntries,
      };
    case INITIALIZE_COINS:
      return {
        ...state,
        remainingCoins: action.payload.remainingCoins,
      };
    case SET_RAFFLE_ITEMS:
      return {
        ...state,
        items: action.payload.map((product: any) => ({
          ...product,
          entries: 0,
        })),
      };
    default:
      return state;
  }
};

export default coinTracker;
