import React from "react";
import { useLocation, Link } from "react-router-dom";
import s from "./styles.module.css";

interface Props {
  title?: string;
}

const Header: React.FC<Props> = ({ title }) => {
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
          {title === "Instructions" ? (
            <h1>{title}</h1>
          ) : (
            <div>
              <h1>{hasSpace(title)}</h1>
              <Link to="/" className={s.mainMap} />
              <Link to="/businesses" className={s.busMap} />
              <button />
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
