import { useState } from "react";
import { connect } from "react-redux";

import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import MapNavigation from "@components/mapNavigation";

import s from "./styles.module.css";

// To be in constants folder.
const treasureMapNavContent = [
  {
    img: require("@static/welcome.png"),
    alt: "Welcome",
    txt: "Welcome aboard!",
  },
  {
    img: require("@static/free_dublons.png"),
    alt: "Free Raffle",
    txt: "3 free dubl-u-nes already!",
  },
  {
    img: require("@static/profile_page.png"),
    alt: "Profile",
    txt: "Profile page",
  },
  {
    img: require("@static/see_businesses.png"),
    alt: "Businesses",
    txt: "See businesses",
  },
  {
    img: require("@static/sponsors.png"),
    alt: "Sponsors",
    txt: "Sponsors",
  },
  {
    img: require("@static/raffle_page.png"),
    alt: "Raffle",
    txt: "Raffle page",
  },
  {
    img: require("@static/event_results.png"),
    alt: "Results",
    txt: "Event Results",
  },
];

const Home: React.FC = ({}) => {
  const [viewed, setViewed] = useState(false);

  return (
    <Layout addCoins={!viewed ? "coins1" : "coins2"}>
      <Header />
      {/* <img
        src={!viewed ? coins1 : coins2}
        alt="Doblons"
        className={
          !viewed ? `${s.coins} ${s.notViewed}` : `${s.coins} ${s.viewed}`
        }
      /> */}
      <Content>
        {!viewed ? (
          <>
            <div className={s.notViewed}>
              <ul>
                <li>
                  <p>Visit each island to answer the questions</p>
                </li>
                <li>
                  <p>Click on raffle page, to use your free registration tix</p>
                </li>
              </ul>

              <button onClick={() => setViewed(true)} />
            </div>
          </>
        ) : (
          <>
            <div className={s.viewed}>
              {treasureMapNavContent.map((content) => (
                <MapNavigation
                  key={content.alt}
                  img={content.img}
                  alt={content.alt}
                  txt={content.txt}
                />
              ))}
            </div>
          </>
        )}
      </Content>
      {viewed && <Status />}
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
