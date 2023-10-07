import { useNavigate } from "react-router-dom";
import s from "./styles.module.css";
import coins1 from "@static/coins_variant1.png";

interface Props {}

const Status: React.FC<Props> = ({}) => {
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <div>
        <img src={coins1} alt="Doblons" />
        <p>
          You got <br />
          <span>24</span>
          <br />
          Doblons
        </p>
        <button className={s.chat} />
        <button className={s.questions} />
        <button className={s.checkout} />
      </div>
      <p className={s.timer}>
        You still have <span>24:00:00</span> left
      </p>
    </div>
  );
};

export default Status;
