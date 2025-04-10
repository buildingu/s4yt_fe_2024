import { UserReduxState } from "@reducers/user";
import { GameConfigReduxState } from "@reducers/gameConfig";

import { useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { store } from "@root/store";

import { isNotPlayer } from "@actions/user";

import history from "@utils/History";

interface Props extends React.PropsWithChildren<{}> {
  restricted: number;
  disableOn?: string[];
  user: UserReduxState;
  gameConfig: GameConfigReduxState;
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
}

const redirect = (path: string) => history.push(path, { replace: true });

const Redirects: React.FC<Props> = ({
  children,
  restricted,
  disableOn,
  user,
  gameConfig,
  isNotPlayer
}) => {
  useEffect(() => {
    if (gameConfig.restrictedAccess && user.tokens.access) {
      // If restricted access after log in they're only allow to their profile.
      redirect("/profile");
    } else if (
      user.tokens.access &&
      ((gameConfig.reviewStart && !isNotPlayer()) || gameConfig.gameEnd)
    ) {
      // game-closed is the only page when the game is fully ended after log in.
      redirect("/game-closed");
    } else if (restricted === 1 && !user.tokens.access) {
      // Restricts pages that you must be logged in for.
      redirect("/login");
    } else if (
      restricted === 2 && user.tokens.access && user.credentials
    ) {
      // Already logged in; restricts pages that you should be logged out for.
      redirect("/error-409");
    } else if (
      disableOn?.includes(
        gameConfig.preGame
          ? "preGame"
          : gameConfig.gameStart
          ? "gameStart"
          : gameConfig.reviewStart
          ? "reviewStart"
          : gameConfig.winnersAnnounced
          ? "winnersAnnounced"
          : ""
      )
    ) {
      redirect(user.tokens.access ? "/" : "/login");
    }
  }, [user.tokens.access, user.credentials, gameConfig.newPeriod, disableOn]);

  if (import.meta.env.DEV) {
    useEffect(() => {
      console.log("store.getState()", store.getState());
    }, [store.getState()]);
  }

  return children;
};

const mapStateToProps = ({
  user,
  gameConfig
}: {
  user: UserReduxState;
  gameConfig: GameConfigReduxState;
}) => ({
  user,
  gameConfig
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message) as unknown) as boolean
});

export default connect(mapStateToProps, mapDispatchToProps)(Redirects);
