import { useEffect, useRef } from "react";

interface Props {
  elapsed: boolean;
  setElapsed: React.Dispatch<React.SetStateAction<boolean>>;
  cooldownTime?: number;
}

const CooldownIndicator: React.FC<Props> = ({
  elapsed,
  setElapsed,
  cooldownTime = 0
}) => {
  const countdownRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!elapsed) {
      const timerInterval = setInterval(() => {
        const timeRemaining = cooldownTime - Date.now(),
          minutes = Math.floor(timeRemaining / 60000),
          seconds = Math.floor((timeRemaining % 60000) / 1000);
        
        countdownRef.current!.innerHTML = `${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`;

        if (timeRemaining <= 0) {
          clearInterval(timerInterval)
          setElapsed(true);
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [elapsed]);

  return (
    !elapsed && (
      <time>
        Cooldown:{" "}
        <span ref={countdownRef}>00:00</span>
      </time>
    )
  );
};

export default CooldownIndicator;
