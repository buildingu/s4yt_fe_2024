import { Api } from "@services/index";
import errorHandler from "@services/errorHandler";

import {
  CLEAR_RAFFLE_ITEMS,
  INITIALIZE_COINS,
  RAFFLE_ACTIVE_STATE,
  RETRIEVE_COINS,
  SET_RAFFLE_COOLDOWN,
  SET_RAFFLE_ITEMS,
  SPEND_COINS,
} from "@actions/index";
import { addNotification } from "./notifications";
import { updateCurrentUser } from "./user";

export const initializeCoins = (data) => (dispatch) => {
  dispatch({ type: INITIALIZE_COINS, payload: data });
};

export const retrieveCoins = (item, numEntries) => (dispatch) => {
  dispatch({
    type: RETRIEVE_COINS,
    payload: { ...(item && { item }), numEntries },
  });
};

export const spendCoins = (item, numEntries) => (dispatch) => {
  dispatch({
    type: SPEND_COINS,
    payload: { ...(item && { item }), numEntries },
  });
};

export const clearRaffleItems = () => {
  return { type: CLEAR_RAFFLE_ITEMS };
};

export const raffleCooldown = (timeOnSubmit) => (dispatch) => {
  dispatch({ type: SET_RAFFLE_COOLDOWN, payload: timeOnSubmit });
};

export const getRaffleItems = () => async (dispatch, getState) => {
  try {
    const res = await Api.get("/raffle");
    if (res) {
      dispatch({ type: SET_RAFFLE_ITEMS, payload: res.data.raffle_items });
    } else {
      dispatch(
        addNotification({
          error: true,
          content:
            "Unexpected server error occurred getting your raffle items.",
          close: false,
          duration: 0,
        })
      );
    }
  } catch (error) {
    errorHandler("getRaffleItems", error);
  }
};
export const setRaffleItems = (raffle) => async (dispatch, getState) => {
  try {
    const res = await Api.post("/raffle/coins", {
      raffle: raffle,
    });
    if (res.success) {
      const date = new Date();
      dispatch({ type: SET_RAFFLE_COOLDOWN, payload: date });
    } else {
      dispatch(
        addNotification({
          error: true,
          content: "Unexpected server error allocating coins to raffle items.",
          close: false,
          duration: 0,
        })
      );
    }
  } catch (error) {
    errorHandler("getRaffleItems", error);
  }
};

export const getCoinsGainedHistory =
  (setCoinsGainedHistory) => async (dispatch, getState) => {
    try {
      const res = await Api.get("/player/coins");

      if (res.success) {
        setCoinsGainedHistory(res.data.coin_details);
      } else {
        dispatch(
          addNotification({
            error: true,
            content: res.message
              ? res.message
              : "Unexpected server error occurred getting your Dubl-u-nes gained history.",
            close: false,
            duration: 0,
          })
        );
      }
    } catch (error) {
      errorHandler("getCoinsGainedHistory", error);
    }
  };

export const sendSponsorQuizCoins =
  (finalScore) => async (dispatch, getState) => {
    try {
      const res = await Api.post("/player/coins/sponsor", {
        coins: finalScore,
      });

      if (res.success) {
        dispatch(retrieveCoins(null, finalScore));
        dispatch(updateCurrentUser({ quiz_submitted: 1 }));
      } else {
        dispatch(
          addNotification({
            error: true,
            content: res.message,
            close: false,
            duration: 0,
          })
        );
      }
    } catch (error) {
      errorHandler("sendSponsorQuizCoins", error);
    }
  };

// Web Sockets
export const sliverAndGoldCoinsListener = () => (dispatch, getState) => {
  window.Echo.channel("raffle-update").listen("RaffleUpdate", (e) => {
    dispatch({ type: RAFFLE_ACTIVE_STATE, payload: e.message });
  });
};
