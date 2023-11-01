import { SET_NOTIFICATION_DATA, SET_LOCAL_TOKEN_SUCCESS } from "@selectors";

export const setToken = (data) => (dispatch, getState) => {
  dispatch({ type: SET_LOCAL_TOKEN_SUCCESS, data: data });
};

export const setNotification = (data) => (dispatch, getState) => {
  const { notification } = getState();

  dispatch({ type: SET_NOTIFICATION_DATA, data: data });
};
