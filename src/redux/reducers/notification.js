import { SET_NOTIFICATION_DATA } from "@selectors";

const initialState = {
  display: false,
  error: null,
  content: null,
  close: false,
  duration: 0,
};

const Options = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export default Options;
