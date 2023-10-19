import { useLocation, NavLink } from "react-router-dom";
import s from "./styles.module.css";

interface Props {
  title?: string;
  style?: React.CSSProperties;
}

const Header: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  title,
  style,
  ...options
}) => {
  const location = useLocation();

  const hasSpace = (title: string) => {
    if (title.includes(" ")) {
      const parts = title.split(" ");
      return (
        <>
          {parts[0]}
          <br />
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <header
      // className={
      //   location.pathname === "/profile"
      //     ? `${s.container} ${s.profile}`
      //     : s.container
      // }
      className={
        title && title !== "Instructions"
          ? `${s.container} ${s.full}`
          : s.container
      }
      style={style}
      {...options}
    >
      <img src="/assets/s4yt.png" alt="s4yt" className={s.logo} />
      {/* {location.pathname === "/profile" && (
        <>
          <div>
            <h1>Profile</h1>
            <Link to="" />
            <button />
          </div>
        </>
      )} */}
      {title && (
        <>
          <hr />
          {/* TODO: if doesn't include space? */}
          {title === "Instructions" ? (
            <h1>{title}</h1>
          ) : (
            <nav>
              <h1>{hasSpace(title)}</h1>
              <NavLink to="/" className={s.mainMap} />
              <NavLink to="/businesses" className={s.busMap} />
              <button />
            </nav>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
