import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// TODO:
import { routes } from "@root/routes";

import Notification from "@components/notification";

import s from "./styles.module.css";
import coins1 from "@static/coins_variant1.png";
import coins2 from "@static/coins_variant2.png";
import coins3 from "@static/coins_variant3.png";
import feather from "@static/feather.png";

interface Props extends React.PropsWithChildren<{}> {
  // large?: Boolean;
  addCoins?: "coins1" | "coins2" | "coins3";
  addFeather?: "left" | "right1" | "right2";
  style?: React.CSSProperties;
}

// right1 is the one that is tilted more.

const Layout: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  children,
  // large,
  addCoins,
  addFeather,
  style,
  ...options
}) => {
  // const [imageSrc, setImageSrc] = useState("");

  const location = useLocation(),
    titlePrefix = "$4YT @building-u.com";

  useEffect(() => {
    document.title = `${
      location.pathname === "/"
        ? "Treasure Map"
        : location.pathname.charAt(1).toUpperCase() +
          location.pathname
            .slice(2)
            .replace(/-/g, " ")
            .replace(/ \w/g, (x) => x.toUpperCase())
    } | ${titlePrefix}`;
  }, [location.pathname]);

  // FIXME: wtf.
  // useEffect(() => {
  //   if (addCoins) {
  //     const imageMap = {
  //       coins1: "../../static/coins_variant1.png",
  //       coins2: "../../static/coins_variant2.png",
  //       coins3: "../../static/coins_variant3.png",
  //     };

  //     import(imageMap[addCoins])
  //       .then((img) => {
  //         setImageSrc(img.default);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  //   console.log("imageSrc", imageSrc);
  // }, [addCoins]);

  return (
    <>
      {addFeather && (
        <img
          src={feather}
          alt="Feather"
          className={`${s.feather} ${
            addFeather === "left"
              ? s.left
              : addFeather === "right1"
              ? s.right1
              : s.right2
          }`}
        />
      )}
      <div className={s.container} style={style} {...options}>
        {addCoins && (
          <img
            src={
              addCoins === "coins1"
                ? coins1
                : addCoins === "coins2"
                ? coins2
                : coins3
              // imageSrc
            }
            alt="Doblons"
            className={
              addCoins === "coins1"
                ? s.coins1
                : addCoins === "coins2"
                ? s.coins2
                : s.coins3
            }
          />
        )}
        {children}
      </div>
      <Notification />
    </>
  );
};

export default Layout;
