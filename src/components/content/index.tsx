import React from "react";
import s from "./styles.module.css";

interface Props {
  children?: React.JSX.Element;
}

const Content: React.FC<Props> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default Content;
