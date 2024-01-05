import s from "./styles.module.css";

interface Props {
  size?: string;
  style?: React.CSSProperties;
}

const Spinner: React.FC<Props> = ({ size, style }) => {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={s.spinner}
      style={{ ...(size && { width: size, height: size }), ...style }}
    />
  );
};

export default Spinner;
