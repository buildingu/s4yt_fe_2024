import { CoinTrackerState } from "@reducers/coinTracker";
import { Product } from "@reducers/coinTracker";

import { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  spendCoins,
  retrieveCoins,
  initializeCoins,
} from "@actions/coinTracker";
import { isNotPlayer } from "@actions/user";

import usePagination from "@hooks/usePagination";
import { staticRaffleItems } from "@root/constants/temporaryDb/raffleItems";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import RaffleItemModal from "@components/modals/raffleItemModal/RaffleItemModal";

import s from "./styles.module.css";
import goldCoin from "@static/coin-smallgolden.png";
import silverCoin from "@static/coin-smallsilver.png";

interface Props {
  spendCoins: (item: Product, numEntries: number) => void;
  retrieveCoins: (item: Product, numEntries: number) => void;
  initializeCoins: (data: { items: Product[]; remainingCoins: number }) => void;
  storeCoins: number;
  storeEntries: Product[] | undefined;
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
}

const Raffle: React.FC<Props> = ({
  spendCoins,
  retrieveCoins,
  initializeCoins,
  storeCoins,
  storeEntries,
  isNotPlayer,
}) => {
  // Track product entries all have a default value of 0 at their respective index
  const [totalDublunes, setTotalDublunes] = useState<number>(
    storeCoins ? storeCoins : 0
  );
  // For testing persistenece between pages
  useEffect(() => {
    if (storeEntries?.length === 0) {
      initializeCoins({ items: staticRaffleItems, remainingCoins: storeCoins });
      setTotalDublunes(storeCoins);
    }
  }, [storeEntries, initializeCoins, storeCoins]);

  // Pagination hook
  const maxItems = 8;

  const {
    currentPage,
    currentItems,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({ data: staticRaffleItems, maxPerPage: maxItems });

  // Adds/Subtracts entries that correspond with product index and adjust total Dubulunes
  const handleProductEntries = (itemId: number, value: number) => {
    const item = staticRaffleItems.find((product) => product.id === itemId);
    if (item) {
      if (value > 0) {
        spendCoins(item, value);
      } else {
        retrieveCoins(item, Math.abs(value));
      }
    }
    setTotalDublunes((prev) => prev - value);
  };
  useEffect(() => {
    const result = isNotPlayer();
    if (result) {
      isNotPlayer(true, "Only players can assign Dubl-U-Nes to raffle items");
    }
  }, []);

  return (
    <Layout>
      <Header title="Raffle Page" />
      <Content
        addFeather="right2"
        style={{
          display: "grid",
          placeItems: "center",
          paddingTop: "3.5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className={s.container}>
          <div className={s.top}>
            <h2>
              Tokens for
              <br /> Treasure
            </h2>
            {/* TODO: The total is their current doblons. */}
            <h4 className={s.dublunesCount}>
              Your Total Dubl-u-nes: <span>{totalDublunes}</span>
            </h4>
            <div className={s.legend}>
              <h4>Legend</h4>
              <div>
                <img src={goldCoin} alt="golden coin" />
                <p>
                  At least one player has assigned at least 1 dubl-u-ne to that
                  item
                </p>
              </div>
              <div>
                <img src={silverCoin} alt="silver coin" />
                <p>No one has yet assigned any dubl-u-nes to the item</p>
              </div>
            </div>
          </div>
          <div className={s.products}>
            {currentItems.map((item, i) => (
              <div aria-label={item.name} key={i}>
                <div className={s.imgBox}>
                  <img src={item.img} alt={item.name} />
                  <RaffleItemModal products={item} />
                  <img
                    className={s.entryNotification}
                    src={
                      storeEntries!.find((entry) => entry.id === item.id)
                        ?.entries! > 0
                        ? goldCoin
                        : silverCoin
                    }
                    alt="coin"
                  />
                </div>
                <h4 className={s.name}>{item.name}</h4>
                <div className={s.controls}>
                  <button
                    disabled={
                      storeEntries?.find((entry) => entry.id === item.id)
                        ?.entries === 0 || isNotPlayer()
                    }
                    onClick={() => handleProductEntries(item.id, -1)}
                    aria-label="Subtract"
                  >
                    -
                  </button>
                  <h4>
                    {storeEntries?.length !== 0 &&
                      storeEntries?.find((entry) => entry.id === item.id)
                        ?.entries}
                  </h4>
                  <button
                    disabled={totalDublunes === 0 || isNotPlayer()}
                    onClick={() => handleProductEntries(item.id, +1)}
                    aria-label="Add"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={s.paginationButtons}>
            {currentPage > 1 && (
              <button
                className={`${s.prevButton}`}
                aria-label="Previous page"
                onClick={() => prevPage()}
              />
            )}
            {totalPages > 1 && (
              <span
                className={s.paginationPages}
              >{`Page ${currentPage} of ${totalPages}`}</span>
            )}
            {currentPage < totalPages && (
              <button
                className={s.nextButton}
                aria-label="Next page"
                onClick={() => nextPage()}
              />
            )}
          </div>
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({
  coinTracker,
}: {
  coinTracker: CoinTrackerState;
}) => ({
  storeCoins: coinTracker.remainingCoins,
  storeEntries: coinTracker.items,
});
const mapDispatchToProps = (dispatch: Function) => ({
  spendCoins: (item: Product, numEntries: number) =>
    dispatch(spendCoins(item, numEntries)),
  retrieveCoins: (item: Product, numEntries: number) =>
    dispatch(retrieveCoins(item, numEntries)),
  initializeCoins: ({ items, remainingCoins }: CoinTrackerState) =>
    dispatch(initializeCoins({ items, remainingCoins })),
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Raffle);
