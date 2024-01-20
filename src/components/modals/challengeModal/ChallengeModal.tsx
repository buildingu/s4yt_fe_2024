import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../ModelTemplate";

interface Props {
  data: {
    content: string;
    title: string;
  };
  // setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChallengeModal: React.FC<Props> = ({ data }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <label
        aria-label="View Raffle Item"
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
        className={s.challengeLabel}
      >
        {data?.title}
      </label>
      <ModalTemplate show={show} setShow={setShow} label="Raffle Item Details">
        <div className={s.challengeContainer}>
          <button className={s.backBtn} onClick={() => setShow(false)} />
          <p>{data?.content}</p>
        </div>
      </ModalTemplate>
    </>
  );
};

export default ChallengeModal;
