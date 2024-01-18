import CoinTrackerState from "@typings/redux/CoinTrackerState";

import { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { getCoinsGainedHistory } from "@actions/coinTracker";

import Spinner from "@components/loaders/spinner/Spinner";

import s from "./styles.module.css";
import coins from "@static/coins_variant1.png";

interface CoinsGainedDTO {
  source: string;
  count: number;
}

interface Props {
  remainingCoins: number;
  getCoinsGainedHistory: (
    setCoinsGainedHistory: React.Dispatch<
      React.SetStateAction<CoinsGainedDTO[]>
    >
  ) => Promise<any>;
}

const Coins: React.FC<Props> = ({ remainingCoins, getCoinsGainedHistory }) => {
  const [coinsGainedHistory, setCoinsGainedHistory] = useState<
    CoinsGainedDTO[]
  >([]);

  useEffect(() => {
    if (!coinsGainedHistory.length)
      getCoinsGainedHistory(setCoinsGainedHistory);
  }, []);

  return (
    <section className={s.coinsStatus}>
      <h2>My Dubl-u-nes Status</h2>
      <div>
        <div className={s.coins}>
          <img src={coins} alt="Doblon Coins" />
          <p>
            You got <br />
            <b className={s.remain}>{remainingCoins}</b> <br />
            <span className={s.dub}>Dubl-u-nes</span>
          </p>
        </div>
        <div
          aria-live="polite"
          aria-busy={!coinsGainedHistory.length}
          className={s.statuses}
        >
          {!coinsGainedHistory.length ? (
            <Spinner size="2rem" />
          ) : (
            coinsGainedHistory.map((detail, i) => (
              <div key={i}>
                <h4>{detail.source}</h4>
                <span>{detail.count}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({
  coinTracker,
}: {
  coinTracker: CoinTrackerState;
}) => ({
  remainingCoins: coinTracker.remainingCoins,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getCoinsGainedHistory: (
    setCoinsGainedHistory: React.Dispatch<
      React.SetStateAction<Array<CoinsGainedDTO>>
    >
  ) =>
    dispatch(
      getCoinsGainedHistory(setCoinsGainedHistory) as unknown
    ) as Promise<any>,
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
