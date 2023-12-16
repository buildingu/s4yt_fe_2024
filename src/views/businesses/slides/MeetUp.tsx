import { connect } from "react-redux";
import React, { useState } from "react";
import s from "./styles.module.css";

const MeetUp: React.FC = () => {
  return (
    <div className={s.optionsView}>
      <h2>MEET UP</h2>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MeetUp);
