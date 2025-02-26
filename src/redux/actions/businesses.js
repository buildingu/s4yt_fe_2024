import { Api } from "@services/index";
import errorHandler from "@services/errorHandler";

import { SET_BUSINESSES } from "@actions/index";
import { addNotification } from "./notifications";

import { socket } from "@services/socket";

// TODO:
export const getBusinesses = () => async (dispatch) => {
  try {
    // TODO: Url
    const { data, meta } = await Api.get("/business/businesses");

    if (meta.ok) {
      dispatch({ type: SET_BUSINESSES, payload: data.businesses });
    } else {
      dispatch(
        addNotification({
          error: true,
          content:
            "Unexpected server error occurred retrieving event businesses.",
          close: false,
          duration: 0
        })
      );
    }
  } catch (error) {
    errorHandler("getBusinesses", error);
  }
};

// TODO: sends link.
export const submitAnswer = (business_name, link, formRef, setForm) => async (dispatch) => {
  try {
    // TODO: Url
    const { data, meta } = await Api.post("/business/answer", { business_name, link });

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
    } else {
      dispatch(
        addNotification({
          error: true,
          content:
            "A server error occurred and we couldn't submit you answer. Please try again later.",
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

// TODO: sends if responded yes to meetup.
export const submitScheduleMeeting = (business_name, formRef, setForm) => async (dispatch) => {
  try {
    // TODO: (I don't even know if we thought about this one at all).
    const { data, meta } = await Api.post("/business/schedule-meeting", { business_name });

    if (meta.ok) {
      formRef.current.reset();
      dispatch(
        addNotification({
          error: false,
          content: "We'll see you there ✔",
          close: false,
          duration: 4000
        })
      );
    } else {
      dispatch(
        addNotification({
          error: true,
          content:
            "A server error occurred and we couldn't schedule you me. Please try again later.",
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

// TODO:
export const coinChangesListener = () => (dispatch) => {
  socket.on("business_challenge_submitted", (data) => {
    // TODO: Data structured.
    // if (data.total)
  });
};
