import { useState } from "react";

import ModalTemplate from "../ModalTemplate";
import s from "./styles.module.css";

interface Props extends React.ComponentProps<"button"> {
  text: string;
  func: any;
}

const AreYouSureModal: React.FC<Props> = ({ text, func, ...props }) => {
  const [show, setShow] = useState(false);

  const handleFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    func(e);
    setShow(false);
  };

  return (
    <>
      <button
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
        {...props}
      />
      <ModalTemplate show={show} setShow={setShow} height={250} label="Are you Sure?">
        <div className={s.container}>
          <p>{text}</p>
          <div>
            <button className="fade move" onClick={handleFunction}>Yes</button>
            <button className="fade move" onClick={() => setShow(false)}>No</button>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

export default AreYouSureModal;
