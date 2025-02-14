import { CoinTrackerState } from "@reducers/coinTracker";

import { Dispatch } from "redux";
import { connect } from "react-redux";

import { isNotPlayer } from "@actions/user";

import s from "./styles.module.css";
import coins4 from "/images/coins_variant4.png";

interface Props {
  type: "footer" | "header";
  style?: React.CSSProperties;
  addFullHeader?: boolean | "";
  coins: number;
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
}

const CurrentCoins = ({
  type,
  style,
  addFullHeader,
  coins,
  isNotPlayer,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      aria-label="Your Current Balance"
      className={`${s.coins} ${
        type !== "footer" && addFullHeader ? `${s.header} ${s.headerFull}` : ""
      }`}
      style={style}
      {...props}
    >
      <img src={coins4} alt="Dubl-u-nes Stack" />
      {!isNotPlayer() && (
        <p>
          You got <br />
          <span>{isNotPlayer() ? 0 : coins}</span>
          <br />
          Dubl-u-nes
        </p>
      )}
    </div>
  );
};

const mapStateToProps = ({
  coinTracker,
}: {
  coinTracker: CoinTrackerState;
}) => ({
  coins: coinTracker.userCoins
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message) as unknown) as boolean
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCoins);
