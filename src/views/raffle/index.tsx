import { useEffect, useState } from "react";
import { connect } from "react-redux";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import RaffleItemModal from "@components/modals/raffleItemModal/RaffleItemModal";
import feather from "@static/feather.png";
import goldCoin from "@static/coin-smallgolden.png";
import silverCoin from "@static/coin-smallsilver.png";

import s from "./styles.module.css";

interface Props {}

const products = [
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "Bag & Key Chain",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "Lanyard",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
  {
    img: require("@static/error-logo.png"),
    name: "T-Shirt",
    sponsor: "sponsor name",
    sponsorLogo: require("@static/error-logo.png"),
    availability: 3,
    description: "here we will write a description of this item",
  },
];

const Raffle: React.FC<Props> = ({}) => {
  const [slideIndex, setSlideIndex] = useState(0),
    [isOpened, setIsOpened] = useState(false);

  // Track product entries all have a default value of 0 at their respective index
  const [entries, setEntries] = useState(Array(products.length).fill(0));

  // Default value to be replaced with user data
  const [totaleDublunes, setTotalDublunes] = useState(24);

  // Variables to create 'slides' of products showing 8 at a time for any given page (slideIndex)
  const maxItems = 8;
  const startIndex = slideIndex * maxItems;
  const displayedProducts = products.slice(startIndex, startIndex + maxItems);

  // Adds/Subtracts entries that correspond with product index and adjust total Dubulunes
  const handleProductEntries = (index: number, value: number) => {
    setEntries((prev) => {
      const change = [...prev];
      change[startIndex + index] += value;
      return change;
    });
    setTotalDublunes((prev) => prev - value);
  };

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
                  {/* <button />
                  <button className={s.lensButton} aria-label={`More information for ${item.name}`}>more</button> */}
                  <RaffleItemModal
                    setShow={setIsOpened}
                    products={products[i + startIndex]}
                  />
                </div>
                <h4 className={s.name}>{item.name}</h4>
                <div className={s.controls}>
                  <button
                    disabled={entries[i + startIndex] === 0}
                    onClick={() => handleProductEntries(i, -1)}
                    aria-label="Subtract"
                  >
                    -
                  </button>
                  <h4>{entries[i + startIndex]}</h4>
                  <button
                    disabled={totaleDublunes === 0}
                    onClick={() => handleProductEntries(i, +1)}
                    aria-label="Add"
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

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Raffle);
