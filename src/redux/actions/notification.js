import { SET_NOTIFICATION_DATA } from "@actions/index";

export const setNotification = (data) => (dispatch, getState) => {
  const { notification } = getState();

  dispatch({ type: SET_NOTIFICATION_DATA, payload: data });
};
