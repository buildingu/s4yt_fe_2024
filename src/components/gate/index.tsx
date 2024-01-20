import { UserReduxState } from "@reducers/user";
import UserCredentials from "@typings/UserCredentials";
import { GameConfigReduxState } from "@reducers/gameConfig";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import history from "@utils/History";

import { SET_CURRENT_USER, SET_NEW_LOGIN_FLAG } from "@actions/index";
import { updateConfiguration } from "@actions/gameConfig";

interface Props extends React.PropsWithChildren<{}> {
  user: UserReduxState;
  gameConfig: GameConfigReduxState;
  restricted: number;
  updateConfiguration: (data: GameConfigReduxState) => void;
  setUserCredentials: (user: UserCredentials) => void;
  clearNewLoginFlag: () => void;
}

// TODO: Add only pages you can only be redirected to... probably?
const Gate: React.FC<Props> = ({
  children,
  user,
  gameConfig,
  restricted,
  updateConfiguration,
  setUserCredentials,
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
  useEffect(() => {
    // TODO: Could add a loading overlay when this happening?
    if (user.newLogin) {
      setUserCredentials(user.newLogin.user);
      user.newLogin.countdown
        ? updateConfiguration({
            countdown: user.newLogin.countdown,
            gameStart: true,
          })
        : updateConfiguration({ restrictedAccess: true }); // Only allowed to profile.

      clearNewLoginFlag();
    }

    // console.log("gameConfig", gameConfig);

    // console.log("user.token", user.token);
    // console.log("user.newLogin", user.newLogin);
    // console.log("user.credentials", user.credentials);
  }, [user.newLogin]);

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
  updateConfiguration: (data: GameConfigReduxState) =>
    dispatch(updateConfiguration(data)),
  setUserCredentials: (user: UserCredentials) =>
    dispatch({ type: SET_CURRENT_USER, payload: user }),

  clearNewLoginFlag: () =>
    dispatch({ type: SET_NEW_LOGIN_FLAG, payload: null }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gate);
