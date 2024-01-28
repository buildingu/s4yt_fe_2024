import { useState, ChangeEvent, FormEvent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import emailjs from "@emailjs/browser";
import uuidRegex from "@constants/uuidRegex";
import linkValidator from "@utils/linkValidator";
import { addNotification } from "@actions/notifications";
import NotificationValues from "@typings/NotificationValues";

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

const Questions: React.FC<Props> = ({ playerCheck, data, addNotification }) => {
  const [submission, setSubmission] = useState({
    sponsorName: data?.title,
    studentID: "",
    submissionLink: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      uuidRegex.test(submission.studentID) &&
      linkValidator(submission.submissionLink)
    ) {
      emailjs
        .send(
          `${process.env.REACT_APP_EMAILJS_SERVICE_ID}`,
          "template_oc3kfme",
          submission,
          `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    } else if (!uuidRegex.test(submission.studentID)) {
      addNotification({
        error: true,
        content: "Please enter a valid Player ID.",
        close: false,
        duration: 5000,
      });
    } else if (!linkValidator(submission.submissionLink)) {
      addNotification({
        error: true,
        content: "Please enter a valid Google Doc link.",
        close: false,
        duration: 5000,
      });
    }
  };
  return (
    <div className={s.optionsView}>
      <form onSubmit={handleSubmit}>
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
        <div className={s.formSubmission}>
          <div>
            <label htmlFor="playerID">Player ID:</label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSubmission((prev) => ({
                  ...prev,
                  studentID: e.target.value,
                }));
              }}
              id="playerID"
              type="text"
              placeholder="Same as Login ID"
            />
          </div>
          <div>
            <label htmlFor="docLink">Google Doc Link:</label>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSubmission((prev) => ({
                  ...prev,
                  submissionLink: e.target.value,
                }));
              }}
              id="docLink"
              type="text"
              placeholder="https://docs.google.com/document"
            />
          </div>
        </div>
        <div className={s.formButtons}>
          <button
            disabled={
              playerCheck ||
              submission.studentID === "" ||
              submission.submissionLink === ""
            }
            className={s.questionSubmit}
            type="submit"
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
