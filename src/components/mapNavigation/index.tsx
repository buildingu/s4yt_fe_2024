import history from "@utils/History";
import s from "./styles.module.css";

interface Props {
  img: string;
  alt: string;
  txt: string;
  to: string;
  disabled?: boolean;
}

const MapNavigation: React.FC<Props> = ({ img, alt, txt, to, disabled }) => {
  return (
    <a
      href={to}
      className={s.card}
      onClick={(e) => {
        e.preventDefault();
        if (to && !disabled) history.push(to);
      }}
      {...((!to || disabled) && { "aria-disabled": true })}
    >
      <img src={img} alt={alt} />
      <h4>{txt}</h4>
    </a>
  );
};

export default MapNavigation;
