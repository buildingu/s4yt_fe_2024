import { UserReduxState } from "@reducers/user";
import { GameConfigReduxState } from "@reducers/gameConfig";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logoutPlayer } from "@actions/user";

import CurrentDoblons from "../currentDoblons";
import Hamburger from "./Hamburger";

import s from "./styles.module.css";
import { Dispatch } from "redux";

interface Props {
  title?: string;
  style?: React.CSSProperties;
  userToken?: string;
  restrictedAccess?: boolean;
  logoutPlayer: () => void;
}

// FIXME: The styles and this code need to cleaned up.
const Header: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  title,
  style,
  userToken,
  restrictedAccess,
  logoutPlayer,
  ...options
}) => {
  const addFullHeader =
    title &&
    (title.includes(" ") ||
      title === "Sponsors" ||
      title === "Login" ||
      title === "Register" ||
      title === "Profile");

  const hasSpace = (title: string) => {
    const parts = title.split(" ");
    return (
      <>
        {parts[0]}
        <br />
        {parts[1]}
      </>
    );
  };

  return (
    <header
      className={
        addFullHeader
          ? `${s.container} ${s.full} ${title === "Profile" ? s.isProfile : ""}`
          : s.container
      }
      style={style}
      {...options}
    >
      <div>
        <img
          src="/assets/s4yt.png"
          alt="s4yt"
          className={`${s.logo} ${!title ? s.noTitle : ""}`}
        />
        {title && (
          <>
            <CurrentDoblons type="header" addFullHeader={addFullHeader} />
            <hr />
            <div className={s.right}>
              {title === "Login" ||
              title === "Register" ||
              title.includes("Email") ||
              title.includes("Password") ? (
                <>
                  <h1 className={s.mainTitle}>{title}</h1>
                  <a
                    aria-label="building-U Website"
                    href="https://building-u.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.checkout}
                  />
                </>
              ) : title === "Sponsors" ||
                title === "Profile" ||
                title.includes(" ") ? (
                <>
                  <h1 className={s.mainTitle}>
                    {title === "Sponsors" ? title : hasSpace(title)}
                  </h1>
                  <nav>
                    <NavLink
                      to="/"
                      className={s.mainMap}
                      onClick={(e) => {
                        if (restrictedAccess) e.preventDefault();
                      }}
                      aria-disabled={restrictedAccess}
                    />
                    <NavLink aria-disabled="true" onClick={(e) => e.preventDefault()} to="/business" className={s.busMap} />
                    <button
                      aria-label="Logout"
                      onClick={() => logoutPlayer()}
                      // temporary
                      disabled
                    />
                  </nav>
                </>
              ) : (
                <h1 className={`${s.mainTitle} ${!title ? s.noTitle : ""}`}>
                  {title}
                </h1>
              )}
              {userToken ? (
                <Hamburger
                  restrictedAccess={restrictedAccess}
                  logoutPlayer={logoutPlayer}
                />
              ) : (
                <a
                  aria-label="building-U Website"
                  href="https://building-u.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.checkoutPersist}
                />
              )}
            </div>
          </>
        )}
      </div>
      <h1 className={s.responsiveTitle}>{title}</h1>
    </header>
  );
};

const mapStateToProps = ({
  user,
  gameConfig,
}: {
  user: UserReduxState;
  gameConfig: GameConfigReduxState;
}) => ({
  userToken: user.token,
  restrictedAccess: gameConfig.restrictedAccess,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logoutPlayer: () => dispatch(logoutPlayer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
