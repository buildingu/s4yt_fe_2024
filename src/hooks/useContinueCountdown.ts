import { GameConfigReduxState } from "@reducers/gameConfig";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { UPDATE_CONFIGURATION, LOGOUT } from "@actions/index";

/* 
   If the current time is lower than game_start the game has not started and the countdown 
   is off. (Would just be login disabled from the back-end?) If the current time is greater or equal 
   than review_start the login is disabled (with the message page) and countdown is off. Any time in between 
   countdown will be the difference between review_start and current_time.
*/

// TODO: We should get the countdown on page load instead to fix the saved countdown?
// TODO: Now getting timestamps instead of the countdown.
const useContinueCountdown = () => {
  const timestamps = useSelector(
      (state: { gameConfig: GameConfigReduxState }) =>
        state.gameConfig.timestamps
    ),
    // Countdown on log in or saved countdown.
    // countdown = useSelector(
    //   (state: { gameConfig: GameConfigReduxState }) =>
    //     state.gameConfig.countdown
    // ),
    dispatch = useDispatch();

  // const getSecondsByString = (countdown: string) => {
  //   const [hours, minutes, seconds] = countdown.split(":").map(Number);
  //   return hours * 3600 + minutes * 60 + seconds;
  // };
  const getSecondsInBetweenByTime = (from: number, till: number) => {
    return Math.max(0, Math.floor((till - from) / 1000));
  };

  useEffect(() => {
    const counter = document.getElementById("counter") as HTMLTimeElement;
    if (
      !timestamps
      // || !countdown
    ) {
      return;
      //  throw Error("The counter clock is in a error state;\n unexpectedly there was no countdown state to work with.")
    }

    const currentTimestamp = new Date().getTime(),
      gameStartTimestamp = new Date(timestamps.game_start).getTime(),
      reviewStartTimestamp = new Date(timestamps.review_start).getTime(),
      reviewEndTimestamp = new Date(timestamps.review_end).getTime(),
      gameEndTimestamp = new Date(timestamps.game_end).getTime();

    console.log("currentTimestamp", currentTimestamp);
    console.log("gameStartTimestamp", gameStartTimestamp);
    console.log("reviewStartTimestamp", reviewStartTimestamp);
    console.log("reviewEndTimestamp", reviewEndTimestamp);
    console.log("gameEndTimestamp", gameEndTimestamp);

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
    // console.log("countdownSeconds", countdownSeconds);

    // countdownSeconds = getSecondsByString(countdown);

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
        if (countdownSeconds !== undefined && countdownSeconds <= 0)
          dispatch({ type: LOGOUT });

        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);

    // return () => {
    //   // On unmount we save the new countdown.
    //   dispatch({
    //     type: UPDATE_CONFIGURATION,
    //     payload: {
    //       countdown: newCountdown ? newCountdown : "00:00:00",
    //     },
    //   });
    //   clearInterval(countdownInterval);
    // };
  }, [document.getElementById("counter")]);
};

export default useContinueCountdown;
