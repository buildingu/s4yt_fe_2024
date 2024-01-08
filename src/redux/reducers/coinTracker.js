import { SPEND_COINS, RETRIEVE_COINS, INITIALIZE_COINS } from "@actions/index";

const initialState = {
  remainingCoins: 24,
  items: [],
};

const coinTracker = (state = initialState, action) => {
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
        items: action.payload.products.map((product) => ({
          ...product,
          entries: 0,
        })),
        remainingCoins: action.payload.remainingCoins,
      };
    default:
      return state;
  }
};

export default coinTracker;
