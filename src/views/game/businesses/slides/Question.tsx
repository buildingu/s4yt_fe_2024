import NotificationValues from "@typings/NotificationValues";

import { useRef, useState, FormEvent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import emailjs from "@emailjs/browser";

import updateField from "@utils/forms/updateField";
import checkValidPlayerId from "@utils/forms/checkValidPlayerId";
import checkValidDocLink from "@utils/forms/checkValidDocLink";

import { addNotification } from "@actions/notifications";

import ChallengeModal from "@components/modals/challengeModal/ChallengeModal";

import s from "./styles.module.css";

interface Props {
  playerCheck: any;
  data: {
    title: string;
    content: string;
    submissionCount: number;
  };
  addNotification: (data: Omit<NotificationValues, "id">) => void;
}

interface QuestionFormData {
  sponsorName: string;
  player_id: string;
  docLink: string;
}

const Questions: React.FC<Props> = ({ playerCheck, data, addNotification }) => {
  const formRef = useRef<HTMLFormElement>(null),
    [form, setForm] = useState({
      processing: false,
    }),
    [currentData, setCurrentData] = useState<QuestionFormData>({
      sponsorName: data?.title,
      player_id: "",
      docLink: "",
    });
  //  [submission, setSubmission] = useState({
  //   sponsorName: data?.title,
  //   studentID: "",
  //   submissionLink: "",
  // });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = document.querySelectorAll<HTMLInputElement>(
      "#questionForm input"
    );
    let valid = true;

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      if (field.name === "player_id") checkValidPlayerId(field);
      if (field.name === "docLink") checkValidDocLink(field);

      if (!field.validity.valid && valid) valid = false;
    }

    if (valid) {
      setForm((prev) => ({ ...prev, processing: true }));

      try {
        const submission = currentData as unknown;
        await emailjs.send(
          `${process.env.REACT_APP_EMAILJS_SERVICE_ID}`,
          "template_oc3kfme",
          submission as Record<string, unknown>,
          `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
        );
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
            <label htmlFor="player_id">Player Id:</label>
            <div role="presentation" className={s.inputContainer}>
              <input
                aria-describedby="formError"
                id="player_id"
                name="player_id"
                type="text"
                placeholder="Same as Login ID"
                onChange={(e) =>
                  updateField<QuestionFormData>(e, setCurrentData)
                }
                disabled={form.processing}
                autoComplete="off"
              />
              <small aria-live="assertive" id="formError" className="formError">
                Not a valid player ID.
              </small>
            </div>
          </div>
          <div role="presentation">
            <label htmlFor="docLink">Google Doc Link:</label>
            <div role="presentation" className={s.inputContainer}>
              <input
                aria-describedby="formError"
                id="docLink"
                name="docLink"
                type="text"
                placeholder="https://docs.google.com/document"
                onChange={(e) =>
                  updateField<QuestionFormData>(e, setCurrentData)
                }
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
          <button
            type="submit"
            className={s.questionSubmit}
            disabled={playerCheck || form.processing}
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
});

export default connect(null, mapDispatchToProps)(Questions);
