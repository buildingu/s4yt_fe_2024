import s from "./styles.module.css";
import CurrentDoblons from "../currentDoblons";
import SupportModal from "../modals/supportModal/SupportModal";
import { useState } from "react";

interface Props {
  style?: React.CSSProperties;
}

const Status: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  style,
  ...options
}) => {

  const [isOpened, setIsOpened] = useState<boolean>(false)
  // test example if needed
  const currentStudent = {name: "Admin", email: "admin@mail.com"}

  return (
    <footer className={s.container} style={style} {...options}>
      <div>
        <CurrentDoblons type="footer" />
        {/* TODO: Need to figure out where Chat and Support goes to. */}
        <button aria-label="Chat" className={s.chat} />
        {/* <button aria-label="Support" className={s.questions} /> */}
        {/* support modal */}
        <SupportModal
          setShow={setIsOpened}
          student={currentStudent}
        />
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
