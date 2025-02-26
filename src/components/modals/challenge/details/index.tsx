import type { Business } from "@reducers/businesses";

import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../../ModalTemplate";

interface Props extends React.ComponentProps<"button"> {
  challenge_question: Business["challenge_question"];
}

const ChallengeDetailsModal: React.FC<Props> = ({ challenge_question, className, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
        className={`${s.trigger} fade move${className ? " " + className : ""}`}
        {...props}
      >
        Click here to view challenge
      </button>
      <ModalTemplate
        show={show}
        setShow={setShow}
        height={448}
        label="Your Business Challenge"
      >
        <div className={s.container}>
          <h3>{challenge_question.title}</h3>
          <p>{challenge_question.description}</p>
        </div>
      </ModalTemplate>
    </>
  );
};

export default ChallengeDetailsModal;
