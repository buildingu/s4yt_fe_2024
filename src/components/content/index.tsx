import React from "react";
import s from "./styles.module.css";

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Content: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  children,
  style,
  ...options
}) => {
  return (
    <div className={s.container} style={style} {...options}>
      {children}
    </div>
  );
};

export default Content;
