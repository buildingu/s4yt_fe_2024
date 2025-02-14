import type { Dispatch } from "redux";
import type { UserReduxState } from "@reducers/user";
import type NotificationValues from "@typings/NotificationValues";

import { connect } from "react-redux"
import { useState, useLayoutEffect, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { SET_NEW_LOGIN_FLAG } from "@actions/index";
import { checkTotalCoins, coinChangesListener } from "@actions/coinTracker";
import { addNotification } from "@actions/notifications";

import { timeout, EstablishConnection } from "./socket";

import delay from "@utils/delay";

import OverlayLoader from "@components/loaders/overlayLoader";

interface ResourceLoaderProps {
  userToken: string | undefined;
  newLogin: boolean | undefined;
  checkTotalCoins: () => Promise<void>;
  clearNewLoginFlag: () => void;
  coinChangesListener: () => void;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
}

const SocketProvider = ({
  newLogin,
  userToken,
  addNotification,
  clearNewLoginFlag,
  coinChangesListener
}: ResourceLoaderProps) => {
  const [connecting, setConnecting] = useState("");

  useLayoutEffect(() => {
    if (userToken) {
      const promises = [];

      // TODO: Msg
      setConnecting("Loading user data");
      delay(29000, () => {
        if (connecting) setConnecting("Taking longer than expected...");
      });

      promises.push(
        EstablishConnection().catch((error: Error) => {
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

  useEffect(() => {
    coinChangesListener();
  }, []);

  return connecting ? <OverlayLoader text={connecting} /> : <Outlet />;
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  userToken: user.tokens.access,
  newLogin: user.newLogin
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  checkTotalCoins: () => dispatch(checkTotalCoins() as unknown) as Promise<void>,
  clearNewLoginFlag: () => dispatch({ type: SET_NEW_LOGIN_FLAG, payload: false }),
  coinChangesListener: () => dispatch(coinChangesListener()),
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketProvider);
