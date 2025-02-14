import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SupportModal from "@components/modals/supportModal/SupportModal";
import s from "./styles.module.css";

interface Props {
  restrictedAccess?: boolean;
  logoutPlayer: () => void;
}

const Hamburger: React.FC<Props> = ({ restrictedAccess, logoutPlayer }) => {
  const [menu, toggleMenu] = useState(false);

  useEffect(() => {
    menu
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "initial");
  }, [menu]);

  return (
    <>
      <button
        aria-label="Menu Options"
        aria-pressed={menu}
        aria-controls="menu"
        className={s.hamburger}
        onClick={() => toggleMenu(!menu)}
      >
        <span role="presentation" />
        <span role="presentation" />
        <span role="presentation" />
      </button>
      {menu && (
        <>
          <div id="menu" className={s.menu}>
            <div>
              <div className={s.secLogo} />{" "}
              <button
                aria-label="Menu Options"
                aria-pressed={menu}
                aria-controls="menu"
                className={s.hamburgerClose}
                onClick={() => toggleMenu(!menu)}
              >
                <span role="presentation" />
                <span role="presentation" />
              </button>
            </div>
            <nav>
              <div>
                <NavLink
                  to="/"
                  className={s.mainMap}
                  onClick={(e) => {
                    if (restrictedAccess) e.preventDefault();
                  }}
                  aria-disabled={restrictedAccess}
                />
                <SupportModal />
                <a
                  aria-label="building-U Website"
                  href="https://building-u.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.checkout}
                />
                <button
                  aria-label="Logout"
                  className={s.logout}
                  onClick={() => logoutPlayer()}
                />
              </div>
              <ul aria-label="Links">
                <li>
                  <NavLink to="/profile" onClick={() => toggleMenu(false)}>
                    Profile Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/learn" onClick={() => toggleMenu(false)}>
                    Learn and Earn
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/businesses" onClick={() => toggleMenu(false)}>
                    See Businesses
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/results" onClick={() => toggleMenu(false)}>
                    Event Results
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/raffle" onClick={() => toggleMenu(false)}>
                    Raffle Page
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Hamburger;
