import { Api } from "@services/index";
import errorHandler, { showError } from "@services/errorHandler";

import { SET_BUSINESSES, UPDATE_BUSINESS_CHALLENGE } from "@actions/index";
import { addNotification } from "./notifications";
import { updateCurrentUser } from "./user";

import { socket } from "@services/socket";

/**
 * @param {string} challenge_id 
 * @param {{ answers_count?: number; answer_submitted?: boolean }} update
 */
export const updateBusinessesChallenge = (challenge_id, update) => (dispatch, _) => {
  dispatch({
    type: UPDATE_BUSINESS_CHALLENGE,
    payload: { challenge_id, update }
  });
};

export const getBusinesses = () => async (dispatch) => {
  try {
    const { data, meta } = await Api.get("/business/info");

    if (meta.ok) {
      dispatch({ type: SET_BUSINESSES, payload: data });
    } else {
      showError(
        data,
        meta.status,
        dispatch,
        "Unexpected server error occurred retrieving event businesses. If you still see businesses, it's showing you the businesses from the previous request, so things may be out of date"
      );
    }
  } catch (error) {
    errorHandler("getBusinesses", error);
  }
};

export const submitChallengeAnswer = (challenge_id, submission_link, formRef, setForm) => async (dispatch) => {
  try {
    const { meta } = await Api.post("/game/challenges", { challenge_id, submission_link });

    if (meta.ok) {
      formRef.current.reset();
      dispatch(
        addNotification({
          error: false,
          content: "Successfully submitted your answer ✔",
          close: false,
          duration: 4000
        })
      );
      dispatch(updateBusinessesChallenge(challenge_id, { answer_submitted: true }));
    } else {
      dispatch(
        addNotification({
          error: true,
          content:
            "A server error occurred and we couldn't submit you answer. Please try again later",
          close: false,
          duration: 0
        })
      );
    }
  } catch (error) {
    errorHandler("submitAnswer", error);
  } finally {
    setForm((prev) => ({ ...prev, processing: false }));
  }
};

export const submitScheduleMeeting = (attend_meeting, formRef, setForm) => async (dispatch) => {
  try {
    const { data, meta } = await Api.patch("/game/meetup", { attend_meeting });

    if (meta.ok) {
      formRef.current.reset();
      dispatch(
        addNotification({
          error: false,
          content: attend_meeting ? "We'll see you there ✔" : "Okay, maybe another time",
          close: false,
          duration: 4000
        })
      );
      dispatch(updateCurrentUser({ attend_meeting: data.attend_meeting }));
    } else {
      dispatch(
        addNotification({
          error: true,
          content:
            "A server error occurred and we couldn't schedule your meeting. Please try again later",
          close: false,
          duration: 0
        })
      );
    }
  } catch (error) {
    errorHandler("submitAnswer", error);
  } finally {
    setForm((prev) => ({ ...prev, processing: false }));
  }
};

export const businessChallengeAnswerSubmittedListener = () => (dispatch) => {
  const listener = (data) => {
    dispatch(
      updateBusinessesChallenge(data.challenge_id, {
        answers_count: data.answers_count
      })
    );
  };
  socket.on("business_challenge_submitted", listener);

  return listener;
};
