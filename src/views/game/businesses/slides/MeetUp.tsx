import type { UserReduxState } from "@root/redux/reducers/user";
import type UserCredentials from "@typings/UserCredentials";

import { useRef, useState } from "react";
import { connect } from "react-redux";

import { submitScheduleMeeting } from "@actions/businesses";

import AreYouSureModal from "@components/modals/areYouSure";

import s from "./styles.module.css";

interface Props {
  user?: UserCredentials;
  submitScheduleMeeting: (
    attend_meeting: boolean,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => Promise<void>;
  isNotPlayer: boolean;
}

const MeetUp: React.FC<Props> = ({
  user,
  submitScheduleMeeting,
  isNotPlayer
}) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({ processing: false }),
    [choice, setChoice] = useState(false);

  const handleSubmit = async () => {
    if ((user?.attend_meeting && !choice) || (!user?.attend_meeting && choice)) {
      setForm({ processing: true });
      submitScheduleMeeting(choice, formRef, setForm);
    }
  };

  return (
    <div className={`${s.optionsView} ${s.meetUp}`}>
      <div id="meetupTxt">
        <h3>You're Invited!</h3>
        <p>Event results meeting and casual Q&A with challenge partners.</p>
        <p>May 26 at 2PM EST</p>
      </div>

      <form
        aria-describedby="meetupTxt"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
        noValidate
      >
        <div role="radiogroup">
          <div>
            <input
              type="radio"
              id="yesMeet"
              name="yesMeet"
              value="Yes"
              checked={choice}
              disabled={form.processing}
              onClick={() => setChoice(true)}
            />
            <label htmlFor="yesMeet">I'm in! Please add me to the Google Meet</label>
          </div>
          <div>
            <input
              type="radio"
              id="noMeet"
              name="noMeet"
              value="No"
              checked={!choice}
              disabled={form.processing}
              onClick={() => setChoice(false)}
            />
            <label htmlFor="noMeet">
              Thanks but I can't attend
            </label>
          </div>
        </div>

        <AreYouSureModal
          aria-label="Submit"
          text="This meeting is not specific to this business. Once you submit your choice, you will be invited to a meeting with all available businesses."
          func={handleSubmit}
          disabled={isNotPlayer || form.processing}
        />
      </form>
    </div>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  user: user.credentials
});
const mapDispatchToProps = (dispatch: any) => ({
  submitScheduleMeeting: (
    attend_meeting: boolean,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => dispatch(submitScheduleMeeting(attend_meeting, formRef, setForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetUp);
