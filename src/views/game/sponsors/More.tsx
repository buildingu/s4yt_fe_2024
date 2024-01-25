import { useRef, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { quizQuestions } from "@constants/temporaryDb/sponsors";

import Congrats from "./Congrats";

import s from "./styles.module.css";

interface Props {
  setClicked: React.Dispatch<
    React.SetStateAction<{
      more: boolean;
      quizDone: boolean;
    }>
  >;
  scoreRef: React.MutableRefObject<string>;
}

const More: React.FC<Props> = ({ setClicked, scoreRef }) => {
  const [quizComplete, setQuizComplete] = useState({
    complete: false,
    results: true,
  });

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizComplete.complete) {
      let correctCount = 0;
      let finalScore = 0,
        error = false;
      const form = formRef.current;

      // prettier-ignore
      if (form) {
        for (let i = 0; i < quizQuestions.length; i++) {
          const selectedTrue = form.elements[`true${i}` as any] as HTMLInputElement;
          const selectedFalse = form.elements[`false${i}` as any] as HTMLInputElement;
  
          if (!selectedTrue.checked && !selectedFalse.checked) {
            error = true;
            alert("Please complete the quiz.");
            break;
          } else if (
            (quizQuestions[i].answer === true && selectedTrue.checked) ||
            (quizQuestions[i].answer === false && selectedFalse.checked)
          ) {
            finalScore++;
            correctCount++
          }
        }
      }
      if (finalScore !== 0) {
        if (finalScore <= 4) {
          finalScore = 2;
        } else if (finalScore <= 7) {
          finalScore = 5;
        } else if (finalScore <= 9) {
          finalScore = 9;
        } else {
          finalScore = 15;
        }
      }

      scoreRef.current = finalScore.toString();
      setCorrectAnswers(correctCount);
      !error && setQuizComplete({ complete: true, results: false });
      !error && setClicked({ more: true, quizDone: true });
    }
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (e.target.checked) {
      const isTrueRatio = e.target.name.startsWith("true");
      console.log(e.target.value);
      const otherRadioName: any = isTrueRatio ? `false${i}` : `true${i}`,
        otherInput = formRef.current?.elements[
          otherRadioName
        ] as HTMLInputElement;

      if (otherInput && otherInput.checked) otherInput.checked = false;
    }
  };

  // FIXME: The quiz results doesn't work right, if they press the button without completing the full quiz, it shows the results.
  // And I don't know why you did everything in the map when you could of got it from handleSubmit.
  return (
    <div className={`${s.more} ${!quizComplete.results ? s.hideContent : ""}`}>
      {quizComplete.complete && !quizComplete.results && (
        <Congrats
          finalScore={scoreRef.current}
          setClicked={setClicked}
          setQuizComplete={setQuizComplete}
          correctAnswers={correctAnswers}
        />
      )}
      <div className={s.title}>
        <h2>The More You Know</h2>
        <p aria-label="Help">Answer all 10 quests for more Dubl-u-nes</p>
      </div>
      <div className={s.trueFalse}>
        <p aria-label="True">T</p> <p aria-label="False">F</p>
      </div>
      <form className={s.quiz} ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <ol>
          {quizQuestions.map((question, i) => {
            const index = i;
            // similar to the onRadioChange, this compares
            const selectedTrue = formRef.current?.elements[
              `true${i}` as any
            ] as HTMLInputElement;
            const selectedFalse = formRef.current?.elements[
              `false${i}` as any
            ] as HTMLInputElement;
            const isTrueSelected = selectedTrue?.checked ?? false;
            const isFalseSelected = selectedFalse?.checked ?? false;
            const isIncorrect =
              (isTrueSelected && !question.answer) ||
              (isFalseSelected && question.answer);
            const isCorrect =
              (isTrueSelected && question.answer) ||
              (isFalseSelected && !question.answer);

            const linkQuestion =
              question.explanation.includes("https://") &&
              question.explanation.split(": ");
            console.log("linkQuestion", linkQuestion);
            return (
              <li key={i}>
                <div className={s.inputs}>
                  <input
                    type="radio"
                    name={`true${i}`}
                    className="true"
                    onChange={(e) => onRadioChange(e, index)}
                    value={"true"}
                    disabled={quizComplete.complete}
                  />
                  <input
                    type="radio"
                    name={`false${i}`}
                    className="false"
                    onChange={(e) => onRadioChange(e, index)}
                    value={"false"}
                    disabled={quizComplete.complete}
                  />
                </div>
                <p>{question.question}</p>
                {quizComplete && (
                  <p
                    className={s[`explanation${isCorrect ? "Right" : "Wrong"}`]}
                  >
                    {isCorrect ? "That's right! " : "Not quite, "}
                    {linkQuestion ? (
                      <>
                        {linkQuestion[0]}
                        {": "}
                        <a
                          className="fade move"
                          href={linkQuestion[1]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {linkQuestion[1]}
                        </a>
                      </>
                    ) : (
                      question.explanation
                    )}
                  </p>
                )}
                {/* {quizComplete && isIncorrect ? (
                  <p className={s.explanationWrong}>
                    Not quite, {question.explanation}
                  </p>
                ) : (
                  quizComplete.complete &&
                  isCorrect && (
                    <p className={s.explanationRight}>
                      That's right! {question.explanation}
                    </p>
                  )
                )} */}
              </li>
            );
          })}
        </ol>
        {!quizComplete.complete && (
          <div>
            <button className="okBtn flip" type="submit" />
          </div>
        )}
      </form>
      {quizComplete.results === true && quizComplete.complete === true && (
        <button
          className={`${s.backBtn} fade move`}
          onClick={() => setClicked({ more: false, quizDone: false })}
        ></button>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(null, mapDispatchToProps)(More);
