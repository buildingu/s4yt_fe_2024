import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  spendCoins,
  retrieveCoins,
  initializeCoins,
} from "@root/redux/actions/coinTracker";
import { isNotPlayer } from "@root/redux/actions/user";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import RaffleItemModal from "@components/modals/raffleItemModal/RaffleItemModal";
import feather from "@static/feather.png";
import goldCoin from "@static/coin-smallgolden.png";
import silverCoin from "@static/coin-smallsilver.png";

import s from "./styles.module.css";

interface Props {
  spendCoins: any;
  retrieveCoins: any;
  initializeCoins: any;
  storeCoins: any;
  storeEntries: any;
  isNotPlayer: (useNotification: boolean, message?: string | null) => void;
}

const products = [
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 1,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "Bag & Key Chain",
    id: 2,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "Lanyard",
    id: 3,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 4,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 5,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 6,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 7,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 8,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 9,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 10,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 11,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 12,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 13,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 14,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 15,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 16,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    id: 17,
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
];

const Raffle: React.FC<Props> = ({
  spendCoins,
  retrieveCoins,
  initializeCoins,
  storeCoins,
  storeEntries,
  isNotPlayer
}) => {
  const [slideIndex, setSlideIndex] = useState(0),
    [isOpened, setIsOpened] = useState(false);

  // Track product entries all have a default value of 0 at their respective index
  const [totaleDublunes, setTotalDublunes] = useState(
    storeCoins ? storeCoins : 0
  );

  // For testing persistenece between pages
  useEffect(() => {
    if (storeEntries.length === 0) {
      initializeCoins({ products, remainingCoins: storeCoins });
      setTotalDublunes(storeCoins);
    }
  }, []);

  // Variables to create 'slides' of products showing 8 at a time for any given page (slideIndex)
  const maxItems = 8;
  const startIndex = slideIndex * maxItems;
  const displayedProducts = products.slice(startIndex, startIndex + maxItems);

  // Adds/Subtracts entries that correspond with product index and adjust total Dubulunes
  const handleProductEntries = (index: number, value: number) => {
    const item = products[index + startIndex];

    if (value > 0) {
      spendCoins(item, value);
    } else {
      retrieveCoins(item, Math.abs(value));
    }
    setTotalDublunes((prev) => prev - value);
  };
    useEffect(() => {
      isNotPlayer(true, "Only players can assign Dubl-U-Nes to raffle items");
    }, []);

  return (
    <Layout
    // addFeather="right2"
    >
      <Header title="Raffle Page" />
      <Content
        style={{
          display: "grid",
          placeItems: "center",
          paddingTop: "3.5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className={s.container}>
          {/* visual only */}
          <img
            style={{
              position: "absolute",
              right: "-220px",
              height: "500px",
              transform: "scaleX(-1) rotate(-50deg)",
            }}
            src={feather}
            alt="feather"
            aria-hidden
          />
          <div className={s.top}>
            <h2>
              Tokens for
              <br /> Treasure
            </h2>
            {/* TODO: The total is their current doblons. */}
            <h4 className={s.dublunesCount}>
              Your Total Dubl-u-nes: <span>{totaleDublunes}</span>
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
            {displayedProducts.map((item, i) => (
              <div aria-label={item.name} key={i}>
                <div className={s.imgBox}>
                  <img src={item.img} alt={item.name} />
                  <RaffleItemModal
                    setShow={setIsOpened}
                    products={products[i + startIndex]}
                  />
                  <img
                    className={s.entryNotification}
                    src={
                      storeEntries[i + startIndex]?.entries > 0
                        ? goldCoin
                        : silverCoin
                    }
                    alt="coin"
                  />
                </div>
                <h4 className={s.name}>{item.name}</h4>
                <div className={s.controls}>
                  <button
                    disabled={storeEntries[i + startIndex]?.entries === 0}
                    onClick={() => handleProductEntries(i, -1)}
                    aria-label="Subtract"
                    disabled={isNotPlayer()}
                  >
                    -
                  </button>
                  <h4>
                    {storeEntries.length !== 0 &&
                      storeEntries[i + startIndex].entries}
                  </h4>
                  <button
                    disabled={totaleDublunes === 0}
                    onClick={() => handleProductEntries(i, +1)}
                    aria-label="Add"
                    disabled={isNotPlayer()}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={s.paginationButtons}>
            {/* Don't show prev button if at start of slide */}
            {startIndex !== 0 && (
              <button
                className={`${s.prevButton}`}
                aria-label="Previous page"
                onClick={() => setSlideIndex((prev) => prev - 1)}
              />
            )}
            {/* Don't show next button if no items on next slide */}

            {startIndex + 8 < products.length && (
              <button
                className={s.nextButton}
                aria-label="Next page"
                onClick={() => setSlideIndex((prev) => prev + 1)}
              />
            )}
          </div>
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  storeCoins: state.coinTracker.remainingCoins,
  storeEntries: state.coinTracker.items,
});
const mapDispatchToProps = (dispatch: Function) => ({
  spendCoins: (item, numEntries) => dispatch(spendCoins(item, numEntries)),
  retrieveCoins: (item, numEntries) =>
    dispatch(retrieveCoins(item, numEntries)),
  initializeCoins: ({ products, remainingCoins }) =>
    dispatch(initializeCoins({ products, remainingCoins })),
     isNotPlayer: (useNotification: boolean, message?: string | null) =>
    dispatch(isNotPlayer(useNotification, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Raffle);
