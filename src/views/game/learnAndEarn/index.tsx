import type { UserReduxState } from "@reducers/user";
import type { GameReduxState, QuizChestGrouping } from "@reducers/game";
import type UserCredentials from "@typings/UserCredentials";

import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getLearnAndEarnChests } from "@actions/game";
import { isNotPlayer } from "@actions/user";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Image from "@components/Image";
import Questions from "./Questions";

import s from "./styles.module.css";

interface PlayerProps {
  chests: GameReduxState["quizChests"];
  chestsSubmitted: UserCredentials["chests_submitted"];
  getLearnAndEarnChests: () => Promise<void>;
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
}

const handleHover = (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
    const img = e.currentTarget.firstChild!.firstChild as HTMLImageElement;
    if (img.complete) img.src = "/images/learnAndEarn/chest-half.png";
  },
  handleBlur = (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
    const elem = e.currentTarget.firstChild!.firstChild as HTMLImageElement;
    elem.src = elem.dataset.imgSrc!;
  };

const LearnAndEarn: React.FC<PlayerProps> = ({
  chests,
  chestsSubmitted,
  getLearnAndEarnChests,
  isNotPlayer
}) => {
  const [selectedChest, setSelectedChest] = useState<{ id: string; quiz: QuizChestGrouping } | null>(null),
    [isAnyCompleted, setIsAnyCompleted] = useState(false);

  const handleIsAnyCompleted = (elem: HTMLButtonElement | null) => {
    if (elem && elem.disabled !== undefined) setIsAnyCompleted(true);
  };

  useLayoutEffect(() => {
    if (!chests.length) getLearnAndEarnChests();
  }, []);
  
  return (
    <Layout>
      <Header title="Learn and Earn" />
      <Content
        addCoins="coins3"
        addFeather="left"
        className={s.base}
        data-selected-chest={!!selectedChest}
        data-is-any-completed={isAnyCompleted}
      >
        {selectedChest ? (
          <Questions selectedChest={selectedChest} setSelectedChest={setSelectedChest as any} />
        ) : (
          <div aria-live="polite" className={s.learn} data-is-any-completed={isAnyCompleted}>
            <h2>Open Up One of the Treasure Chests</h2>

            {chests.length ? (
              <ul>
                {chests.map((chestGroup, i) => {
                  const imgSrc = `/images/learnAndEarn/${
                    chestsSubmitted[chestGroup.chest_id] ? "chest-golden" : "chest-closed"
                  }.png`;

                  return (
                    <li key={i} className={s.chest}>
                      <button
                        ref={handleIsAnyCompleted}
                        className={`${s.chest} fade`}
                        disabled={chestsSubmitted[chestGroup.chest_id]}
                        onClick={() => {
                          if (isNotPlayer(true, "Only players can win more dubl-u-nes")) return;
                          setSelectedChest({ id: chestGroup.chest_id, quiz: chestGroup.group });
                        }}
                        onMouseEnter={handleHover}
                        onFocus={handleHover}
                        onMouseLeave={handleBlur}
                        onBlur={handleBlur}
                        {...(isNotPlayer() && { style: { cursor: "not-allowed" } })}
                      >
                        <Image
                          data-img-src={imgSrc}
                          src={imgSrc}
                          alt={`Treasure Chest${chestsSubmitted[chestGroup.chest_id] ? " " + "Completed" : ""}`}
                        />
                      </button>
                      {chestsSubmitted[chestGroup.chest_id] && (
                        <Image
                          src="/images/learnAndEarn/coin.png"
                          alt={`${chestsSubmitted[chestGroup.chest_id]} Earned`}
                          className={s.earned}
                          containerProps={{ "data-earned": chestsSubmitted[chestGroup.chest_id] }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className={s.loading}>Just a moment...</p>
            )}

            {isAnyCompleted && <Link className={`fade ${s.spend}`} to="/raffle" />}
          </div>
        )}
      </Content>
      <Status className={s.status} />
    </Layout>
  );
};

const mapStateToProps = ({ game, user }: { game: GameReduxState; user: UserReduxState }) => ({
  chests: game.quizChests,
  chestsSubmitted: user.credentials?.chests_submitted || {}
});
const mapDispatchToProps = (dispatch: any) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message)),
  getLearnAndEarnChests: () => dispatch(getLearnAndEarnChests())
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnAndEarn);
