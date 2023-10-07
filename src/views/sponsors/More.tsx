import { useState, useRef } from "react";
import { connect } from "react-redux";
import s from "./styles.module.css";

interface Props {
  clicked: {
    more: boolean;
    quizDone: boolean;
  };
  setClicked: React.Dispatch<
    React.SetStateAction<{
      more: boolean;
      quizDone: boolean;
    }>
  >;
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
];

const More: React.FC<Props> = ({ clicked, setClicked }) => {
  const formRef = useRef<HTMLFormElement>(null),
    [score, setScore] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalScore = 0,
      error = false;
    const form = formRef.current;

    if (form) {
      for (let i = 0; i < questions.length; i++) {
        const selectedTrue = form.elements[`true${i}`] as HTMLInputElement,
          selectedFalse = form.elements[`false${i}`] as HTMLInputElement;

        if (!selectedTrue.checked && !selectedFalse.checked) {
          error = true;
          alert("Please complete the quiz.");
          break;
        } else if (
          (questions[i] && selectedTrue.checked) ||
          (!questions[i] && selectedFalse.checked)
        ) {
          finalScore++;
        }
      }
    }

    setScore(finalScore);
    console.log("score", score);
    !error && setClicked({ ...clicked, quizDone: true });
  };

  return (
    <div className={s.more}>
      <div className={s.title}>
        <h2>Update Profile Info</h2>
        <p aria-label="Help">Answer all 10 quests for more doblons</p>
      </div>
      <p aria-label="True">T</p> <p aria-label="False">F</p>
      <form className={s.quiz} ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <ol className={s.viewed}>
          {questions.map((question, i) => (
            <li key={i}>
              <input type="radio" name={`true${i}`} className="true" />
              <input type="radio" name={`false${i}`} className="false" />
              <p>{question.txt}</p>
            </li>
          ))}
        </ol>
        <button type="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(More);
