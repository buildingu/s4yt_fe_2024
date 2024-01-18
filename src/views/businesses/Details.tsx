import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import history from "../../utils/History";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import Status from "@components/status";

// temporary useParams
import { useParams } from "react-router-dom";

import Video from "./slides/Video";
import Question from "./slides/Question";
import MeetUp from "./slides/MeetUp";

import s from "./styles.module.css";
import React, { useState, ChangeEvent } from "react";

type BusinessDetailsType = {
  [key: string]: {
    logo: any;
    info: string;
  };
};

const businessDetails: BusinessDetailsType = {
  "HOP Group": {
    logo: require("@static/businessLogos/HOPGroup.jpg"),
    info: "something about HOP Group",
  },
  KnowledgeFlow: {
    logo: require("@static/businessLogos/KnowledgeFlow.png"),
    info: "something about KnowledgeFlow Cybersafety Foundation",
  },
  Matrix: {
    logo: require("@static/businessLogos/matrix.png"),
    info: "something about Matrix",
  },
  "Meridian Stories": {
    logo: require("@static/businessLogos/meridianstories.png"),
    info: "something about Meridian Stories",
  },
  Porter: {
    logo: require("@static/businessLogos/Porter.jpg"),
    info: "something about Porter",
  },
  "Robotics For All": {
    logo: require("@static/businessLogos/roboticsforall.png"),
    info: "something about Robotics For All",
  },
};

const Details: React.FC = (props) => {
  const { details } = useParams<{ details: string }>();
const location = useLocation();
  const [selectedOption, setSelectedOption] = useState<string>("Video");
  const selectedBusiness = businessDetails[details ? details : ""];

  const contentView: { [key: string]: React.ReactNode } = {
    Video: <Video />,
    Question: <Question />,
    MeetUp: <MeetUp />,
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  
  const selectedBusiness1 = props.businessData || location.state?.businessData;
  console.log(selectedBusiness1)
  return (
    <Layout>
      <Header title={"see business"} />
      <Content
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
            <img
              src={selectedBusiness.logo}
              alt={selectedBusiness + "'s logo"}
            />
            <div className={s.businessTitle}>
              <h2>{details}</h2>
              <p>{selectedBusiness.info}</p>
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

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
