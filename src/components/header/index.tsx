import { NavLink } from "react-router-dom";
import s from "./styles.module.css";
import CurrentDoblons from "../currentDoblons";
import Hamburger from "./Hamburger";

interface Props {
  title?: string;
  style?: React.CSSProperties;
}

const Header: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  title,
  style,
  ...options
}) => {
  const addFullHeader =
    title &&
    (title.includes(" ") ||
      title === "Sponsors" ||
      title === "Login" ||
      title === "Register" ||
      title === "Reset");

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
      className={addFullHeader ? `${s.container} ${s.full}` : s.container}
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
              title === "Reset" ? (
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
              ) : title === "Sponsors" || title.includes(" ") ? (
                <>
                  <h1 className={s.mainTitle}>
                    {title === "Sponsors" ? title : hasSpace(title)}
                  </h1>
                  <nav>
                    <NavLink to="/" className={s.mainMap} />
                    <NavLink to="/businesses" className={s.busMap} />
                    <button aria-label="Logout" />
                  </nav>
                </>
              ) : (
                <h1 className={`${s.mainTitle} ${!title ? s.noTitle : ""}`}>
                  {title}
                </h1>
              )}
              <Hamburger />
            </div>
          </>
        )}
      </div>
      <h1 className={s.responsiveTitle}>{title}</h1>
    </header>
  );
};

export default Header;
