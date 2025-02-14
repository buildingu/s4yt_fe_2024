import s from "./styles.module.css";

import coins1 from "/images/coins_variant1.png";
import coins2 from "/images/coins_variant2.png";
import coins3 from "/images/coins_variant3.png";
import feather from "/images/feather.png";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  addCoins?: "coins1" | "coins2" | "coins3";
  addFeather?: "left" | "right1" | "right2";
}

const Content: React.FC<Props> = ({
  children,
  addCoins,
  addFeather,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={`${s.container}${className ? " " + className : ""}`}
      style={style}
      {...props}
    >
      {/* window.innerWidth is to prevent how mobile overflows. */}
      {addFeather && window.innerWidth > 900 && (
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
      {addCoins && window.innerWidth > 900 && (
        <img
          src={
            addCoins === "coins1"
              ? coins1
              : addCoins === "coins2"
              ? coins2
              : coins3
          }
          alt="Dubl-u-nes Stack"
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
