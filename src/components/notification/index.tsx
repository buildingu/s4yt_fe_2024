import NotificationValues from "@typings/NotificationValues";

import { useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { updateNotification, removeNotification } from "@actions/notifications";

import delay from "@utils/delay";

import s from "./styles.module.css";

interface Props {
  notifications: NotificationValues[];
  updateNotification: (notification: NotificationValues) => void;
  removeNotification: (id: string) => void;
}

const Notification: React.FC<Props> = ({
  notifications,
  updateNotification,
  removeNotification,
}) => {
  const ANIMATION_DURATION = 500;

  const close = (notification: NotificationValues) => {
    if (notification.duration) {
      delay(notification.duration).then(() => {
        updateNotification({ ...notification, close: true });
        // fadeOut duration.
        delay(ANIMATION_DURATION, () => removeNotification(notification.id));
      });
    } else {
      updateNotification({ ...notification, close: true });
      delay(ANIMATION_DURATION, () => removeNotification(notification.id));
    }
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const durationNotifications = notifications.filter(
        (notification) => notification.duration
      );
      // fadeIn duration.
      delay(ANIMATION_DURATION, () =>
        durationNotifications.forEach((notification) => {
          close(notification);
        })
      );
    }
  }, [notifications]);

  return (
    <div role="presentation" className={s.container}>
      {notifications.length > 0 &&
        notifications.map((notification, i) => (
          <div
            role="dialog"
            aria-label={`Notification ${i + 1}`}
            key={notification.id}
            className={`${s.notification} ${
              notification.error ? s.error : ""
            } ${notification.close ? s.fadeOut : s.fadeIn}`}
          >
            <button
              aria-label="Close"
              onClick={() => close(notification)}
              disabled={notification.close}
            />

            {notification.content}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = ({
  notifications,
}: {
  notifications: NotificationValues[];
}) => ({ notifications });
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateNotification: (notification: NotificationValues) =>
    dispatch(updateNotification(notification)),
  removeNotification: (id: string) => dispatch(removeNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
