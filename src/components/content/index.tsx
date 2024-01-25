import s from "./styles.module.css";

import coins1 from "@static/coins_variant1.png";
import coins2 from "@static/coins_variant2.png";
import coins3 from "@static/coins_variant3.png";
import feather from "@static/feather.png";

interface Props {
  children?: React.ReactNode;
  addCoins?: "coins1" | "coins2" | "coins3";
  addFeather?: "left" | "right1" | "right2";
  style?: React.CSSProperties;
}

const Content: React.FC<Props> & React.HTMLAttributes<HTMLDivElement> = ({
  children,
  addCoins,
  addFeather,
  style,
  ...options
}) => {
  return (
    <div className={s.container} style={style} {...options}>
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
  );
};

export default Content;
