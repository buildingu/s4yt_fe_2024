import useContinueCountdown from "@hooks/useContinueCountdown";

import CurrentDoblons from "../currentDoblons";
import SupportModal from "@components/modals/supportModal/SupportModal";

import s from "./styles.module.css";

interface Props {
  style?: React.CSSProperties;
}

const Status: React.FC<Props> = ({ style }) => {
  // Starts the countdown and sets the timestamps.
  useContinueCountdown();

  return (
    <footer className={s.container} style={style}>
      <div>
        <CurrentDoblons type="footer" />
        <button
          aria-label="Chat"
          aria-disabled="true"
          className={s.chat}
          onClick={() =>
            alert(
              "This is a feature that will be implemented in the future - ❤ dev team."
            )
          }
        />
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
          dateTime="00:00:00"
        >
          00:00:00
        </time>
        left
      </p>
    </footer>
  );
};

export default Status;
