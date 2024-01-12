import { SPEND_COINS, RETRIEVE_COINS, INITIALIZE_COINS } from "@actions/index";
import { Api } from "@services/index";

export const spendCoins = (item, numEntries) => (dispatch) => {
  dispatch({ type: SPEND_COINS, payload: { item, numEntries } });
};

export const retrieveCoins = (item, numEntries) => (dispatch) => {
  dispatch({ type: RETRIEVE_COINS, payload: { item, numEntries } });
};

export const initializeCoins = ({products, remainingCoins}) => (dispatch) => {
  // currently can't get coins 
  // return Api.get("/coins").then((response) => {
    dispatch({ type: INITIALIZE_COINS, payload: { products, remainingCoins } });
  // });
};

