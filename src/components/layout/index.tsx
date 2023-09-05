import React from "react";
import { useLocation } from "react-router-dom";
import Notification from "@components/notification";
import s from "./styles.module.css";

interface Props {
  children?: React.JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <div
        className={s.container}
        {...(location.pathname === "/profile" && {
          style: {
            maxWidth: "1150px",
            padding: "1rem", // I added padding here because why isn't there padding in general anyways?
          },
        })}
      >
        {children}
      </div>
      <Notification />
    </>
  );
};

export default Layout;
