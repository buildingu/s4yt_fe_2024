import React, { useEffect, useState } from "react";

import s from "./styles.module.css";

interface Props {
  disabledButton: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  cooldownTime: string;
}

const CooldownIndicator: React.FC<Props> = ({
  setDisabled,
  cooldownTime,
  disabledButton,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(0);
  const submittedTime = new Date(cooldownTime).getTime();
  const submittedOffset = submittedTime + 30 * 60 * 1000;

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTimeInSeconds = Math.max(
        0,
        Math.floor((submittedOffset - currentTime) / 1000)
      );

      if (remainingTimeInSeconds <= 0) {
        clearInterval(timerInterval);
        setDisabled(false);
      }
      if (!disabledButton && remainingTimeInSeconds > 0) {
        setDisabled(true);
      }
      setTimeRemaining(remainingTimeInSeconds);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [cooldownTime, setDisabled, disabledButton, submittedOffset]);

  return (
    <time className={s.cooldownContainer}>
      {timeRemaining !== null && timeRemaining >= 0 && disabledButton ? (
        <p>
          Cooldown:{" "}
          <span>
            {String(Math.floor(timeRemaining / 60)).padStart(2, "0")}:
            {String(timeRemaining % 60).padStart(2, "0")}
          </span>
        </p>
      ) : null}
    </time>
  );
};

export default CooldownIndicator;
