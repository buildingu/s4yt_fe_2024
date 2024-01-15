import { INITIALIZE_COINS, RETRIEVE_COINS, SPEND_COINS } from "@actions/index";
import { Api } from "@services/index";
import { addNotification } from "./notifications";
import errorHandler from "@services/errorHandler";

export const initializeCoins = (data) => (dispatch) => {
  dispatch({ type: INITIALIZE_COINS, payload: data });
};

export const retrieveCoins = (item, numEntries) => (dispatch) => {
  dispatch({ type: RETRIEVE_COINS, payload: { item, numEntries } });
};

export const spendCoins = (item, numEntries) => (dispatch) => {
  dispatch({ type: SPEND_COINS, payload: { item, numEntries } });
};

export const getCoinsGainedHistory =
  (setCoinsGainedHistory) => (dispatch, getState) => {
    console.log("setCoinsGainedHistory", setCoinsGainedHistory);
    return Api.get("/player/coins")
      .then((res) => {
        if (res.success) {
          setCoinsGainedHistory(res.data.coin_details);
        } else {
          // Is there res.errors for this?
          addNotification({
            error: true,
            content:
              "Unexpected server error occurred getting your Dubl-u-nes gained history.",
            close: false,
            duration: 0,
          });
        }
      })
      .catch((error) => errorHandler("getCoinsGainedHistory", error));
  };
