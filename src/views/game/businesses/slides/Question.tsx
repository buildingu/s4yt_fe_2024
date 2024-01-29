import NotificationValues from "@typings/NotificationValues";

import { useRef, useState, FormEvent, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import emailjs from "@emailjs/browser";
import { db } from "@root/firebase";
import { ref, update, onValue } from "firebase/database";

import updateField from "@utils/forms/updateField";
import checkValidPlayerId from "@utils/forms/checkValidPlayerId";
import checkValidDocLink from "@utils/forms/checkValidDocLink";

import { addNotification } from "@actions/notifications";

import ChallengeModal from "@components/modals/challengeModal/ChallengeModal";

import s from "./styles.module.css";
import AreYouSureModal from "@root/components/modals/areYouSure/AreYouSureModal";
import { UserReduxState } from "@root/redux/reducers/user";
import UserCredentials from "@root/typings/UserCredentials";

interface Props {
  playerCheck: any;
  data: {
    title: string;
    content: string;
    submissionCount: number;
  };
  addNotification: (data: Omit<NotificationValues, "id">) => void;
  user?: UserCredentials;
}

interface FromData {
  sponsorName: string;
  studentID: string;
  submissionLink: string;
}

const Questions: React.FC<Props> = ({
  playerCheck,
  data,
  addNotification,
  user,
}) => {
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  const encodedEmail = user?.email.replace(/\./g, ",");
  const userRef = ref(db, "users/" + encodedEmail + "/challenges/");
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({
      processing: false,
    }),
    [currentData, setCurrentData] = useState<FromData>({
      sponsorName: data?.title,
      studentID: "",
      submissionLink: "",
    });

  useEffect(() => {
    const checkIfFieldExists = async () => {
      try {
        const unsubscribe = onValue(userRef, (snapshot) => {
          const challenges = snapshot.val();
          if (challenges && challenges[data.title]) {
            console.log("exists");
            setDisabledButton(true);
          } else {
            setDisabledButton(false);
          }
        });
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error checking data:", error);
      }
    };
    checkIfFieldExists();
  }, [userRef]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = document.querySelectorAll<HTMLInputElement>(
      "#questionForm input"
    );
    let valid = true;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      if (field.name === "studentID") checkValidPlayerId(field);
      if (field.name === "submissionLink") checkValidDocLink(field);

      if (!field.validity.valid && valid) valid = false;
    }

    if (valid) {
      setForm((prev) => ({ ...prev, processing: true }));
      try {
        const submission = currentData as unknown;
        await emailjs
          .send(
            `${process.env.REACT_APP_EMAILJS_SERVICE_ID}`,
            `${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`,
            submission as Record<string, unknown>,
            `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
          )
          .then(async () => {
            console.log("email sent, adding to firebase");
            try {
              await update(userRef, {
                [data.title]: {
                  challengeSubmitted: true,
                },
              });
            } catch (error) {
              console.error("Error updating data:", error);
            }
          });
      } catch (error) {
        addNotification({
          error: true,
          content:
            "Submission unexpectedly failed; error while sending automated email. Contact support if issue persists.",
          close: false,
          duration: 0,
        });
      } finally {
        setForm((prev) => ({ ...prev, processing: false }));
      }
    }
  };
  return (
    <div className={s.optionsView}>
      <form
        id="questionForm"
        onSubmit={handleSubmit}
        ref={formRef}
        autoComplete="off"
        noValidate
      >
        <label className={s.challengeLabel}>
          <ChallengeModal data={data} />
        </label>
        <label>
          Instructions: Please create a Google Doc and provide any images,
          links, and/or other media within that document. Share the link to your
          completed document as well as your Player ID in the inputs below. For
          any help, please use the support button at the bottom of the page to
          contact us.
        </label>
        <div role="presentation" className={s.formSubmission}>
          <div>
            <label htmlFor="studentID">Player Id:</label>
            <div role="presentation" className={s.inputContainer}>
              <input
                aria-describedby="formError"
                id="studentID"
                name="studentID"
                type="text"
                placeholder="Same as Login ID"
                onChange={(e) => updateField<FromData>(e, setCurrentData)}
                disabled={form.processing}
                autoComplete="off"
              />
              <small aria-live="assertive" id="formError" className="formError">
                Not a valid player ID.
              </small>
            </div>
          </div>
          <div role="presentation">
            <label htmlFor="submissionLink">Google Doc Link:</label>
            <div role="presentation" className={s.inputContainer}>
              <input
                aria-describedby="formError"
                id="submissionLink"
                name="submissionLink"
                type="text"
                placeholder="https://docs.google.com/document"
                onChange={(e) => updateField<FromData>(e, setCurrentData)}
                disabled={form.processing}
                autoComplete="off"
              />
              <small aria-live="assertive" id="formError" className="formError">
                Not a valid Google Doc link.
              </small>
            </div>
          </div>
        </div>
        <div role="presentation" className={s.formButtons}>
          <AreYouSureModal
            label={"Are you sure?"}
            text={`Once you submit your choice, you will not be able to change it later.`}
            func={handleSubmit}
            disabledProps={playerCheck || disabledButton || form.processing}
            buttonClass={s.questionSubmit}
          />
          {/* <button
            type="submit"
            className={s.questionSubmit}
            disabled={playerCheck || form.processing}
          /> */}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  user: user.credentials,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
