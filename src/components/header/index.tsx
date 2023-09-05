import React from "react";
import { useLocation, Link } from "react-router-dom";
import s from "./styles.module.css";

interface Props {
  children?: React.JSX.Element;
}

const Header: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <header
      className={
        location.pathname === "/profile"
          ? `${s.container} ${s.profile}`
          : s.container
      }
    >
      {!children && (
        <>
          <img src="/assets/s4yt.png" alt="s4yt" className={s.logo} />
          {location.pathname === "/profile" && (
            <>
              <div>
                <h1>Profile</h1>
                <Link to="" />
                <button />
              </div>
            </>
          )}
        </>
      )}
      {children}
    </header>
  );
};

export default Header;
