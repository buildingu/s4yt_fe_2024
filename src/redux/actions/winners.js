import { Api } from "@services/index";
import errorHandler, { showError } from "@services/errorHandler";

import { SET_WINNERS } from "@actions/index";
import { addNotification } from "./notifications";

const transformWinners = (data, dispatch) => {
  try {
    const mainMap = new Map(),
      other = [];

    const challengeMap = new Map(
      data.challenge_winners.map((business) => [business.business_name, business])
    );

    for (const { partner_name, image_src, logo, winners } of data.raffle_winners) {
      const challengeEntry = challengeMap.get(partner_name);

      if (challengeEntry) {
        if (!mainMap.has(partner_name)) {
          mainMap.set(partner_name, {
            name: partner_name,
            logo,
            winners: { raffle: [], challenge: challengeEntry.winners }
          });
        }
        mainMap.get(partner_name).winners.raffle.push({ image_src, users: winners });
      } else {
        other.push({
          name: partner_name,
          image_src,
          logo,
          winners: { raffle: winners }
        });
      }
    }

    for (const [name, business] of challengeMap) {
      if (!mainMap.has(name)) {
        mainMap.set(name, {
          name,
          logo: business.logo,
          winners: { challenge: business.winners }
        });
      }
    }

    return { main: Array.from(mainMap.values()), other };
  } catch (error) {
    dispatch(
      addNotification({
        error: true,
        content: "There was a issue processing the winners response",
        close: false,
        duration: 0
      })
    );
    throw error;
  }
}

export const getWinners = () => async (dispatch, _) => {
  try {
    const { data, meta } = await Api.get("/raffle/winners");
    if (!meta.ok) {
      showError(
        data,
        meta.status,
        dispatch,
        "Unexpected server error occurred retrieving the winners"
      );
    }

    const newArray = transformWinners(data, dispatch);
    if (Object.values(newArray).length) {
      dispatch({ type: SET_WINNERS, payload: newArray });
    }
  } catch (error) {
    errorHandler("getWinners", error);
  }
};
