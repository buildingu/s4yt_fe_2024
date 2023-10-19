import { useNavigate } from "react-router-dom";
import s from "./styles.module.css";
import coins1 from "@static/coins_variant1.png";

interface Props {
  style?: React.CSSProperties;
}

const Status: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  style,
  ...options
}) => {
  const navigate = useNavigate();

  // TODO: I don't know if this is going to be the actual footer or not, and don't know what to name the file.
  return (
    <div className={s.container} style={style} {...options}>
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
