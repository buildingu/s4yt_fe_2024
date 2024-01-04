import { useState } from "react";

import ModalTemplate from "../ModelTemplate";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const RaffleItemModal: React.FC<Props> = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        aria-label="View Raffle Item"
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
      >
        Open Modal
      </button>
      <ModalTemplate show={show} setShow={setShow} label="Raffle Item Details">
        RaffleItemModal
      </ModalTemplate>
    </>
  );
};

export default RaffleItemModal;
