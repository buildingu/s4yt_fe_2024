import { useNavigate } from "react-router-dom";
import s from "./styles.module.css";
import CurrentDoblons from "../currentDoblons";

interface Props {
  style?: React.CSSProperties;
}

const Status: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  style,
  ...options
}) => {
  const navigate = useNavigate();

  return (
    <footer className={s.container} style={style} {...options}>
      <div>
        <CurrentDoblons type="footer" />
        {/* TODO: Need to figure out where Chat and Support goes to. */}
        <button aria-label="Chat" className={s.chat} />
        <button aria-label="Support" className={s.questions} />
        <a
          aria-label="building-U Website"
          href="https://building-u.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={s.checkout}
        />
      </div>
      {/* TODO: Get the time of how long the game is remaining from back-end? */}
      <p className={s.timer}>
        You still have <span aria-label="Time Remaining">48:00:00</span> left
      </p>
    </footer>
  );
};

export default Status;
