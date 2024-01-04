import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../ModelTemplate";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  products: {
    img: any;
    name: string;
    sponsor: string;
    availability: number;
    description: string;
  };
}

const RaffleItemModal: React.FC<Props> = ({ products }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        aria-label="View Raffle Item"
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
        className={s.lensButton}
      >
        Open Modal
      </button>
      <ModalTemplate show={show} setShow={setShow} label="Raffle Item Details">
        <div className={s.modalContainer}>
          <div className={s.modalLeft}>
            {/* temporary button */}
            {/* <button onClick={() => setShow(false)}>back</button> */}
            <img src={products.img} alt={products.name} />
          </div>
          <div className={s.modalRight}>
            <h2>{products.name}</h2>
            <h3>{products.description}</h3>
            <div className={s.productExtras}>
              <p>
                we have: <span>{products.availability}</span> items available
              </p>
              <div>
                <p>sponsored by:</p>
                <img src="" alt={products.sponsor} />
              </div>
            </div>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

export default RaffleItemModal;
