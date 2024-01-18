import { connect } from "react-redux";
import React, { useState } from "react";
import s from "./styles.module.css";

interface Data {
  date: string;
  time: string;
  method: string;
}
interface Props {
  playerCheck: any;
}

const MeetUp: React.FC<Props> = ({playerCheck}) => {
  const placeholderData: Data = {
    date: "january 1 2024",
    time: "13:00 EST",
    method: "Google Meet",
  };

  return (
    <div className={s.optionsView}>
      <div className={s.meetUp}>
        <h2>I'm setting up a {placeholderData.method}</h2>
        <p>
          On {placeholderData.date} at {placeholderData.time}
        </p>
        <div className={s.meetOptions}>
          <div>
            <input
              type="radio"
              id="confirmRadio"
              name="meetupGroup"
              value="No"
              disabled={playerCheck}
            />
            <label htmlFor="confirmRadio">
              I'd love to, but I can't make that time
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="rejectRadio"
              name="meetupGroup"
              value="Yes"
              disabled={playerCheck}
            />
            <label htmlFor="rejectRadio">I'm in</label>
          </div>
        </div>
        <button disabled={playerCheck} className={s.meetSubmit}></button>
      </div>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MeetUp);
