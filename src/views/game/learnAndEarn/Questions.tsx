import type { Dispatch } from "redux";
import type { QuizChestGrouping } from "@reducers/game";

import { useState, useLayoutEffect, useEffect } from "react";
import { connect } from "react-redux";

import { sendLearnAndEarnCoins } from "@actions/game";

import s from "./styles.module.css";

interface Props {
  selectedChest: { id: string; quiz: QuizChestGrouping };
  setSelectedChest: React.Dispatch<
    React.SetStateAction<{
      id: string;
      quiz: QuizChestGrouping;
    } | null>
  >;
  sendLearnAndEarnCoins: (chest_id: string, amount: number) => Promise<void>;
}

const Questions: React.FC<Props> = ({
  selectedChest,
  setSelectedChest,
  sendLearnAndEarnCoins
}) => {
  const [mobileBreakpoint, setMobileBreakpoint] = useState(false);

  const [chest, setChest] = useState<{
    img: HTMLImageElement | null;
    opened: boolean;
  }>({ img: null, opened: false });

  const [stage, setStage] = useState({ iteration: 0, process: false }),
    currentSet = selectedChest.quiz[stage.iteration - 1];

  const [earned, setEarned] = useState({ iteration: 3, final: 0, processing: false });

  const onAnswerSelected = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    choices: "a" | "b" | "c",
    answer: Omit<QuizChestGrouping[number]["answers"], "choices">
  ) => {
    const target = e.currentTarget;

    if (choices === answer.correct) {
      setStage((prev) => ({ ...prev, process: true }));
    } else {
      setEarned((prev) => ({ ...prev, iteration: prev.iteration - 1 }));

      // We can't really load this gif like the chest, so I directly change the image. They'll see it or not, that's all I can do.
      target.style.background = `url("/images/learnAndEarn/splash.gif?key=${Date.now().toString()}") no-repeat center center/cover`;
      target.childNodes.forEach((text) => (text as HTMLElement).style.opacity = "0");
      setTimeout(() => {
        target.style.opacity = "0";
        target.style.background = `url("/images/learnAndEarn/bubble.png") no-repeat center center/cover`;
      }, 275);
    }

    target.setAttribute("aria-checked", "true");
  };

  /** 
   * For the gif to always start from the beginning, a unique query parameter `key=${Date.now()}` is added
   * to the image src. This doesn't let the browser cache the gif and playing it from a midway point. We 
   * also need to ensure that it's loaded so they can see it open. The other useEffect below doesn't let 
   * the gif repeat.
   */
  useLayoutEffect(() => {
    const img = new Image();
    img.src = `/images/learnAndEarn/chest.gif?key=${Date.now().toString()}`;
    
    img.onload = () => setChest((prev) => ({ ...prev, img }));
    img.onerror = () => setChest((prev) => ({ ...prev, img, opened: true }));
  }, []);
  useEffect(() => {
    if (chest.img && !chest.opened) {
      const duration = setTimeout(() => {
        setChest((prev) => ({ ...prev, opened: true }));
      }, 600);
      return () => clearTimeout(duration);
    }
  }, [chest.img]);

  /**
   * Waits till process (explanation showing) is over to go to the next stage.
   */
  useEffect(() => {
    if (!stage.process && stage.iteration < 4) {
      setStage((prev) => ({ ...prev, iteration: prev.iteration + 1 }));
    }
  }, [stage.process]);

  /**
   * Resets earned state for the next iteration and on the final iteration (3) it sends the user's 
   * earnings to the server.
   */
  useEffect(() => {
    if (stage.iteration > 1) {
      setEarned((prev) => {
        const update = {
          ...prev,
          iteration: 3,
          final: prev.final + prev.iteration
        };
        if (stage.iteration === 4) {
          setEarned((pre) => ({ ...pre, processing: true }));
          sendLearnAndEarnCoins(selectedChest.id, update.final).finally(() =>
            setSelectedChest(null)
          );
        }

        return update;
      });
    }
  }, [stage.iteration]);

  /**
   * Opacity/checked resets and extra padding if bubble text is overflowing.
   */
  useEffect(() => {
    const scrollContainers = document.querySelectorAll<HTMLButtonElement>("div[role=radiogroup] #scroll");

    for (const elem of scrollContainers) {
      const bubble = elem.parentElement! as HTMLButtonElement;
      bubble.style.opacity = "1";
      bubble.setAttribute("aria-checked", "false");
      bubble.childNodes.forEach((text) => (text as HTMLElement).style.opacity = "1");

      const isOverflowing = elem.scrollHeight >= 105;
      if (isOverflowing) elem.style.paddingBottom = "3rem";
      else elem.style.paddingBottom = "0";
    }
  }, [chest.opened, stage.iteration]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 537) {
        setMobileBreakpoint(true);
      } else {
        setMobileBreakpoint(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div aria-live="polite" className={s.questions}>
      <button
        aria-label="Previous Page"
        className="backBtn fade move"
        onClick={() =>  setSelectedChest(null)}
      />

      {!earned.processing && chest.img ? (
        <div
          id="chest"
          className={s.openedChest}
          data-opened={chest.opened}
          {...(!mobileBreakpoint && {
            style: {
              background: chest.opened
                ? `url("/images/learnAndEarn/chest-opened.png") no-repeat center center/cover`
                : `url("${chest.img.src}") no-repeat center center/cover`
            }
          })}
        >
          {(chest.opened || mobileBreakpoint) && currentSet && (
            <>
              <div className={s.content}>
                {stage.process ? (
                  <h2 className={s.correct}>
                    Correct
                  </h2>
                ) : (
                  <h2 className={s.questionTxt}>
                    <div>#{stage.iteration}</div>
                    <div>{currentSet.question}</div>
                  </h2>
                )}
                
                <div role="radiogroup">
                  {chest.opened &&
                    Object.entries(currentSet.answers.choices).map(([letter, answer]) => {
                      const { choices: _, ...selected } = currentSet.answers;

                      return (
                        <button
                          key={letter}
                          role="radio"
                          aria-label={`Answer ${letter}, ${answer}`}
                          aria-checked="false"
                          disabled={stage.process}
                          className={s.question}
                          onClick={(e) => onAnswerSelected(e, letter as any, { ...selected })}
                        >
                          <div>{letter}</div>
                          <div id="scroll">
                            <p>{answer}</p>
                          </div>
                        </button>
                      );
                    })
                  }
                  {mobileBreakpoint && (
                    <img
                      aria-hidden="true"
                      className={s.mobileChest}
                      src={chest.opened ? "/images/learnAndEarn/chest-opened.png" : chest.img.src}
                    />
                  )}

                  {stage.process && (
                    <div className={s.explanation}>
                      <p>{currentSet.answers.explanation}</p>
                      <p>{stage.iteration}/3 Questions</p>
                      <button
                        aria-controls="chest"
                        className="fade move"
                        onClick={() => setStage((prev) => ({ ...prev, process: false }))}
                      >
                        Proceed
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {stage.process && (
                <div className={s.coinPopup}>
                  <div aria-label="Dubl-u-nes Collected" className={s.coin}>
                    <p>{earned.iteration}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <p className={s.loading}>
          {earned.processing ? "Updating your Dubl-u-nes..." : "Just a moment..."}
        </p>
      )}

      {earned.final > 0 && (
        <div aria-label="Total Dubl-u-nes Earned" className={s.coinTotal}>
          <p>{earned.final}</p>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  sendLearnAndEarnCoins: (chest_id: string, amount: number) =>
    dispatch(sendLearnAndEarnCoins(chest_id, amount) as unknown) as Promise<any>
});

export default connect(null, mapDispatchToProps)(Questions);
