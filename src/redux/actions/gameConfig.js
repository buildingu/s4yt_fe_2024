import { UPDATE_CONFIGURATION } from "@actions/index";

export const updateConfiguration = (data) => (dispatch, getState) => {
  dispatch({ type: UPDATE_CONFIGURATION, payload: data });
};
