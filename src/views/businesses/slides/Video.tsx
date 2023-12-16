import { connect } from "react-redux";
import React, { useState } from "react";
import s from "./styles.module.css";

const Video: React.FC = () => {
  return (
    <div className={s.optionsView}>
      <h2>VIDEO</h2>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
