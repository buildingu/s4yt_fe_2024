import React from "react";
import Notification from "@components/notification";
import s from "./styles.module.css";
import coins1 from "@static/coins_variant1.png";
import coins2 from "@static/coins_variant2.png";
import coins3 from "@static/coins_variant3.png";

interface Props {
  children?: any;
  large?: Boolean;
  addCoins?: "coins1" | "coins2" | "coins3";
}

const Layout: React.FC<Props> = ({ children, large, addCoins }) => {
  return (
    <>
      <div className={large ? s.container + " " + s.large : s.container}>
        {addCoins && (
          <img
            src={
              addCoins === "coins1"
                ? coins1
                : addCoins === "coins2"
                ? coins2
                : coins3
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
