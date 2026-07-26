import ModalTemplate from "../ModalTemplate";
import s from "./styles.module.css";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvitationModal: React.FC<Props> = ({ show, setShow }) => {
  return (
    <ModalTemplate
      show={show}
      setShow={setShow}
      aria-label="Event Invitation"
      height={350}
    >
      <div className={s.container}>
        <h2>You're Invited!</h2>
        <p>Event results meeting and casual Q&A with challenge partners.</p>
        <p className={s.date}>September 12th at 2 PM EST</p>
        <button
          className={`${s.backBtn} fade move`}
          onClick={() => setShow(false)}
        >
          Go Back
        </button>
      </div>
    </ModalTemplate>
  );
};

export default InvitationModal;
