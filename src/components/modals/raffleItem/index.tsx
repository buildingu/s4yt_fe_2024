import type { RaffleItem } from "@reducers/game";

import { useState, useLayoutEffect } from "react";

import ModalTemplate from "../ModalTemplate";
import s from "./styles.module.css";

interface Props extends React.ComponentProps<"button"> {
  item: RaffleItem
}

const RaffleItemModal: React.FC<Props> = ({ children, className, item, ...props }) => {
  const [show, setShow] = useState(false),
    [mobileBreakpoint, setMobileBreakpoint] = useState(false);
  
  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 648) {
        setMobileBreakpoint(true);
      } else {
        setMobileBreakpoint(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <button
        aria-label="View Raffle Item"
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
        className={`${s.trigger} move${className ? " " + className : ""}`}
        {...props}
      >
        {children}
      </button>
      <ModalTemplate
        show={show}
        setShow={setShow}
        label="Raffle Item Details"
        width={732.217}
        height={635}
        noExitBtn={!mobileBreakpoint}
        style={{ padding: 0, border: 0 }}
      >
        <div className={s.container}>
          <div className={s.content}>
            <div>
              {mobileBreakpoint ? (
                <h2 className={s.mobileTitle}>{item.name}</h2>
              ) : (
                <button
                  className="backBtn fade move"
                  onClick={() => setShow(false)}
                />
              )}
              <img src={item.image_src} alt={item.name} />
            </div>

            <div>
              {!mobileBreakpoint && <h2>{item.name}</h2>}
              <p>{item.description}</p>

              <div className={s.extras}>
                <p className={s.stock}>
                  we have: <span>{item.stock}</span> items<br /> available
                </p>
                <div className={s.donated}>
                  <p>Donated By:</p>
                  <img
                    src={item.raffle_partner.logo}
                    alt={item.raffle_partner.name}
                    className={s.sponsorLogo}
                  />
                </div>
              </div>
            </div>
          </div>

          <a
            href={item.raffle_partner.resource_link}
            target="_blank"
            rel="noopener noreferrer"
            className={s.resource}
            data-resource-category={item.raffle_partner.resource_category}
          >
            <div>
              <p>Click to See</p>
            </div>
            
            <div>
              <img
                src={item.raffle_partner.resource_logo}
                alt={item.raffle_partner.resource_name}
              />
              <p>
                {item.raffle_partner.resource_name}
              </p>
            </div>
          </a>
        </div>
      </ModalTemplate>
    </>
  );
};

export default RaffleItemModal;
