import type { Business } from "@root/redux/reducers/businesses";

import { useRef, useState } from "react";
import { connect } from "react-redux";

import updateField from "@utils/forms/updateField";
import checkValidDocLink from "@utils/forms/checkValidDocLink";

import { submitChallengeAnswer } from "@actions/businesses";

import ChallengeDetailsModal from "@components/modals/challenge/details";
import ChallengeInstructionsModal from "@components/modals/challenge/instructions";
import AreYouSureModal from "@components/modals/areYouSure";
import Input from "@components/forms/controls/Input";

import s from "./styles.module.css";

interface Props {
  submitChallengeAnswer: (
    challenge_id: string,
    submission_link: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => Promise<void>;
  challenge_question: Business["challenge_question"];
  isNotPlayer: boolean;
}

const Challenge: React.FC<Props> = ({
  submitChallengeAnswer,
  challenge_question,
  isNotPlayer
}) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({ processing: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const field = (formRef.current!.elements[0] as HTMLInputElement);
    checkValidDocLink(field);

    if (field.validity.valid) {
      setForm({ processing: true });
      await submitChallengeAnswer(
        challenge_question.challenge_id,
        field.value,
        formRef,
        setForm
      );
    }
  };

  return (
    <div className={`${s.optionsView} ${s.challenge}`}>
      <div>
        <ChallengeDetailsModal
          challenge_question={challenge_question}
          className={s.viewChallenge}
        />

        <p id="questionPara" data-submitted={challenge_question.answer_submitted}>
          {challenge_question.answer_submitted ? (
            <>
              <span>You already submitted your answer for this business</span>,
              but you can submit again if you want to override it.
            </>
          ) : (
            "Submit your challenge answer below for a chance to win an award."
          )}
        </p>
      </div>

      <form
        aria-describedby="questionPara"
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
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
            disabled={form.processing}
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
          
          <AreYouSureModal
            aria-label="Submit"
            text="You're about to submit your answer, are you sure?"
            func={handleSubmit}
            type="submit"
            disabled={isNotPlayer || form.processing}
            className={s.submit}
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  submitChallengeAnswer: (
    challenge_id: string,
    submission_link: string,
    formRef: React.RefObject<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<{ processing: boolean }>>
  ) => dispatch(submitChallengeAnswer(challenge_id, submission_link, formRef, setForm))
});

export default connect(null, mapDispatchToProps)(Challenge);
