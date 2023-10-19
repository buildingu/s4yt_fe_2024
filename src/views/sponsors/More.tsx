import { useRef } from "react";
import { connect } from "react-redux";
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

const questions = [
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: false,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: true,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: true,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: true,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: true,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: false,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: false,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: false,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: false,
  },
  {
    txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar felis sit amet libero pulvinar, id hendrerit quam efficitur.",
    answer: false,
  },
];

const More: React.FC<Props> = ({ setClicked, scoreRef }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalScore = 0,
      error = false;
    const form = formRef.current;

    // prettier-ignore
    if (form) {
      for (let i = 0; i < questions.length; i++) {
        const selectedTrue = form.elements[`true${i}` as any] as HTMLInputElement,
          selectedFalse = form.elements[`false${i}` as any] as HTMLInputElement;

        if (!selectedTrue.checked && !selectedFalse.checked) {
          error = true;
          alert("Please complete the quiz.");
          break;
        } else if (
          (questions[i].answer === true && selectedTrue.checked) ||
          (questions[i].answer === false && selectedFalse.checked)
        ) {
          finalScore++;
        }
      }
    }

    scoreRef.current = finalScore.toString();
    !error && setClicked({ more: false, quizDone: true });
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    if (e.target.checked) {
      const isTrueRatio = e.target.name.startsWith("true");

      const otherRadioName: any = isTrueRatio ? `false${i}` : `true${i}`,
        otherInput = formRef.current?.elements[
          otherRadioName
        ] as HTMLInputElement;

      if (otherInput && otherInput.checked) otherInput.checked = false;
    }
  };

  return (
    <div className={s.more}>
      <div className={s.title}>
        <h2>The More You Know</h2>
        <p aria-label="Help">Answer all 10 quests for more doblons</p>
      </div>
      <div className={s.trueFalse}>
        <p aria-label="True">T</p> <p aria-label="False">F</p>
      </div>
      <form className={s.quiz} ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <ol>
          {questions.map((question, i) => {
            const index = i;

            return (
              <li key={i}>
                <div className={s.inputs}>
                  <input
                    type="radio"
                    name={`true${i}`}
                    className="true"
                    onChange={(e) => onRadioChange(e, index)}
                  />
                  <input
                    type="radio"
                    name={`false${i}`}
                    className="false"
                    onChange={(e) => onRadioChange(e, index)}
                  />
                </div>
                <p>{question.txt}</p>
              </li>
            );
          })}
        </ol>
        <div>
          <button type="submit" />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(More);
