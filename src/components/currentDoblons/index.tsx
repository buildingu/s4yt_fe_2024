import CoinTrackerState from "@typings/redux/CoinTrackerState";

import { connect } from "react-redux";

import s from "./styles.module.css";
import coins4 from "@static/coins_variant4.png";

interface Props {
  type: "footer" | "header";
  style?: React.CSSProperties;
  addFullHeader?: boolean | "";
  coins: number;
}

const CurrentDoblons = ({
  type,
  style,
  addFullHeader,
  coins,
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
        <span>{coins}</span>
        <br />
        Doblons
      </p>
    </div>
  );
};

const mapStateToProps = ({
  coinTracker,
}: {
  coinTracker: CoinTrackerState;
}) => ({
  coins: coinTracker.remainingCoins,
});
export default connect(mapStateToProps, null)(CurrentDoblons);
