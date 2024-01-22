import { GameConfigReduxState } from "@reducers/gameConfig";

import { connect } from "react-redux";

import CurrentDoblons from "../currentDoblons";
import SupportModal from "../modals/supportModal/SupportModal";

import s from "./styles.module.css";

interface Props {
  style?: React.CSSProperties;
  countdown?: string;
}

const Status: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  style,
  countdown,
  ...options
}) => {
  // test example if needed
  const currentStudent = { name: "Admin", email: "admin@mail.com" };

  return (
    // FIXME: {...options} throwing "Invalid value for prop `dispatch` on <footer> tag." error
    <footer className={s.container} style={style} {...options}>
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
        <SupportModal student={currentStudent} />
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
          title="Time Remaining of the Game"
          id="counter"
          dateTime={countdown}
        >
          48:00:00
        </time>
        left
      </p>
    </footer>
  );
};

const mapStateToProps = ({
  gameConfig,
}: {
  gameConfig: GameConfigReduxState;
}) => ({ countdown: gameConfig.countdown });

export default connect(mapStateToProps, null)(Status);
