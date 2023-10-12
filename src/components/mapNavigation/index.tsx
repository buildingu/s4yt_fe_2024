import { useNavigate } from "react-router-dom";
import s from "./styles.module.css";

interface Props {
  img: string;
  alt: string;
  txt: string;
}

const MapNavigation: React.FC<Props> = ({ img, alt, txt }) => {
  const navigate = useNavigate();

  return (
    <div role="link" className={s.card} onClick={() => navigate("/sponsors")}>
      <img src={img} alt={alt} />
      <h4>{txt}</h4>
    </div>
  );
};

export default MapNavigation;
