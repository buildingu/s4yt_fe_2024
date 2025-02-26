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
    business_name: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => Promise<void>;
  name: string;
  isNotPlayer: boolean;
}

const MeetUp: React.FC<Props> = ({
  // user,
  submitScheduleMeeting,
  name,
  isNotPlayer
}) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({ processing: false }),
    [choice, setChoice] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const yesRadio = (formRef.current!.elements[0] as HTMLInputElement);

    console.log("yesRadio", yesRadio)

    if (yesRadio.checked) {
      setForm({ processing: true });
      submitScheduleMeeting(name, formRef, setForm);
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
        // onSubmit={submit}
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
              disabled={form.processing
                // TODO: Something like this if re-submissions is not allowed.
                // || user.scheduled_meetings[name]
              }
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
              disabled={form.processing
                // TODO: Something like this if re-submissions is not allowed.
                // || user.scheduled_meetings[name]
              }
              onClick={() => setChoice(false)}
            />
            <label htmlFor="noMeet">
              Thanks but I can't attend
            </label>
          </div>
        </div>

        {/* TODO: I don't know if you have one try anymore. */}
        <AreYouSureModal
          aria-label="Submit"
          text="Once you submit your choice, you will not be able to change it later."
          func={submit}
          disabled={isNotPlayer || !choice
            // || user.scheduled_meetings[name]
          }
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
    business_name: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => dispatch(submitScheduleMeeting(business_name, formRef, setForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(MeetUp);
