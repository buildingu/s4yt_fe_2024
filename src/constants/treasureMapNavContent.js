import { store } from "@root/store";

const state = store.getState(),
  gameStart = state.gameConfig.gameStart,
  reviewStartOrWinners = state.gameConfig.reviewStart
    ? false
    : state.gameConfig.winnersAnnounced
    ? false
    : true;

export default [
  {
    img: require("@static/welcome.png"),
    alt: "Welcome",
    txt: "Welcome aboard!",
    to: "",
  },
  {
    img: require("@static/free_dublons.png"),
    alt: "Free Raffle",
    txt: "3 free dubl-u-nes already!",
    to: "",
  },
  {
    img: require("@static/profile_page.png"),
    alt: "Profile",
    txt: "Profile page",
    to: "/profile",
  },
  {
    img: require("@static/see_businesses.png"),
    alt: "Businesses",
    txt: "See businesses",
    to: "/businesses",
    disabled: !gameStart,
  },
  {
    img: require("@static/sponsors.png"),
    alt: "Sponsors",
    txt: "Sponsors",
    to: "/sponsors",
    disabled: !gameStart,
  },
  {
    img: require("@static/raffle_page.png"),
    alt: "Raffle",
    txt: "Raffle page",
    to: "/raffle",
    disabled: !gameStart,
  },
  {
    img: require("@static/event_results.png"),
    alt: "Results",
    txt: "Event Results",
    to: "/results",
    disabled: reviewStartOrWinners,
  },
];
