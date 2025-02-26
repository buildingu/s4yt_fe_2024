import type { UserReduxState } from "@reducers/user";
import type { Business } from "@root/redux/reducers/businesses";
import type UserCredentials from "@typings/UserCredentials";
import NotificationValues from "@typings/NotificationValues";

import { useRef, useState } from "react";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidDocLink from "@utils/forms/checkValidDocLink";

import { submitAnswer } from "@actions/businesses";
// import { addNotification } from "@actions/notifications";

import ChallengeDetailsModal from "@components/modals/challenge/details";
import ChallengeInstructionsModal from "@components/modals/challenge/instructions";
import AreYouSureModal from "@components/modals/areYouSure";
import Input from "@components/forms/controls/Input";

import s from "./styles.module.css";

interface Props {
  user?: UserCredentials;
  submitAnswer: (
    business_name: string,
    link: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => Promise<void>;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
  name: string;
  challenge_question: Business["challenge_question"];
  isNotPlayer: boolean;
}

const Challenge: React.FC<Props> = ({
  // user,
  submitAnswer,
  // addNotification,
  name,
  challenge_question,
  isNotPlayer
}) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({ processing: false });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const field = (formRef.current!.elements[0] as HTMLInputElement);
    checkValidDocLink(field);

    if (field.validity.valid) {
      setForm({ processing: true });
      await submitAnswer(name, field.value, formRef, setForm);
    }
  };

  return (
    <div className={`${s.optionsView} ${s.challenge}`}>
      <div>
        <ChallengeDetailsModal
          challenge_question={challenge_question}
          className={s.viewChallenge}
        />

        <p id="questionPara">
          Submit your challenge question below for a chance to win an award.
        </p>
      </div>

      <form
        aria-describedby="questionPara"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        // onSubmit={submit}
        autoComplete="off"
        noValidate
      >
        <label htmlFor="submissionLink">Google Doc Link:</label>
        <div role="presentation" className={s.inputContainer}>
          <Input
            id="link"
            name="link"
            type="text"
            errorMsg="Not a valid Google Doc link"
            placeholder="https://docs.google.com/document"
            onChange={(e) => updateField<{ link: string }>(e)}
            disabled={form.processing
              // TODO: Something like this if re-submissions is not allowed.
              // || user.challenge_answers_submitted[name]
            }
            autoComplete="off"
            required
          />
        </div>
        <div role="presentation" className={s.formBtns}>
          <ChallengeInstructionsModal
            aria-label="Instructions"
            type="button"
            className={s.instructions}
          />
          
          {/* TODO: I don't know if you have one try anymore. */}
          <AreYouSureModal
            aria-label="Submit"
            text="Once you submit your answer, you will not be able to change it later."
            func={submit}
            type="submit"
            disabled={isNotPlayer || form.processing
              // || user.challenge_answers_submitted[name]
            }
            className={s.submit}
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  user: user.credentials
});
const mapDispatchToProps = (dispatch: any) => ({
  // addNotification: (notification: Omit<NotificationValues, "id">) =>
  //   dispatch(addNotification(notification)),
  submitAnswer: (
    business_name: string,
    link: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => dispatch(submitAnswer(business_name, link, formRef, setForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
