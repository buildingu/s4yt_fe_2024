import { UserReduxState } from "@reducers/user";
import UserCredentials from "@typings/UserCredentials";
import { CoinTrackerState } from "@reducers/coinTracker";
import { GameConfigReduxState } from "@reducers/gameConfig";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import history from "@utils/History";

// import { store } from "@root/store";

import { SET_CURRENT_USER, SET_NEW_LOGIN_FLAG } from "@actions/index";
import { initializeCoins } from "@actions/coinTracker";
import { updateConfiguration } from "@actions/gameConfig";

interface Props extends React.PropsWithChildren<{}> {
  user: UserReduxState;
  gameConfig: GameConfigReduxState;
  restricted: number;
  setUserCredentials: (user: UserCredentials) => void;
  initializeCoins: (data: Omit<CoinTrackerState, "items">) => void;
  updateConfiguration: (data: GameConfigReduxState) => void;
  clearNewLoginFlag: () => void;
}

interface LoginDTO {
  auth: string;
  countdown: string;
  token: string;
  user: UserCredentials & { coins: number };
}

// TODO: Add only pages you can only be redirected to... probably?
const Gate: React.FC<Props> = ({
  children,
  user,
  gameConfig,
  restricted,
  setUserCredentials,
  initializeCoins,
  updateConfiguration,
  clearNewLoginFlag,
}) => {
  const location = useLocation();

  let redirect = "";
  useEffect(() => {
    redirect =
      gameConfig.restrictedAccess && user.token
        ? "/profile"
        : restricted === 1 && !user.token
        ? "/login"
        : restricted === 2 && user.token && user.credentials
        ? "/error-409" // Already logged in.
        : "";

    if (redirect)
      history.push(redirect, { state: { from: location }, replace: true });
  }, [user.token, gameConfig.restrictedAccess]);

  // On login it adds their credentials, ... when redirected. This is because of the restricted redirects.
  const storeUserData = (newLogin: LoginDTO) => {
    const { coins, ...userData } = newLogin.user;
    console.log("coins", coins);
    setUserCredentials(userData);
    initializeCoins({ remainingCoins: coins });

    newLogin.countdown
      ? updateConfiguration({
          countdown: user.newLogin.countdown,
          gameStart: true,
        })
      : updateConfiguration({ restrictedAccess: true }); // Only allowed to profile.
  };

  useEffect(() => {
    // TODO: Could add a loading overlay when this happening?
    if (user.newLogin) {
      console.log("newLogin", user.newLogin);
      storeUserData(user.newLogin);

      clearNewLoginFlag();
    }
  }, [user.newLogin]);

  // useEffect(() => {
  //   console.log("store.getState()", store.getState());
  // }, [store.getState()]);

  return children;
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
  setUserCredentials: (user: UserCredentials) =>
    dispatch({ type: SET_CURRENT_USER, payload: user }),
  initializeCoins: (data: Omit<CoinTrackerState, "items">) =>
    dispatch(initializeCoins(data)),
  updateConfiguration: (data: GameConfigReduxState) =>
    dispatch(updateConfiguration(data)),

  clearNewLoginFlag: () =>
    dispatch({ type: SET_NEW_LOGIN_FLAG, payload: null }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gate);
