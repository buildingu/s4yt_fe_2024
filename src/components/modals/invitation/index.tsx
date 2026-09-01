import type { UserReduxState } from "@root/redux/reducers/user";
import type UserCredentials from "@typings/UserCredentials";

import { useRef, useState } from "react";
import { connect } from "react-redux";

import { submitScheduleMeeting } from "@actions/businesses";

import ModalTemplate from "../ModalTemplate";
import AreYouSureModal from "../areYouSure";
import s from "./styles.module.css";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  user?: UserCredentials;
  isNotPlayer?: boolean;
  submitScheduleMeeting: (
    attend_meeting: boolean,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => Promise<void>;
}


const InvitationModal: React.FC<Props> = ({ show, setShow, user, isNotPlayer, submitScheduleMeeting }) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({ processing: false }),
    [choice, setChoice] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [attendingChoice, setAttendingChoice] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async () => {
    if (!choice) {
      // "Thanks but I can't attend" — skip confirmation, just show message
      if ((user?.attend_meeting && !choice) || (!user?.attend_meeting && choice)) {
        setForm({ processing: true });
        await submitScheduleMeeting(choice, formRef, setForm);
      }
      setAttendingChoice(false);
      setSubmitted(true);
      setShowThankYou(true);
    } else {
      // "I'm in!" — handled by AreYouSureModal confirmation
      if ((user?.attend_meeting && !choice) || (!user?.attend_meeting && choice)) {
        setForm({ processing: true });
        await submitScheduleMeeting(choice, formRef, setForm);
      }
      setAttendingChoice(true);
      setSubmitted(true);
    }
  };
return (
    <>
      <ModalTemplate
        show={show}
        setShow={setShow}
        aria-label="Event Invitation"
        height={420}
      >
        <div className={s.container}>
          <div id="inviteTxt">
            <h2>You're Invited!</h2>
            <p>Event results meeting and casual Q&A with challenge partners.</p>
            <p className={s.date}>September 12th at 2 PM EST</p>
          </div>

          <form
            aria-describedby="inviteTxt"
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            noValidate
          >
            <div role="radiogroup" className={s.radioGroup}>
              <div>
                <input
                  type="radio"
                  id="yesMeetInvite"
                  name="yesMeetInvite"
                  value="Yes"
                  checked={choice}
                  disabled={form.processing}
                  onClick={() => setChoice(true)}
                />
                <label htmlFor="yesMeetInvite">I'm in! Please add me to the Google Meet</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="noMeetInvite"
                  name="noMeetInvite"
                  value="No"
                  checked={!choice}
                  disabled={form.processing}
                  onClick={() => setChoice(false)}
                />
                <label htmlFor="noMeetInvite">Thanks but I can't attend</label>
              </div>
            </div>

            {choice ? (
              <AreYouSureModal
                aria-label="Submit"
                text="Once you submit your choice, you will be invited to a meeting with all available challenge partners."
                func={handleSubmit}
                disabled={isNotPlayer || form.processing}
                className={s.submitBtn}
              >
                Submit
              </AreYouSureModal>
            ) : (
              <button
                className={s.submitBtn}
                disabled={isNotPlayer || form.processing}
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </form>

          <button
            className={s.backBtn}
            onClick={() => setShow(false)}
          >
            Go Back
          </button>
        </div>
      </ModalTemplate>

      <ModalTemplate
        show={showThankYou}
        setShow={setShowThankYou}
        aria-label="Thank You"
        height={250}
      >
        <div className={s.thankYouBox}>
          <p className={s.thankYouMsg}>
            Do not worry, check back here after the wrap up session! All results will be posted here for two weeks.
          </p>
        </div>
      </ModalTemplate>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvitationModal);
