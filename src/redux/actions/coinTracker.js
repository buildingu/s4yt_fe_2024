import { Api } from "@services/index";
import errorHandler, { showError } from "@services/errorHandler";

import {
  INITIALIZE_COINS,
  SPEND_COINS,
  RETRIEVE_COINS,
  SET_RAFFLE_ITEMS,
  SET_RAFFLE_COOLDOWN,
  RAFFLE_ACTIVE_STATE,
  SET_LEARN_AND_EARN_CHESTS
} from "@actions/index";
import { updateCurrentUser } from "./user";
import { socket } from "@services/socket";

// TODO: Everything else but getCoinsGainedHistory need changes.

export const retrieveCoins = (item, numEntries) => (dispatch) => {
  dispatch({
    type: RETRIEVE_COINS,
    payload: { ...(item && { item }), numEntries }
  });
};

export const spendCoins = (item, numEntries) => (dispatch) => {
  dispatch({
    type: SPEND_COINS,
    payload: { ...(item && { item }), numEntries },
  });
};

// TODO:
export const getRaffleItems = () => async (dispatch, getState) => {
  try {
    const res = await Api.get("/game/raffle");
    if (res) {
      dispatch({ type: SET_RAFFLE_ITEMS, payload: res.data.raffle_items });
    } else {
      showError(
        res,
        dispatch,
        "Unexpected server error occurred getting the available raffle items"
      );
    }
  } catch (error) {
    errorHandler("getRaffleItems", error);
  }
};
export const setRaffleItems = (raffle) => async (dispatch, getState) => {
  try {
    // TODO: Send { item_id, coins }
    const res = await Api.post("/game/raffle/coins", {
      raffle: raffle,
    });
    if (res.success) {
      const date = new Date();
      dispatch({ type: SET_RAFFLE_COOLDOWN, payload: date });
    } else {
      showError(
        res,
        dispatch,
        "Unexpected server error allocating coins to raffle items"
      );
    }
  } catch (error) {
    errorHandler("getRaffleItems", error);
  }
};

export const checkTotalCoins = () => async (dispatch, _) => {
  let retries = 2;

  const getTotal = async () => {
    try {
      const { data } = await Api.get("/game/player/coins/total");
      dispatch({ type: INITIALIZE_COINS, payload: data.coins });
    } catch (error) {
      if (retries !== 0) {
        retries -= 1;
        if (import.meta.env.DEV)
          console.log(`Failed to check coin total: ${retries} retries left...`);

        await getTotal();
      } else {
        addNotification({
          error: true,
          content: "We were not able to sync any dubl-u-nes (coins) that may have been added while you were away. Please try refreshing the page.",
          close: false,
          duration: 0
        });
        errorHandler("getTotalCoins", error, false);
      }
    }
  }

  await getTotal();
};

export const getCoinsGainedHistory = (setCoinsGainedHistory) => async (dispatch, _) => {
    try {
      const { data, meta } = await Api.get("/game/player/coins/history");

      if (meta?.ok) {
        setCoinsGainedHistory(data.coin_details);
      } else {
        showError(
          data,
          meta.status,
          dispatch,
          "Unexpected server error occurred getting your Dubl-u-nes gained history"
        );
      }
    } catch (error) {
      errorHandler("getCoinsGainedHistory", error);
    }
  };

export const getLearnAndEarnChests = () => async (dispatch, _) => {
  try {
    const { data, meta } = await Api.get("/game/chests");

    if (meta.ok) {
      dispatch({ type: SET_LEARN_AND_EARN_CHESTS, payload: data });
    } else {
      showError(
        data,
        meta.status,
        dispatch,
        "Unexpectedly, we couldn't retrieve the questions and answers. Try again later."
      );
    }
  } catch (error) {
    errorHandler("getLearnAndEarnChests", error);
  }
};

export const sendLearnAndEarnCoins = (chestId, amount) => async (dispatch, _) => {
  try {
    const { data, meta } = await Api.post("/game/player/coins/chest", { chestId, amount });

    if (meta.ok) {
      dispatch(updateCurrentUser({ chests_submitted: data.chests_submitted }));
    } else {
      showError(
        data,
        meta.status,
        dispatch,
        "Unexpected server error occurred updating your Dubl-u-nes from the chest quiz. Try again later."
      );
    }
  } catch (error) {
    errorHandler("sendLearnAndEarnCoins", error);
  }
};

// <======================================/ Web Sockets \======================================>
/**
 * Listens for any new coin changes. This should be triggered on every coins update for a 
 * user on the back-end.
 */
export const coinChangesListener = () => (_) => {
  socket.on("coin_change", (data) => {
    if (data.coins) retrieveCoins(null, data.coins);
  });
};

/**
 * For the raffle. Listens for gold and sliver coin changes on raffle items to indicate that 
 * this item has other users coins in on that item.
 */
// TODO:
export const sliverAndGoldCoinsListener = () => (dispatch, _) => {
  socket.on("raffle_gold_sliver", (data) => {
    // { id: string; silver: boolean }
    dispatch({ type: RAFFLE_ACTIVE_STATE, payload: data });
  });
  
  // window.Echo.channel("raffle-update").listen("RaffleUpdate", (e) => {
  //   dispatch({ type: RAFFLE_ACTIVE_STATE, payload: e.message });
  // });
};
