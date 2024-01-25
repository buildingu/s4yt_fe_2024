import { Dispatch } from "redux";
import { connect } from "react-redux";

import s from "./styles.module.css";

interface Props {
  playerCheck: any;
  data: {
    date: string;
    time: string;
    method: string;
  };
}

const MeetUp: React.FC<Props> = ({ playerCheck, data }) => {
  return (
    <div className={s.optionsView}>
      <div className={s.meetUp}>
        <h2>I'm setting up a {data?.method}</h2>
        <p>
          On {data?.date} at {data?.time} EST
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(null, mapDispatchToProps)(MeetUp);
