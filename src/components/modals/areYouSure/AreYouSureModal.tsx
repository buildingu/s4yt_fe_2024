import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../ModelTemplate";

interface Props {
  label: string;
  text: string;
  disabledProps: boolean;
  buttonClass: string;
  func: (e: React.MouseEvent<HTMLButtonElement>) => any;
}

const AreYouSureModal: React.FC<Props> = ({ label, text, func, buttonClass, disabledProps }) => {
  const [show, setShow] = useState(false);

  const handleFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    func(e);
    setShow(false);
  };

  return (
    <>
      <button
        aria-label={label}
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
        className={buttonClass}
        disabled={disabledProps}
      />
      <ModalTemplate show={show} setShow={setShow} label="Are you Sure?">
        <div className={s.container}>
          <p>{text}</p>
          {/* Side by side. */}
          <div>
            <button onClick={handleFunction}>Yes</button>
            <button onClick={() => setShow(false)}>No</button>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

export default AreYouSureModal;
