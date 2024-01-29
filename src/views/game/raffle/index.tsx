import { CoinTrackerState } from "@reducers/coinTracker";
import { Product } from "@reducers/coinTracker";
import { db } from "@root/firebase";
import { ref, update, onValue } from "firebase/database";

import { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  spendCoins,
  retrieveCoins,
  initializeCoins,
} from "@actions/coinTracker";
import { isNotPlayer } from "@actions/user";

import usePagination from "@hooks/usePagination";
import { getRaffleItems } from "@actions/coinTracker";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import RaffleItemModal from "@components/modals/raffleItemModal/RaffleItemModal";

import s from "./styles.module.css";
import goldCoin from "@static/coin-smallgolden.png";
import silverCoin from "@static/coin-smallsilver.png";
import { UserReduxState } from "@root/redux/reducers/user";
import UserCredentials from "@root/typings/UserCredentials";
import AreYouSureModal from "@root/components/modals/areYouSure/AreYouSureModal";

interface Props {
  spendCoins: (item: Product, numEntries: number) => void;
  retrieveCoins: (item: Product, numEntries: number) => void;
  initializeCoins: (data: { items: Product[]; remainingCoins: number }) => void;
  storeCoins: number;
  storeEntries: Product[];
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
  getRaffleItems: () => Promise<any>;
  raffleItems: Product[];
  user?: UserCredentials;
}

const Raffle: React.FC<Props> = ({
  spendCoins,
  retrieveCoins,
  storeCoins,
  storeEntries,
  isNotPlayer,
  getRaffleItems,
  user,
}) => {
  // Track product entries all have a default value of 0 at their respective index
  const [totalCoins, setTotalCoins] = useState<number>(
    storeCoins ? storeCoins : 0
  );
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  // For firebase
  const encodedEmail = user?.email.replace(/\./g, ",");
  const userRef = ref(db, "users/" + encodedEmail);

  useEffect(() => {
    const checkIfFieldExists = async () => {
      try {
        const unsubscribe = onValue(userRef, (snapshot) => {
          const submittedCheck = snapshot.val();
          console.log(submittedCheck)
          if (submittedCheck && submittedCheck.submittedRaffle) {
            console.log("exists");
            setDisabledButton(true);
          } else {
            setDisabledButton(false);
          }
        });
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error checking data:", error);
      }
    };
    checkIfFieldExists();
  }, [userRef]);

  // For testing persistenece between pages
  useEffect(() => {
    if (storeEntries.length === 0 || !storeEntries) {
      getRaffleItems();
    }
  }, [storeEntries, getRaffleItems]);

  // Pagination hook
  const maxItems = 8;

  const {
    currentPage,
    currentItems,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({ data: storeEntries, maxPerPage: maxItems });

  // Adds/Subtracts entries that correspond with product index and adjust total Dubulunes
  const handleProductEntries = (itemId: number, value: number) => {
    const item = storeEntries.find((product) => product.id === itemId);
    if (item) {
      if (value > 0) {
        spendCoins(item, value);
      } else {
        retrieveCoins(item, Math.abs(value));
      }
    }
    setTotalCoins((prev) => prev - value);
  };
  useEffect(() => {
    const result = isNotPlayer();
    if (result) {
      isNotPlayer(true, "Only players can assign Dubl-U-Nes to raffle items");
    }
  }, []);
  // temporary, hopefully won't need it
  const handleFirebaseSubmit = async () => {
    try {
      const raffleItemsUpdates: {
        [key: number]: {
          id: number;
          name: string;
          entries: number;
          rafflePartner: string;
        };
      } = {};

      storeEntries.forEach((entry) => {
        if (entry.entries && entry.entries > 0) {
          const entryId = entry.id;
          const entryData = {
            id: entry.id,
            name: entry.name,
            entries: entry.entries !== undefined ? entry.entries : 0,
            rafflePartner: entry.raffle_partner.organization_name,
          };
          raffleItemsUpdates[entryId] = entryData;
        }
      });

      await update(userRef, {
        raffleItems: raffleItemsUpdates,
      });

      await update(userRef, {
        submittedRaffle: true,
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Layout
    // addFeather="right2"
    >
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
              Your Total Dubl-u-nes: <span>{totalCoins}</span>
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
                  <img src={item.image_src} alt={item.name} />
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
                    disabled={disabledButton || 
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
                    disabled={disabledButton || totalCoins === 0 || isNotPlayer()}
                    onClick={() => handleProductEntries(item.id, +1)}
                    aria-label="Add"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* For one time / cooldown submission */}
          {/* <button onClick={handleFirebaseSubmit}>Submit</button> */}
          {currentItems.length > maxItems && (
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
          )}
          <AreYouSureModal
            label={"Are you sure?"}
            text={`Once you submit your raffle entries, you will not be able to change them. Please make sure you've used up all your coins on the correct items. Do you want to submit your current entries?`}
            func={handleFirebaseSubmit}
            disabledProps={isNotPlayer() || disabledButton}
            buttonClass={s.raffleSubmit}
          />
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({
  coinTracker,
  user,
}: {
  coinTracker: CoinTrackerState;
  user: UserReduxState;
}) => ({
  storeCoins: coinTracker.remainingCoins,
  storeEntries: coinTracker.items,
  user: user.credentials,
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
  getRaffleItems: () => dispatch(getRaffleItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Raffle);
