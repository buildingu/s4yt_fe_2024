import type { CoinTrackerState } from "@reducers/coinTracker";
import type { Dispatch } from "redux";

import { useState, useLayoutEffect } from "react";
import { connect } from "react-redux";

import { getCoinsGainedHistory } from "@actions/coinTracker";

import Spinner from "@components/loaders/spinner";

import s from "./styles.module.css";
import coins from "/images/coins_variant1.png";

interface CoinsGainedDTO {
  source: string;
  count: number;
}

interface Props {
  userCoins: number;
  getCoinsGainedHistory: (
    setCoinsGainedHistory: React.Dispatch<
      React.SetStateAction<CoinsGainedDTO[]>
    >
  ) => Promise<void>;
}

const Coins: React.FC<Props> = ({ userCoins, getCoinsGainedHistory }) => {
  const [coinsGainedHistory, setCoinsGainedHistory] = useState<
    CoinsGainedDTO[]
  >([]);

  useLayoutEffect(() => {
    if (!coinsGainedHistory.length)
      getCoinsGainedHistory(setCoinsGainedHistory);
  }, []);

  return (
    <section className={s.coinsStatus}>
      <h2>My Dubl-u-nes Status</h2>
      <div>
        <div className={s.coins}>
          <img src={coins} alt="Dubl-u-nes Stack" />
          <p>
            You got <br />
            <b className={s.remain}>{userCoins}</b> <br />
            <span className={s.dub}>Dubl-u-nes</span>
          </p>
        </div>
        <div
          aria-live="polite"
          aria-busy={!coinsGainedHistory.length}
          className={s.statuses}
        >
          {/* Loader on none because they should have a entry added on register (they get coins on register). */}
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

const mapStateToProps = ({ coinTracker }: { coinTracker: CoinTrackerState }) => ({
  userCoins: coinTracker.userCoins
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getCoinsGainedHistory: (
    setCoinsGainedHistory: React.Dispatch<
      React.SetStateAction<Array<CoinsGainedDTO>>
    >
  ) =>
    dispatch(
      getCoinsGainedHistory(setCoinsGainedHistory) as unknown
    ) as Promise<void>
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
