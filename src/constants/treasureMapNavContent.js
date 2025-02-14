import routeDisableOn from "@root/routes/disableOn";

export default [
  {
    img: { src: "/images/welcome.png", alt: "Welcome" },
    txt: "Welcome aboard!",
    to: ""
  },
  {
    img: { src: "/images/free_dublons.png", alt: "Free Raffle" },
    txt: "3 free dubl-u-nes already!",
    to: ""
  },
  {
    img: { src: "/images/profile_page.png", alt: "Profile" },
    txt: "Profile page",
    to: "/profile"
  },
  {
    img: { src: "/images/see_businesses.png", alt: "Businesses" },
    txt: "See businesses",
    to: "/businesses",
    disableOn: routeDisableOn["/businesses"]
  },
  {
    img: { src: "/images/learn_and_earn.png", alt: "Learn and Earn" },
    txt: "Learn and Earn",
    to: "/learn",
    disableOn: routeDisableOn["/learn"]
  },
  {
    img: { src: "/images/raffle_page.png", alt: "Raffle" },
    txt: "Raffle page",
    to: "/raffle",
    disableOn: routeDisableOn["/raffle"]
  },
  {
    img: { src: "/images/event_results.png", alt: "Results" },
    txt: "Event Results",
    to: "/results",
    disableOn: routeDisableOn["/results"]
  },
];
