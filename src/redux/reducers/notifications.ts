import NotificationValues from "@typings/NotificationValues";
import { nanoid } from "nanoid";
import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "@actions/index";

const initialState: NotificationValues[] = [];

const notifications = (
  state = initialState,
  action: { type: string; payload: NotificationValues }
) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        {
          id: nanoid(),
          ...(action.payload as Omit<NotificationValues, "id">),
        },
      ];
    case UPDATE_NOTIFICATION:
      return state.map((notification) =>
        notification.id === action.payload.id
          ? { ...notification, ...action.payload }
          : notification
      );
    case REMOVE_NOTIFICATION:
      return state.filter(
        (notification) => notification.id !== action.payload.id
      );
    default:
      return state;
  }
};

export default notifications;
