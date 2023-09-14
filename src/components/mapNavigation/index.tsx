import s from "./styles.module.css";

interface Props {
  img: string;
  alt: string;
  txt: string;
}

const MapNavigation: React.FC<Props> = ({ img, alt, txt }) => {
  return (
    <div className={s.card}>
      <img src={img} alt={alt} />
      <h4>{txt}</h4>
    </div>
  );
};

export default MapNavigation;
