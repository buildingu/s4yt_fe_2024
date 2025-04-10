import type { Dispatch } from "redux";
import type { UserReduxState } from "@reducers/user";
import type NotificationValues from "@typings/NotificationValues";

import { connect } from "react-redux"
import { useState, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

import { SET_NEW_LOGIN_FLAG } from "@actions/index";
import { checkTotalCoins } from "@actions/game";
import { addNotification } from "@actions/notifications";

import { timeout, EstablishConnection } from "./socket";

import delay from "@utils/delay";

import OverlayLoader from "@components/loaders/overlayLoader";

interface Props {
  userToken: string | undefined;
  userEmail: string | undefined;
  newLogin: boolean | undefined;
  checkTotalCoins: () => Promise<void>;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
  clearNewLoginFlag: () => void;
}

const ResourceLoader: React.FC<Props> = ({
  userToken,
  userEmail,
  newLogin,
  addNotification,
  clearNewLoginFlag,
}) => {
  const [connecting, setConnecting] = useState("");

  useLayoutEffect(() => {
    if (userToken) {
      const promises = [];

      setConnecting("Obtaining resources");
      delay(29000, () => {
        if (connecting) setConnecting("Taking longer than expected...");
      });
      promises.push(
        EstablishConnection(userEmail!).catch((error: Error) => {
          addNotification({
            error: true,
            content: error.message,
            close: false,
            duration: 0
          });
        })
      );

      if (!newLogin) promises.push(checkTotalCoins());
      else clearNewLoginFlag();

      Promise.allSettled(promises).finally(() => setConnecting(""));

      return () => clearTimeout(timeout);
    }
  }, [userToken]);

  return connecting ? <OverlayLoader text={connecting} /> : <Outlet />;
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  userToken: user.tokens.access,
  userEmail: user.credentials?.email,
  newLogin: user.newLogin
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  checkTotalCoins: () => dispatch(checkTotalCoins() as unknown) as Promise<void>,
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
  clearNewLoginFlag: () => dispatch({ type: SET_NEW_LOGIN_FLAG, payload: false })
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceLoader);
