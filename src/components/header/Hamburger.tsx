import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import s from "./styles.module.css";

const Hamburger: React.FC = () => {
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
            {/* TODO: Need image for secLogo. */}
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
                <NavLink to="/" className={s.mainMap} />
                <button aria-label="Support" className={s.questions} />
                <button aria-label="Chat" className={s.chat} />
                <button aria-label="Logout" className={s.logout} />
              </div>
              <ul aria-label="Links">
                <li>
                  <NavLink to="/profile" onClick={() => toggleMenu(false)}>
                    Profile Page
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sponsors" onClick={() => toggleMenu(false)}>
                    Sponsors
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
