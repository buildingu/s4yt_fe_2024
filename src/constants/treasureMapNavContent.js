export default [
  {
    img: { src: require("@static/welcome.png"), alt: "Welcome" },
    txt: "Welcome aboard!",
    to: "",
  },
  {
    img: { src: require("@static/free_dublons.png"), alt: "Free Raffle" },
    txt: "3 free dubl-u-nes already!",
    to: "",
  },
  {
    img: { src: require("@static/profile_page.png"), alt: "Profile" },
    txt: "Profile page",
    to: "/profile",
    disableOn: ["winnersAnnounced"],
  },
  {
    img: { src: require("@static/see_businesses.png"), alt: "Businesses" },
    txt: "See businesses",
    to: "/businesses",
    disableOn: ["reviewStart", "winnersAnnounced"],
  },
  {
    img: { src: require("@static/sponsors.png"), alt: "Sponsors" },
    txt: "Sponsors",
    to: "/sponsors",
    disableOn: ["reviewStart", "winnersAnnounced"],
  },
  {
    img: { src: require("@static/raffle_page.png"), alt: "Raffle" },
    txt: "Raffle page",
    to: "/raffle",
    disableOn: ["reviewStart", "winnersAnnounced"],
  },
  {
    img: { src: require("@static/event_results.png"), alt: "Results" },
    txt: "Event Results",
    to: "/results",
    disableOn: ["gameStart"],
  },
];
