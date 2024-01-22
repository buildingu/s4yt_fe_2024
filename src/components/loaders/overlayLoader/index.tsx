import s from "./styles.module.css";

interface Props {
  text: string;
}

const OverlayLoader: React.FC<Props> = ({ text }) => {
  return (
    <div role="presentation" className={`${s.backdrop} backdrop`}>
      <div role="status" className={`overlayLoader ${s.loaderContainer}`}>
        <div className={s.text}>{text}...</div>
        <span aria-label="Loading Indicator" className={s.loader} />
      </div>
    </div>
  );
};

export default OverlayLoader;
