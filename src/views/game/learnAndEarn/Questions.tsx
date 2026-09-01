import type { Dispatch } from "redux";
import type { QuizChestGrouping } from "@reducers/game";

import { useState, useLayoutEffect, useEffect } from "react";
import { connect } from "react-redux";

import { sendLearnAndEarnCoins } from "@actions/game";

import s from "./styles.module.css";

interface Props {
  selectedChest: { id: string; quiz: QuizChestGrouping };
  setSelectedChest: React.Dispatch <
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

  const [eliminatedLetters, setEliminatedLetters] = useState<Set<string>>(new Set());
  const [showSplash, setShowSplash] = useState(false);
  // tracks which letter was clicked to show the bubble preview
  const [previewAnswer, setPreviewAnswer] = useState<{
    letter: string;
    text: string;
    selected: Omit<QuizChestGrouping[number]["answers"], "choices">;
  } | null>(null);

const handleSelectAnswer = () => {
  if (!previewAnswer) return;

  const { letter, selected } = previewAnswer;
  const isCorrect = letter === selected.correct;

  // Correct answer: no splash
  if (isCorrect) {
    setPreviewAnswer(null);
    setStage((prev) => ({
      ...prev,
      process: true,
    }));
    return;
  }

  // Wrong answer: show splash first
  setShowSplash(true);

  setTimeout(() => {
    setShowSplash(false);
    setPreviewAnswer(null);

    setEarned((prev) => ({
      ...prev,
      iteration: prev.iteration - 1,
    }));

    setEliminatedLetters((prev) => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });
  }, 275);
};

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

  useEffect(() => {
    if (!stage.process && stage.iteration < 4) {
      setStage((prev) => ({ ...prev, iteration: prev.iteration + 1 }));
    }
  }, [stage.process]);

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

  useEffect(() => {
    setPreviewAnswer(null);
    setEliminatedLetters(new Set());
  }, [stage.iteration]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setMobileBreakpoint(window.innerWidth <= 537);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div aria-live="polite" className={s.questions}>
      <button
        aria-label="Previous Page"
        className="backBtn fade move"
        onClick={() => setSelectedChest(null)}
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
                  <h2 className={s.correct}>Correct</h2>
                ) : (
                  <h2 className={s.questionTxt}>
                    <div>#{stage.iteration}</div>
                    <div>{currentSet.question}</div>
                  </h2>
                )}

                <div role="radiogroup">
                  {chest.opened && !previewAnswer &&
                    Object.entries(currentSet.answers.choices)
                      .filter(([letter]) => !eliminatedLetters.has(letter)) // ← add this
                      .map(([letter, answer]) => {
                        const { choices: _, ...selected } = currentSet.answers;
                        return (
                          <button
                            key={letter}
                            role="radio"
                            aria-label={`Answer ${letter}`}
                            aria-checked="false"
                            disabled={stage.process}
                            className={s.letterBtn}
                            onClick={() => {
                              setPreviewAnswer({
                                letter,
                                text: answer as string,
                                selected,
                              });
                            }}
                          >
                            {letter.toUpperCase()}
                          </button>
                        );
                      })
                  }

                  {/* Bubble preview: shows when a letter is clicked */}
                  {previewAnswer && (
                    <div
                      className={s.bubblePreview}
                      style={
                        showSplash
                          ? {
                              background: `url("/images/learnAndEarn/splash.gif?key=${Date.now()}") no-repeat center center/cover`,
                            }
                          : undefined
                      }
                    >
                      {!showSplash && (
                        <div className={s.bubbleContent}>
                          <p className={s.bubbleLetter}>
                            {previewAnswer.letter.toUpperCase()}
                          </p>

                          <p className={s.bubbleText}>
                            {previewAnswer.text}
                          </p>

                          <div className={s.bubbleActions}>
                            <button
                              className={s.goBackBtn}
                              onClick={() => setPreviewAnswer(null)}
                            >
                              Go Back
                            </button>

                            <button
                              className={s.selectBtn}
                              onClick={handleSelectAnswer}
                            >
                              Select as Answer
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

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