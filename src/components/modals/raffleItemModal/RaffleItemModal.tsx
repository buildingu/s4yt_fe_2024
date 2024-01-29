import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../ModelTemplate";
import { Product } from "@root/redux/reducers/coinTracker";

interface Props {
  products: Product
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
      />
      <ModalTemplate
        show={show}
        setShow={setShow}
        label="Raffle Item Details"
        noExitBtn
      >
        <div className={s.modalContainer}>
          <div className={s.modalLeft}>
            {/* temporary button */}
            <button className={s.backBtn} onClick={() => setShow(false)} />
            <img src={products.image_src} alt={products.name} />
          </div>
          <div className={s.modalRight}>
            <h2>{products.name}</h2>
            <h3>{products.description}</h3>
            <div className={s.productExtras}>
              <p>
                we have: <span>{products.stock}</span> items available
              </p>
              <div>
                <p>sponsored by:</p>
                <a
                  href={products.raffle_partner.resource_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={s.sponsorLogo}
                    src={products.raffle_partner.logo_default}
                    alt={products.raffle_partner.organization_name}
                  />
                </a>
                <span>{products.raffle_partner.organization_name}</span>
              </div>
            </div>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

export default RaffleItemModal;
