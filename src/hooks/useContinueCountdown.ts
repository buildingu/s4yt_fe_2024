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
// const timestamps = {
//   register_start: "2023-01-19 13:00", // Game wouldn't be started when before game start so just restricted to profile (Don't need I think).
//   game_start: "2024-01-22 10:00", // When they're able to interact with the game pages.
//   review_start: "2024-01-24 10:00", // Only player roles will not be able to interact with anything.
//   review_end: "2024-01-25 11:00", // Award and raffle items are chosen.
//   game_end: "2024-02-01 17:00", // Entire app end.
// }; // Should be 48 hours in between game_start and review_start
const useContinueCountdown = () => {
  // Countdown on log in or saved countdown.
  const timestamps = useSelector(
      (state: { gameConfig: GameConfigReduxState }) =>
        state.gameConfig.timestamps
    ),
    countdown = useSelector(
      (state: { gameConfig: GameConfigReduxState }) =>
        state.gameConfig.countdown
    ),
    dispatch = useDispatch();

  const getSecondsInBetweenByTime = (from: number, till: number) => {
    return Math.max(0, Math.floor((till - from) / 1000));
  };
  const getSecondsByString = (countdown: string) => {
    const [hours, minutes, seconds] = countdown.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    const counter = document.getElementById("counter") as HTMLTimeElement;
    if (!timestamps || !countdown) {
      return;
      //  throw Error("The counter clock is in a error state;\n unexpectedly there was no countdown state to work with.")
    }

    const currentTimestamp = new Date().getTime(),
      gameStartTimestamp = new Date(timestamps.game_start).getTime(),
      reviewStartTimestamp = new Date(timestamps.review_start).getTime(),
      reviewEndTimestamp = new Date(timestamps.review_end).getTime(),
      gameEndTimestamp = new Date(timestamps.game_end).getTime();

      const formattedCurrentTimestamp = new Date(
        currentTimestamp
      ).toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false, // Use 24-hour format
      });

      // Format gameEndTimestamp
      const formattedGameEndTimestamp = new Date(
        gameEndTimestamp
      ).toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false, // Use 24-hour format
      });

      console.log("Current Timestamp:", formattedCurrentTimestamp);
      console.log("Game End Timestamp:", formattedGameEndTimestamp);

    console.log("currentTimestamp", currentTimestamp);
    console.log("gameStartTimestamp", gameStartTimestamp);
    console.log("reviewStartTimestamp", reviewStartTimestamp);
    console.log("reviewEndTimestamp", reviewEndTimestamp);
    console.log("gameEndTimestamp", gameEndTimestamp);

    let countdownSeconds: number | undefined;

    // FIXME: It just starts from the time in between these timestamps every time and we save it.
    // We probably still need the countdown? Because on logout it would just start from the time in between again, from the start.
    if (currentTimestamp < gameStartTimestamp) {
      // Game hasn't started, disable stuff.
      console.log("Haven't started.");
    } else if (currentTimestamp < reviewStartTimestamp) {
      // The actual game is ongoing.
      console.log("Game is ongoing.");
      countdownSeconds = getSecondsInBetweenByTime(
        gameStartTimestamp,
        reviewStartTimestamp
      );
      dispatch({
        type: UPDATE_CONFIGURATION,
        payload: {
          gameStart: true,
          reviewStart: false,
          winnersAnnounced: false,
        },
      });
    } else if (currentTimestamp < reviewEndTimestamp) {
      // Review has started.
      console.log("Review has started.");
      // If there is already a countdown... but there would always be a countdown on login?
      countdownSeconds = getSecondsByString(countdown); // This is here because I think we need the countdown still.
      // countdownSeconds = getSecondsInBetweenByTime(
      //   reviewStartTimestamp,
      //   reviewEndTimestamp
      // );
      dispatch({
        type: UPDATE_CONFIGURATION,
        payload: {
          gameStart: false,
          reviewStart: true,
          winnersAnnounced: false,
        },
      });
    } else if (currentTimestamp < gameEndTimestamp) {
      // Review has ended, just let everyone go to event results.
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
        },
      });
    } else {
      // Game has ended, probably don't need this here because every time the countdown goes to 0 it logs everyone out.
      console.log("Game ended.");
    }
    console.log("countdownSeconds", countdownSeconds);

    let newCountdown: string | undefined;

    const countdownInterval = setInterval(() => {
      if (countdownSeconds !== undefined && countdownSeconds > 0) {
        // console.log("countdownSeconds", countdownSeconds);
        const hours = Math.floor(countdownSeconds / 3600),
          minutes = Math.floor((countdownSeconds % 3600) / 60),
          seconds = countdownSeconds % 60;

        newCountdown = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        counter.innerText = newCountdown;
        counter.dateTime = newCountdown;
        console.log("newCountdown", newCountdown);

        countdownSeconds -= 1;
      } else {
        console.log("LOGOUT");
        // dispatch({ type: LOGOUT });
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      // On unmount we save the new countdown.
      dispatch({
        type: UPDATE_CONFIGURATION,
        payload: {
          countdown: newCountdown ? newCountdown : "00:00:00",
        },
      });
      clearInterval(countdownInterval);
    };
  }, [document.getElementById("counter")]);

  return {};
};

export default useContinueCountdown;
