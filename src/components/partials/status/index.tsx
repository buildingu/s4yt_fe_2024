import { useRef } from "react";

import useContinueCountdown from "@hooks/useContinueCountdown";

import CurrentCoins from "../currentCoins";
import SupportModal from "@components/modals/supportModal/SupportModal";

import s from "./styles.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Status: React.FC<Props> = ({ className, style }) => {
  const counterRef = useRef<HTMLTimeElement>(null);

  // Starts the countdown and sets the timestamps.
  useContinueCountdown(counterRef);

  return (
    <footer
      className={`${s.container}${className ? " " + className : ""}`}
      style={style}
    >
      <div>
        <CurrentCoins type="footer" />

        <SupportModal />
        <a
          aria-label="building-U Website"
          href="https://building-u.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={s.checkout}
        />
      </div>
      <p className={s.timer}>
        You still have
        <time
          aria-label="Time Remaining"
          title="Time Remaining for this Period of the Game"
          id="counter"
          ref={counterRef}
          dateTime="00:00:00"
        >
          00:00:00
        </time>
        left
      </p>

      <a
        href="http://building-u.com/wp-content/uploads/Privacy-Notice.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="privacy fade move"
      >
        Private Policy
      </a>
    </footer>
  );
};

export default Status;
