import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../ModelTemplate";

interface Props {
  student: {
    name: string;
    email: string;
  };
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SupportModal: React.FC<Props> = ({ student }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => setShow(true)}
        aria-label="Support"
        className={s.questions}
      />
      <ModalTemplate show={show} setShow={setShow} label="Raffle Item Details">
        <div className={s.modalContainer}>
          <h2>Support</h2>
          <div className={s.supportContainer}>
            <p>
              Hey, {student.name}! If you need help with anything feel free to
              contact us via our email: <span>s4yt@mail.com</span> 
            </p>
            <p>
              Additionally, if you are a part of our discord community, we would be happy to provide help in our 'SUPPORT' channel: 
              <span>discord link</span>
            </p>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

export default SupportModal;
