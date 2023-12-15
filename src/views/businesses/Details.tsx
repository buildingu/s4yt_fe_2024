import { connect } from "react-redux";
import { navigate } from "../../utils/History";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";

import Video from "./slides/Video";
import Question from "./slides/Question";
import MeetUp from "./slides/MeetUp";

import s from "./styles.module.css";
import React, { useState, ChangeEvent } from "react";

const businessDetails = {
  name: "BUSINESS NAME",
  logo: require("@static/error-logo.png"),
  info: "MORE BUSINESS INFO",
};

const Details: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>("Video");

  const contentView: { [key: string]: React.ReactNode } = {
    Video: <Video />,
    Question: <Question />,
    MeetUp: <MeetUp />,
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Layout>
      <Header title={businessDetails.name + "details"} />
      <Content>
        <div className={s.businesses}>
          {/* change all below class names later */}
          <div className={s.detailsHeader}>
            <img
              src={businessDetails.logo}
              alt={businessDetails.name + "'s logo"}
            />
            <div className={s.businessTitle}>
              <h2>{businessDetails.name}</h2>
              <p>{businessDetails.info}</p>
            </div>
          </div>
          <div className={s.detailsContent}>
            <div className={s.detailsOptions}>
              <label>
                <input
                  type="radio"
                  value="Video"
                  checked={selectedOption === "Video"}
                  onChange={handleRadioChange}
                />
                Video
              </label>

              <label>
                <input
                  type="radio"
                  value="Question"
                  checked={selectedOption === "Question"}
                  onChange={handleRadioChange}
                />
                Question
              </label>

              <label>
                <input
                  type="radio"
                  value="MeetUp"
                  checked={selectedOption === "MeetUp"}
                  onChange={handleRadioChange}
                />
                Meet-Up
              </label>
              <a
                href="#"
                aria-label="Previous Page"
                className={s.backBtn}
                onClick={() => navigate(-1)}
              >
                Back
              </a>
            </div>
            <div className="content">
              {selectedOption ? contentView[selectedOption] : null}
            </div>
          </div>
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
