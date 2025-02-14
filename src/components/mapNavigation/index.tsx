import type { GameConfigReduxState } from "@reducers/gameConfig";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import s from "./styles.module.css";

interface Props {
  img: { src: any; alt: string };
  txt: string;
  to: string;
  disableOn?: readonly string[];
  gameConfig: GameConfigReduxState;
}

const MapNavigation: React.FC<Props> = ({
  img,
  txt,
  to,
  disableOn,
  gameConfig
}) => {
  const disabled =
    !to ||
    disableOn?.includes(
      gameConfig.gameStart
        ? "gameStart"
        : gameConfig.reviewStart
        ? "reviewStart"
        : gameConfig.winnersAnnounced
        ? "winnersAnnounced"
        : ""
    );

  return (
    <Link
      to={to}
      className={s.card}
      {...(disabled && {
        "aria-disabled": true,
        onClick: (e) => e.preventDefault()
      })}
    >
      <img
        src={img.src}
        alt={img.alt}
        onLoad={(e) => (e.target as HTMLImageElement).classList.add(s.loaded)}
      />
      <h4>{txt}</h4>
    </Link>
  );
};

const mapStateToProps = ({
  gameConfig
}: {
  gameConfig: GameConfigReduxState;
}) => ({ gameConfig });

export default connect(mapStateToProps, null)(MapNavigation);
