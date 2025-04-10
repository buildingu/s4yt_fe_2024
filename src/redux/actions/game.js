import { Api } from "@services/index";
import errorHandler, { showError } from "@services/errorHandler";

import {
  INITIALIZE_COINS,
  UPDATE_USER_COINS,
  // Raffle
  SET_RAFFLE_ITEMS,
  UPDATE_RAFFLE_ITEM,
  UPDATE_RAFFLE_STAKE,
  SET_RAFFLE_TIMESTAMP,
  REFRESH_RAFFLE,
  // Learn and Earn
  SET_LEARN_AND_EARN_CHESTS
} from "@actions/index";
import { updateCurrentUser } from "./user";
import { socket } from "@services/socket";

/**
 * @param {number} coins Use a negative number to subtract from the total.
 * @param {boolean} [override]
 */
export const updateUserCoins = (coins, override = false) => (dispatch) => {
  dispatch({ type: UPDATE_USER_COINS, payload: { coins, override } });
};

/**
 * @param {{ remainingCoins: number; raffleItem?: { [item_id: string]: boolean } }} staked
 */
export const updateRaffleStake = (staked) => (dispatch) => {
  dispatch({ type: UPDATE_RAFFLE_STAKE, payload: staked });
};

/**
 * @param {string} item_id 
 * @param {{ coins?: number; silver?: boolean }} update
 */
export const updateRaffleItem = (item_id, update) => (dispatch) => {
  dispatch({ type: UPDATE_RAFFLE_ITEM, payload: { item_id, update } });
};

export const getRaffleItems = () => async (dispatch, _) => {
  try {
    dispatch({ type: REFRESH_RAFFLE });
    const { data, meta } = await Api.get("/game/raffle/items");

    if (meta.ok) {
      dispatch({ type: SET_RAFFLE_ITEMS, payload: data });
      dispatch({
        type: SET_RAFFLE_TIMESTAMP,
        payload: { getRaffleItems: Date.now() + 3 * 60 * 60 * 1000 } // 3 hours.
      });
    } else {
      showError(
        data,
        meta.status,
        dispatch,
        "Unexpected server error occurred getting the available raffle items"
      );
    }
  } catch (error) {
    errorHandler("getRaffleItems", error);
  }
};

export const sendRaffleStakedItems = (stakedItems, raffleItems, remainingCoins) => async (dispatch, _) => {
  try {
    const stakedItemsIds = Object.keys(stakedItems),
      staked_items = [];

    for (const { item_id, coins } of raffleItems) {
      if (stakedItemsIds.includes(item_id))
        staked_items.push({ item_id, coins });
    }

    const { data, meta } = await Api.post("/game/raffle/items", {
      staked_items,
      total_coins: remainingCoins
    });
    if (meta.ok) {
      dispatch({
        type: SET_RAFFLE_TIMESTAMP,
        payload: { submission: Date.now() + 30 * 60 * 1000 } // 30 minutes.
      });
      dispatch(updateUserCoins(data.total_coins, true));
    } else {
      showError(
        data,
        meta.status,
        dispatch,
        "Unexpected server error allocating coins to raffle items"
      );
    }
  } catch (error) {
    errorHandler("sendRaffleStakedItems", error);
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
          console.warn(`Failed to check coin total: ${retries} retries left...`);

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

export const sendLearnAndEarnCoins = (chest_id, amount) => async (dispatch, _) => {
  try {
    const { data, meta } = await Api.post("/game/player/coins/chest", { chest_id, amount });

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
 * Listens for any new coin changes. This is triggered on certain coins updates for the 
 * user on the back-end.
 */
export const coinChangesListener = () => (dispatch, _) => {
  socket.on("coin_change", (data) => {
    // console.log("coin_change", data)
    if (data.coins != null) dispatch(updateUserCoins(data.coins));
  });
};

/**
 * For the raffle. Listens for gold and silver coin changes on raffle items to indicate that 
 * this item has other users coins staked on that item.
 */
export const silverAndGoldCoinsListener = () => (dispatch, _) => {
  const listener = (data) => {
    // console.log("silverAndGoldCoinsListener data", data)
    data.forEach((item) =>    
      dispatch(updateRaffleItem(item.item_id, { silver: item.silver }))
    );
  };
  socket.removeListener("raffle_gold_silver", listener);
  socket.on("raffle_gold_silver", listener);

  return listener;
};
