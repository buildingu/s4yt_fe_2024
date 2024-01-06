import NotificationValues from "@typings/NotificationValues";

import { useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { setNotification } from "@actions/notification";

import delay from "@utils/delay";

import s from "./styles.module.css";
interface Props {
  notification: NotificationValues;
  setNotification: (data: any) => void;
}

const Notification: React.FC<Props> = ({ notification, setNotification }) => {
  const ANIMATION_DURATION = 500,
    closeNotification = () =>
      setNotification({ ...notification, display: false });

  const close = () => {
    if (notification.duration) {
      delay(notification.duration).then(() =>
        delay(ANIMATION_DURATION, () => closeNotification)
      );
    } else {
      delay(ANIMATION_DURATION, () => closeNotification);
    }
  };

  useEffect(() => {
    if (notification.display && notification.close) {
      close();
    }
  }, [notification.close]);

  useEffect(() => {
    if (notification) {
      console.log("notification", notification);
    }
  }, [notification]);

  return (
    <>
      {notification.display && (
        <div
          role="dialog"
          className={`${s.container} ${notification.error ? s.error : ""} ${
            notification.close ? s.fadeOut : ""
          }`}
        >
          <button
            aria-label="Close"
            onClick={() => setNotification({ ...notification, close: true })}
            disabled={notification.close}
          />

          {notification.content}
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ notification }: Props) => ({ notification });
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setNotification: (data: any) => dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
