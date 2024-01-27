import { useState, useEffect, ChangeEvent } from "react";
// temporary useParams
import { useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";

import history from "@utils/History";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";

import { isNotPlayer } from "@actions/user";

import Video from "./slides/Video";
import Question from "./slides/Question";
import MeetUp from "./slides/MeetUp";

import s from "./styles.module.css";

interface PlayerProps {
  isNotPlayer: (useNotification: boolean, message?: string | null) => void;
}

const Details: React.FC<PlayerProps> = ({ isNotPlayer }) => {
  // passed through Link component
  const { state } = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>("Video");

  const contentView: { [key: string]: React.ReactNode } = {
    Video: <Video data={state?.video} />,
    Question: (
      <Question data={state?.challenge} playerCheck={isNotPlayer(false)} />
    ),
    MeetUp: <MeetUp data={state?.meetUp} playerCheck={isNotPlayer(false)} />,
  };
  useEffect(() => {
    isNotPlayer(
      true,
      "Only players have access to certain features on this page"
    );
  }, []);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Layout>
      <Header title={"see business"} />
      <Content
        addCoins="coins2"
        addFeather="right1"
        // to be changed
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "3.5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className={s.details}>
          <div className={s.detailsHeader}>
            <img src={state?.logo} alt={state?.name + "'s logo"} />
            <div className={s.businessTitle}>
              <h2>{state?.name}</h2>
              <p>{state?.description}</p>
            </div>
          </div>
          <div className={s.detailsContent}>
            <div className={s.detailsOptions}>
              <div>
                <input
                  type="radio"
                  id="videoRadio"
                  name="radioGroup"
                  value="Video"
                  onChange={handleRadioChange}
                  checked={selectedOption === "Video"}
                />
                <label htmlFor="videoRadio" className={s.videoLabel}></label>

                <input
                  type="radio"
                  id="questionRadio"
                  name="radioGroup"
                  value="Question"
                  onChange={handleRadioChange}
                  checked={selectedOption === "Question"}
                />
                <label
                  htmlFor="questionRadio"
                  className={s.questionLabel}
                ></label>

                <input
                  type="radio"
                  id="meetupRadio"
                  name="radioGroup"
                  value="MeetUp"
                  onChange={handleRadioChange}
                  checked={selectedOption === "MeetUp"}
                />
                <label htmlFor="meetupRadio" className={s.meetupLabel}></label>
              </div>
              <a
                href="#"
                aria-label="Previous Page"
                className={s.backBtn}
                onClick={() => history.push(-1)}
              ></a>
            </div>
            <div className={s.detailsContentView}>
              {selectedOption ? contentView[selectedOption] : null}
            </div>
          </div>
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  isNotPlayer: (useNotification: boolean, message?: string | null) =>
    dispatch(isNotPlayer(useNotification, message)),
});

export default connect(null, mapDispatchToProps)(Details);
