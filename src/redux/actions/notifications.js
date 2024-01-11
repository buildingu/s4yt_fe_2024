import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "@actions/index";

export const addNotification = (notification) => (dispatch, getState) => {
  dispatch({ type: ADD_NOTIFICATION, payload: notification });
};

export const updateNotification = (notification) => (dispatch, getState) => {
  dispatch({ type: UPDATE_NOTIFICATION, payload: notification });
};

export const removeNotification = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_NOTIFICATION, payload: { id } });
};
