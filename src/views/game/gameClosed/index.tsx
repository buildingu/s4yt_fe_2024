import type { GameConfigReduxState } from "@reducers/gameConfig";

import { useRef } from "react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { logoutPlayer } from "@actions/user";

import useContinueCountdown from "@hooks/useContinueCountdown";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";

import s from "./styles.module.css";
import errorLogo from "/images/error-logo.webp";

interface Props {
  reviewStart?: boolean;
  gameEnd?: boolean;
  logoutPlayer: () => void;
}

const GameClosed: React.FC<Props> = ({
  reviewStart,
  gameEnd,
  logoutPlayer
}) => {
  const counterRef = useRef<HTMLTimeElement>(null);

  useContinueCountdown(counterRef, true);

  return (
    <Layout>
      <Header />
      <Content
        addCoins="coins2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem 1.5rem",
          flexWrap: "wrap",
          paddingBottom: "3rem"
        }}
      >
        <div className={s.left}>
          <button aria-label="Logout" onClick={() => logoutPlayer()} />
          <img src={errorLogo} alt="Error Pirate" className={s.errorLogo} />
        </div>
        <div className={s.right}>
          {(gameEnd || reviewStart) && (
            <h1>
              The game is
              <br /> now closed
            </h1>
          )}
          <p className={s.timer}>
            {gameEnd ? (
              <>
                Come back for
                <span>Next Year</span>
                to see the next Version
              </>
            ) : reviewStart ? (
              <>
                Come back in
                <time
                  aria-label="Time Remaining"
                  title="Time Remaining of the Game"
                  id="counter"
                  ref={counterRef}
                  dateTime="00:00:00"
                >
                  00:00:00
                </time>
                to see the results
              </>
            ) : (
              <>
                Why are you on this page? The game isn't closed, go play!
                <br />
                <Link to="/" className="fade move">
                  Go to Main Map
                </Link>
              </>
            )}
          </p>
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({ gameConfig }: {
  gameConfig: GameConfigReduxState;
}) => ({
  reviewStart: gameConfig.reviewStart,
  gameEnd: gameConfig.gameEnd
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logoutPlayer: () => dispatch(logoutPlayer())
});

export default connect(mapStateToProps, mapDispatchToProps)(GameClosed);
