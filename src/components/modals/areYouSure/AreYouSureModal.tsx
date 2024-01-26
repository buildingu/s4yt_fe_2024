import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../ModelTemplate";

interface Props {
  label: string;
  text: string;
  func: () => any;
}

const AreYouSureModal: React.FC<Props> = ({ label, text, func }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        aria-label={label}
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
        // className={}
      />
      <ModalTemplate show={show} setShow={setShow} label="Are you Sure?">
        <div className={s.container}>
          <p>{text}</p>
          {/* Side by side. */}
          <div>
            <button onClick={() => func()}>Yes</button>
            <button onClick={() => setShow(false)}>No</button>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

export default AreYouSureModal;
