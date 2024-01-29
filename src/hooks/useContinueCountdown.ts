import { GameConfigReduxState } from "@reducers/gameConfig";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  UPDATE_CONFIGURATION,
  UPDATE_NEW_PERIOD,
  ADD_NOTIFICATION,
  LOGOUT,
} from "@actions/index";

import delay from "@utils/delay";

const useContinueCountdown = (
  counterRef: React.RefObject<HTMLTimeElement>,
  isGameClosedCounter: boolean
) => {
  const timestamps = useSelector(
      (state: { gameConfig: GameConfigReduxState }) =>
        state.gameConfig.timestamps
    ),
    // reviewStart can be set when they redirect to /game-closed.
    reviewStart = useSelector(
      (state: { gameConfig: GameConfigReduxState }) =>
        state.gameConfig.reviewStart
    ),
    dispatch = useDispatch();

  const getSecondsInBetweenByTime = (from: number, till: number) => {
    return Math.max(0, Math.floor((till - from) / 1000));
  };

  useEffect(() => {
    if (
      !timestamps ||
      !counterRef.current ||
      (isGameClosedCounter && !reviewStart)
    ) {
      return;
      //  throw Error("The counter clock is in a error state;\n unexpectedly there was no countdown state to work with.")
    }
    const counter = counterRef.current;

    const currentTimestamp = new Date().getTime(),
      // gameStartTimestamp = new Date(timestamps.game_start).getTime(),
      reviewStartTimestamp = new Date(timestamps.review_start).getTime(),
      reviewEndTimestamp = new Date(timestamps.review_end).getTime(),
      gameEndTimestamp = new Date(timestamps.game_end).getTime();

    // console.log("currentTimestamp", currentTimestamp);
    // console.log("gameStartTimestamp", gameStartTimestamp);
    // console.log("reviewStartTimestamp", reviewStartTimestamp);
    // console.log("reviewEndTimestamp", reviewEndTimestamp);
    // console.log("gameEndTimestamp", gameEndTimestamp);

    let countdownSeconds: number | undefined;

    /* 
       This just sets the countdown and timestamps for the game. Some is not here, like the when the game haven't started 
       we don't have to worry about that one here because if the game haven't started restrictedAccess gets set from the login.
    */
    if (currentTimestamp < reviewStartTimestamp) {
      // The actual game is ongoing.
      console.log("Game is ongoing.");
      countdownSeconds = getSecondsInBetweenByTime(
        currentTimestamp,
        reviewStartTimestamp
      );
      dispatch({
        type: UPDATE_CONFIGURATION,
        payload: {
          gameStart: true,
          reviewStart: false,
          winnersAnnounced: false,
          gameEnd: false,
        },
      });
    } else if (currentTimestamp < reviewEndTimestamp) {
      // Review has started.
      console.log("Review has started.");
      countdownSeconds = getSecondsInBetweenByTime(
        currentTimestamp,
        reviewEndTimestamp
      );
      dispatch({
        type: UPDATE_CONFIGURATION,
        payload: {
          gameStart: false,
          reviewStart: true,
          winnersAnnounced: false,
          gameEnd: false,
        },
      });
    } else if (currentTimestamp < gameEndTimestamp) {
      // Review has ended, everyone goes to event results.
      console.log("Review ended.");
      countdownSeconds = getSecondsInBetweenByTime(
        currentTimestamp,
        gameEndTimestamp
      );
      dispatch({
        type: UPDATE_CONFIGURATION,
        payload: {
          gameStart: false,
          reviewStart: false,
          winnersAnnounced: true,
          gameEnd: false,
        },
      });
    } else {
      // Game has ended.
      console.log("Game ended.");
      dispatch({
        type: UPDATE_CONFIGURATION,
        payload: {
          gameStart: false,
          reviewStart: false,
          winnersAnnounced: false,
          gameEnd: true,
        },
      });
    }
    // This is literally for the redirect useEffect in the gate, I didn't want to add the full list to useEffect; gameConfig.gameStart, etc.
    dispatch({ type: UPDATE_NEW_PERIOD });

    // console.log("countdownSeconds", countdownSeconds);

    let newCountdown: string | undefined;
    const countdownInterval = setInterval(() => {
      if (countdownSeconds !== undefined && countdownSeconds > 0) {
        const hours = Math.floor(countdownSeconds / 3600),
          minutes = Math.floor((countdownSeconds % 3600) / 60),
          seconds = countdownSeconds % 60;

        newCountdown = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        counter.innerText = newCountdown;
        counter.dateTime = newCountdown;
        // console.log("newCountdown", newCountdown);

        countdownSeconds -= 1;
      } else {
        if (countdownSeconds !== undefined && countdownSeconds <= 0) {
          dispatch({
            type: ADD_NOTIFICATION,
            payload: {
              error: true,
              content:
                "You are now being logged out because the timer has ran out...",
              close: false,
              duration: 0,
            },
          });
          delay(2500, () => dispatch({ type: LOGOUT }));
        }

        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [counterRef.current]);
};

export default useContinueCountdown;
