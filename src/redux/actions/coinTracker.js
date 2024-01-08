import { SPEND_COINS, RETRIEVE_COINS, INITIALIZE_COINS } from "@actions/index";

export const spendCoins = (item, numEntries) => ({
  type: SPEND_COINS,
  payload: { item, numEntries },
});

export const retrieveCoins = (item, numEntries) => ({
  type: RETRIEVE_COINS,
  payload: { item, numEntries },
});

export const initializeCoins = ({ products, remainingCoins }) => ({
  type: INITIALIZE_COINS,
  payload: { products, remainingCoins },
});
