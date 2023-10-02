import React from "react";
import Notification from "@components/notification";
import s from "./styles.module.css";

interface Props {
  children?: any;
  large?: Boolean;
}

const Layout: React.FC<Props> = ({ children, large }) => {
  return (
    <>
      <div className={large ? s.container + " " + s.large : s.container}>
        {children}
      </div>
      <Notification />
    </>
  );
};

export default Layout;
