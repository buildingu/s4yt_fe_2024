import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../ModelTemplate";

interface Props {
  data: {
    content: string;
    title: string;
  };
}

const ChallengeModal: React.FC<Props> = ({ data }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <label
        aria-label="View Business Challenge"
        aria-expanded={show}
        aria-controls="modal"
        htmlFor="answer"
        onClick={() => setShow(true)}
        className={s.challengeLabel}
      >
        {data?.title}
      </label>
      <ModalTemplate
        show={show}
        setShow={setShow}
        label="Your Business Challenge"
      >
        <div className={s.challengeContainer}>
          <p>{data?.content}</p>
        </div>
      </ModalTemplate>
    </>
  );
};

export default ChallengeModal;
