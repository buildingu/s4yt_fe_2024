import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { routes } from "@root/routes";

import Notification from "@components/notification";

import s from "./styles.module.css";

interface Props extends React.PropsWithChildren<{}> {
  style?: React.CSSProperties;
}

const Layout: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  children,
  style,
  ...options
}) => {
  const location = useLocation(),
    titlePrefix = "$4YT @building-u.com";

  useEffect(() => {
    const currentRoute = routes.find(
      (route) =>
        route.path === location.pathname ||
        (route.path.includes("/:") &&
          location.pathname.startsWith("/businesses"))
    );

    document.title = currentRoute?.title
      ? `${currentRoute.title} | ${titlePrefix}`
      : titlePrefix;
  }, []);

  return (
    <>
      <div className={s.container} style={style} {...options}>
        {children}
      </div>
      <Notification />
    </>
  );
};

export default Layout;
