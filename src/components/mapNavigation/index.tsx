import { useNavigate } from "react-router-dom";
import s from "./styles.module.css";

interface Props {
  img: string;
  alt: string;
  txt: string;
  to: string;
}

const MapNavigation: React.FC<Props> = ({ img, alt, txt, to }) => {
  const navigate = useNavigate();

  return (
    <a href={to} className={s.card} onClick={() => navigate(to)}>
      <img src={img} alt={alt} />
      <h4>{txt}</h4>
    </a>
  );
};

export default MapNavigation;
