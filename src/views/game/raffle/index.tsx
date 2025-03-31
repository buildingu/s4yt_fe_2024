import type { GameReduxState } from "@reducers/game";

import { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

import { getRaffleItems, updateRaffleItem, updateRaffleStake, sendRaffleStakedItems } from "@actions/game";
import { isNotPlayer } from "@actions/user";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Spinner from "@components/loaders/spinner";
import Carousel from "@components/carousel";
import RaffleItemModal from "@components/modals/raffleItem";
import AreYouSureModal from "@components/modals/areYouSure";
import CooldownIndicator from "@components/forms/cooldownIndicator";

import s from "./styles.module.css";

interface Props {
  raffleItems: GameReduxState["raffleItems"];
  staked: GameReduxState["staked"];
  raffleTimestamp?: GameReduxState["raffleTimestamp"];
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
  getRaffleItems: () => Promise<any>;
  updateRaffleStake: (staked: GameReduxState["staked"]) => void;
  updateRaffleItem: (
    item_id: string,
    update: { coins?: number; silver?: boolean }
  ) => void;
  sendRaffleStakedItems: (
    stakedItems: GameReduxState["staked"]["raffleItem"],
    raffleItems: GameReduxState["raffleItems"]
  ) => Promise<void>;
}

const Raffle: React.FC<Props> = ({
  raffleItems,
  staked,
  raffleTimestamp,
  isNotPlayer,
  getRaffleItems,
  updateRaffleStake,
  updateRaffleItem,
  sendRaffleStakedItems
}) => {
  const [loading, setLoading] = useState(false),
    [cooldownElapsed, setCooldownElapsed] = useState(true);

  useLayoutEffect(() => {
    if (
      !raffleItems.length ||
      (raffleTimestamp?.getRaffleItems && Date.now() >= raffleTimestamp.getRaffleItems)
    ) {
      setLoading(true);
      getRaffleItems()
        .then(() => setCooldownElapsed(false))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    isNotPlayer(true, "Only players can assign Dubl-U-Nes to raffle items");
  }, []);
  
  const handleStake = (type: "inc" | "dec", item_id: string) => {
    updateRaffleStake({
      remainingCoins: type === "inc" ? 1 : -1,
      raffleItem: { [item_id]: true }
    });
    updateRaffleItem(item_id, { coins: type === "dec" ? 1 : -1 });
  };

  const handleSubmit = () => {
    sendRaffleStakedItems(staked.raffleItem!, raffleItems);
  };

  return (
    <Layout>
      <Header title="Raffle Page" />
      <Content
        addFeather="right2"
        className={s.base}
      >
        <div className={s.container}>
          <div className={s.top}>
            <h2>
              Tokens for
              <br /> Treasure
            </h2>

            <div>
              <h4 className={s.coinsCount}>
                Your Total
                <br /> Dubl-u-nes: <span>{staked.remainingCoins}</span>
              </h4>

              <div className={s.legend}>
                <h4>Legend</h4>
                <div>
                  <img src="/images/coin-smallgolden.png" alt="golden coin" />
                  <p>
                    At least one player has assigned at least 1 dubl-u-ne to that
                    item
                  </p>
                </div>
                <div>
                  <img src="/images/coin-smallsilver.png" alt="silver coin" />
                  <p>No one has yet assigned any dubl-u-nes to the item</p>
                </div>
              </div>
            </div>
          </div>

          {!loading ? (
            raffleItems.length ? (
              <Carousel
                aria-label="Raffle Items"
                items={raffleItems}
                numPerSlide={8}
                className={s.products}
              >
                {({ entry, i }) => (
                  <div key={i} aria-label={entry.name} className={s.item}>
                    <RaffleItemModal
                      className={s.imgContainer}
                      item={entry}
                    >
                      <img className={s.main} src={entry.image_src} alt={entry.name} />

                      <img
                        className={s.sliverGold}
                        src={!entry.silver ? "/images/coin-smallgolden.png" : "/images/coin-smallsilver.png"}
                        alt="Coin"
                      />
                      <img
                        className={s.magnify}
                        src="/images/magnifier.png"
                        alt="Magnify"
                      />
                    </RaffleItemModal>
                    
                    <h4 title={entry.name}>{entry.name}</h4>

                    <div className={s.controls}>
                      <button
                        className="fade move"
                        aria-label="Subtract"
                        disabled={!cooldownElapsed || !entry.coins || isNotPlayer()}
                        onClick={() => handleStake("inc", entry.item_id)}
                      >
                        -
                      </button>
                      <p aria-label={`${entry.coins} Stacked`}>{entry.coins}</p>
                      <button
                        className="fade move"
                        aria-label="Add"
                        disabled={!cooldownElapsed || !staked.remainingCoins || isNotPlayer()}
                        onClick={() => handleStake("dec", entry.item_id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </Carousel>
            ) : (
              <p className={s.failed}>
                Unexpectedly failed to retrieve raffle data.
              </p>
            )
          ) : (
            <Spinner
              size="82px"
              style={{
                alignSelf: "center",
                border: "solid 9px #9c9c9c",
                borderTop: "solid 9px #242424",
                marginInline: "auto"
              }}
            />
          )}

          <CooldownIndicator
            elapsed={cooldownElapsed}
            setElapsed={setCooldownElapsed}
            cooldownTime={raffleTimestamp?.submission}
          />
          <AreYouSureModal
            aria-label="Submit"
            text="Once you submit your raffle entries, you will not be able to change them for 30 minutes. Do you want to submit your current entries?"
            func={handleSubmit}
            disabled={isNotPlayer() || !cooldownElapsed || !raffleItems.length}
            className={s.submit}
          />
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({ game }: { game: GameReduxState }) => ({
  raffleItems: game.raffleItems,
  staked: game.staked,
  raffleTimestamp: game.raffleTimestamp
});
const mapDispatchToProps = (dispatch: any) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message)),
  getRaffleItems: () => dispatch(getRaffleItems()),
  updateRaffleStake: (staked: GameReduxState["staked"]) =>
    dispatch(updateRaffleStake(staked)),
  updateRaffleItem: (
    item_id: string,
    update: { coins?: number; silver?: boolean }
  ) => dispatch(updateRaffleItem(item_id, update)),
  sendRaffleStakedItems: (
    stakedItems: GameReduxState["staked"]["raffleItem"],
    raffleItems: GameReduxState["raffleItems"]
  ) => dispatch(sendRaffleStakedItems(stakedItems, raffleItems))
});

export default connect(mapStateToProps, mapDispatchToProps)(Raffle);
