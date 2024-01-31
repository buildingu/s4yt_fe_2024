import { UserReduxState } from "@reducers/user";
import UserCredentials from "@typings/UserCredentials";
import { CoinTrackerState } from "@reducers/coinTracker";
import { GameConfigReduxState } from "@reducers/gameConfig";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

// import { store } from "@root/store";

import socketProvider from "@services/socketProvider";

import { isNotPlayer } from "@actions/user";
import { SET_CURRENT_USER, SET_NEW_LOGIN_FLAG } from "@actions/index";
import { initializeCoins } from "@actions/coinTracker";
// import { referralUsedListener } from "@actions/user";

import initializeFirebase from "@utils/initializeFirebase";
import history from "@utils/History";
import delay from "@utils/delay";

import OverlayLoader from "../loaders/overlayLoader";

interface Props extends React.PropsWithChildren<{}> {
  restricted: number;
  disableOn?: string[];
  user: UserReduxState;
  gameConfig: GameConfigReduxState;
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
  setUserCredentials: (user: UserCredentials) => void;
  initializeCoins: (data: Omit<CoinTrackerState, "items">) => void;
  clearNewLoginFlag: () => void;
}

interface LoginDTO {
  auth: string;
  timestamps: {
    register_start: string;
    game_start: string;
    review_start: string;
    review_end: string;
    game_end: string;
  };
  token: string;
  user: UserCredentials & { coins: number };
}

// TODO: Add only pages you can only be redirected to... probably?
const Gate: React.FC<Props> = ({
  children,
  restricted,
  disableOn,
  user,
  gameConfig,
  isNotPlayer,
  setUserCredentials,
  initializeCoins,
  clearNewLoginFlag,
}) => {
  const location = useLocation();

  useEffect(() => {
    socketProvider(); // So we can listen to real-time events.
    return () => window.Echo && window.Echo.disconnect();
  }, []);

  let redirect = "";
  useEffect(() => {
    redirect =
      gameConfig.restrictedAccess && user.token
        ? "/profile"
        : user.token &&
          ((gameConfig.reviewStart && !isNotPlayer()) || gameConfig.gameEnd)
        ? "/game-closed"
        : restricted === 1 && !user.token
        ? "/login"
        : restricted === 2 && user.token && user.credentials && !user.newLogin
        ? "/error-409" // Already logged in.
        : disableOn?.includes(
            gameConfig.gameStart
              ? "gameStart"
              : gameConfig.reviewStart
              ? "reviewStart"
              : gameConfig.winnersAnnounced
              ? "winnersAnnounced"
              : ""
          )
        ? user.token
          ? "/"
          : "/login"
        : "";

    if (redirect)
      history.push(redirect, { state: { from: location }, replace: true });
  }, [user.token, user.credentials, gameConfig.newPeriod, disableOn]);

  // On login it adds their credentials, ... when redirected. This is because of the restricted redirects.
  const storeUserData = (newLogin: LoginDTO) => {
    const { coins, ...userData } = newLogin.user;
    setUserCredentials(userData);
    initializeCoins({ remainingCoins: coins });
  };

  useEffect(() => {
    if (user.newLogin) {
      storeUserData(user.newLogin);

      initializeFirebase(user.newLogin.user.email); // Temporary use of Firebase because some thing couldn't done in the back-end.

      // referralUsedListener(); // Listen for if the referrer uses the referral to add coins to the user.

      delay(2000, () => clearNewLoginFlag());
    }
  }, [user.newLogin]);

  // useEffect(() => {
  //   console.log("store.getState()", store.getState());
  // }, [store.getState()]);

  return user.newLogin ? <OverlayLoader text="Loading user data" /> : children;
};

const mapStateToProps = ({
  user,
  gameConfig,
}: {
  user: UserReduxState;
  gameConfig: GameConfigReduxState;
}) => ({
  user,
  gameConfig,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message) as unknown) as boolean,
  setUserCredentials: (user: UserCredentials) =>
    dispatch({ type: SET_CURRENT_USER, payload: user }),
  initializeCoins: (data: Omit<CoinTrackerState, "items">) =>
    dispatch(initializeCoins(data)),

  clearNewLoginFlag: () =>
    dispatch({ type: SET_NEW_LOGIN_FLAG, payload: null }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gate);
