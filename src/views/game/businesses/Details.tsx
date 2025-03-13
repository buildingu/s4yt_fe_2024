import type { Business } from "@reducers/businesses";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import history from "@utils/History";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";

import { isNotPlayer } from "@actions/user";

import Video from "./slides/Video";
import Challenge from "./slides/Challenge";
import MeetUp from "./slides/MeetUp";

import s from "./styles.module.css";

interface Props {
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
}

const SELECTED_SLIDE = (business: Business, isNotPlayer: boolean): { [key: string]: React.ReactNode } => ({
  video: <Video video_title={business.video_title} video_url={business.video_url} />,
  challenge: <Challenge name={business.name} challenge_question={business.challenge_question} isNotPlayer={isNotPlayer} />,
  meetUp: <MeetUp isNotPlayer={isNotPlayer} />
});

const Details: React.FC<Props> = ({ isNotPlayer }) => { 
  const { state: business } = useLocation(), // Was set in the business Link.
    [selected, setSelected] = useState<string>("video");

  useEffect(() => {
    isNotPlayer(true, "Only players have access to certain features on this page");
  }, []);

  const handleNewSlide = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => setSelected(e.currentTarget.value);

  return (
    <Layout>
      <Header title="see business" />
      <Content
        addCoins="coins2"
        addFeather="right1"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "3.5rem",
          paddingBottom: "3rem"
        }}
      >
        <div aria-live="polite" className={s.details}>
          <>
            {business ? (
              <>
                <header className={s.detailsHeader}>
                  <img src={business.logo} alt={business.name + "'s logo"} />
                  <div>
                    <h2>{business.name}</h2>
                    <p>{business.description}</p>
                  </div>
                </header>

                <div className={s.detailsContent}>
                  <div className={s.detailsOptions}>
                    <div role="radiogroup">
                      <label
                        aria-label="Video"
                        data-checked={selected === "video"}
                        className={s.video}
                      >
                        <input
                          type="radio"
                          value="video"
                          onClick={handleNewSlide}
                          aria-checked={selected === "video"}
                        />
                      </label>
                      <label
                        aria-label="Challenge"
                        data-checked={selected === "challenge"}
                        className={s.challenge}
                      >
                        <input
                          type="radio"
                          value="challenge"
                          onClick={handleNewSlide}
                          aria-checked={selected === "challenge"}
                        />
                      </label>
                      <label
                        aria-label="Q&A Wrap-Up"
                        className={s.wrapUp}
                        data-checked={selected === "meetUp"}
                      >
                        <input
                          type="radio"
                          value="meetUp"
                          onClick={handleNewSlide}
                          aria-checked={selected === "meetUp"}
                        />
                      </label>
                    </div>
                    <button
                      aria-label="Previous Page"
                      className="backBtn fade move"
                      onClick={() => history.push(-1)}
                    />
                  </div>

                  <div className={s.detailsContentView}>
                    {selected && SELECTED_SLIDE(business, isNotPlayer())[selected]}
                  </div>
                </div>
              </>
            ) : (
              <p>Unexpectedly couldn't find this business.</p>
            )}
          </>
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message))
});

export default connect(null, mapDispatchToProps)(Details);
