import { connect } from "react-redux";
import React, { useState } from "react";
import s from "./styles.module.css";

interface Video {
  title: string;
  src: string;
}

const Video: React.FC = () => {
  const businessVideo = {
    title: "some title",
    src: "https://www.youtube.com/embed/M7b_Eg1XA-o?si=0IorJUahdzE6Yi_9",
  };

  return (
    <div className={s.optionsView}>
      <iframe
        width="100%"
        height="100%"
        src={businessVideo?.src}
        title={businessVideo?.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
