import { SET_NOTIFICATION_DATA } from "@actions";

const initialState = {
  display: false,
  error: null,
  content: null,
  close: false,
  duration: 0,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default notification;
