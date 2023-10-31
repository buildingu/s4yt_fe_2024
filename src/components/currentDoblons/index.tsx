import s from "./styles.module.css";
import coins4 from "@static/coins_variant4.png";

interface Props {
  type: "footer" | "header";
  style?: React.CSSProperties;
  addFullHeader?: boolean | "";
}

const CurrentDoblons = ({
  type,
  style,
  addFullHeader,
  ...options
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      aria-label="Your Current Doblons"
      className={`${s.doblons} ${
        type !== "footer" && addFullHeader ? `${s.header} ${s.headerFull}` : ""
      }`}
      style={style}
      {...options}
    >
      <img src={coins4} alt="Doblons" />
      <p>
        You got <br />
        <span>24</span>
        <br />
        Doblons
      </p>
    </div>
  );
};

export default CurrentDoblons;
