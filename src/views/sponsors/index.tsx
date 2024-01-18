import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { isNotPlayer } from "@root/redux/actions/user";
import history from "@utils/History";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";
import More from "./More";
// import Congrats from "./Congrats";
import s from "./styles.module.css";

interface PlayerProps {
  isNotPlayer: (useNotification: boolean, message?: string | null) => void;
}

const Sponsors: React.FC<PlayerProps> = ({ isNotPlayer }) => {
  const [clicked, setClicked] = useState({ more: false, quizDone: false }),
    scoreRef = useRef("0");

  const [isSmallerThen500, setIsSmallerThen500] = useState(false);

  const sponsors = [];
  for (let i = 0; i < 6; i++) {
    sponsors.push(
      <span key={i}>
        <p>Logo</p>
      </span>
    );
  }

  useEffect(() => {
    isNotPlayer(true, "Only players can win more Dubl-U-Nes");
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setIsSmallerThen500(true);
      } else {
        setIsSmallerThen500(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout
    // TODO:
    // addCoins={clicked.more || clicked.quizDone ? "coins2" : "coins3"}
    // addFeather={clicked.more || clicked.quizDone ? "right1" : "left"}
    >
      <Header title="Sponsors" />
      <Content
        {...(!clicked.more &&
          !clicked.quizDone && { style: { paddingBottom: "4px" } })}
      >
        {clicked.more ? (
          <More setClicked={setClicked} scoreRef={scoreRef} />
        ) : (
          // :
          // clicked.quizDone ? (
          //   <Congrats finalScore={scoreRef.current} setClicked={setClicked} />
          // )
          <>
            <div className={s.sponsors}>{sponsors}</div>
            <div className={s.options}>
              <a
                aria-label="Previous Page"
                className={`${s.backBtn} fade move`}
                onClick={() => history.push(-1)}
              />
              <button
                className={`${s.moreBtn} fade`}
                onClick={() => setClicked({ ...clicked, more: true })}
                disabled={isNotPlayer()}
              />
            </div>
          </>
        )}
      </Content>
      <Status
        style={
          isSmallerThen500 && clicked.quizDone ? { marginTop: "6rem" } : {}
        }
      />
    </Layout>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  isNotPlayer: (useNotification: boolean, message?: string | null) =>
    dispatch(isNotPlayer(useNotification, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors);
