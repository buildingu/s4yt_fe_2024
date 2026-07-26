import React from "react";
import { connect } from "react-redux";
import type { GameConfigReduxState } from "@reducers/gameConfig";

import DL_01 from "../../assets/images/NewMap/dl_01.png";
import DL_02 from "../../assets/images/NewMap/dl_02.png";
import DL_03 from "../../assets/images/NewMap/dl_03.png";
import DL_04 from "../../assets/images/NewMap/dl_04.png";
import DL_05 from "../../assets/images/NewMap/dl_05.png";
import DL_06 from "../../assets/images/NewMap/dl_06.png";

import s from "./styles.module.css";

const MapConnectionsAssets: React.FC<{ gameConfig: GameConfigReduxState }> = ({ gameConfig }) => {
  const { preGame, gameStart, reviewStart, winnersAnnounced } = gameConfig;

  const isAtLeastPreGame   = preGame || gameStart || reviewStart || winnersAnnounced;
  const isAtLeastGameStart = gameStart || reviewStart || winnersAnnounced;
  const isAtLeastReview    = reviewStart || winnersAnnounced;

  const lines = [
    { src: DL_01, className: s.dl01, completed: true },                // welcome to free dub:     always green
    { src: DL_02, className: s.dl02, completed: true },                // free dub to refer:       always green
    { src: DL_03, className: s.dl03, completed: isAtLeastPreGame },    // profile to play & get:   pre-game+
    { src: DL_04, className: s.dl04, completed: isAtLeastPreGame },    // play & get to raffle:    pre-game+
    { src: DL_05, className: s.dl05, completed: isAtLeastGameStart },  // raffle to partners:      game start+
    { src: DL_06, className: s.dl06, completed: !!winnersAnnounced },    // partners to wrap up:     review+
  ];

  return (
    <>
      {lines.map((line, i) => (
        <img
          key={i}
          src={line.src}
          alt={`dotted-line-${i + 1}`}
          className={[
            s.dottedLine,
            line.className,
            line.completed ? s.completed : "",
          ].join(" ")}
          draggable={false}
        />
      ))}
    </>
  );
};

const mapStateToProps = ({ gameConfig }: { gameConfig: GameConfigReduxState }) => ({
  gameConfig,
});

export default connect(mapStateToProps)(MapConnectionsAssets);