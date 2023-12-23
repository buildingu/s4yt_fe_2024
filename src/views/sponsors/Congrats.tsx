import { Link } from "react-router-dom";
import { connect } from "react-redux";
import s from "./styles.module.css";
import { useEffect, useState } from "react";

interface Props {
  setClicked: React.Dispatch<
    React.SetStateAction<{
      more: boolean;
      quizDone: boolean;
    }>
  >;
  setQuizComplete: React.Dispatch<
    React.SetStateAction<{
      complete: boolean;
      results: boolean;
    }>
  >;
  finalScore: string;
  correctAnswers: number;
}

const Congrats: React.FC<Props> = ({
  finalScore,
  setClicked,
  setQuizComplete,
  correctAnswers,
}) => {
  const [congratsMessage, setCongratsMessage] = useState({
    message: "",
    followUp: "",
  });

  useEffect(() => {
    if (correctAnswers === 10) {
      setCongratsMessage({
        message: "You rocked it!",
        followUp: "perfect score!",
      });
    } else if (correctAnswers < 10 && correctAnswers >= 8) {
      setCongratsMessage({ message: "Way to go!", followUp: "correct!" });
    } else if (correctAnswers <= 7 && correctAnswers >= 5) {
      setCongratsMessage({ message: "Nice try!", followUp: "correct!" });
    } else if (correctAnswers <= 4 && correctAnswers >= 0) {
      setCongratsMessage({
        message: "Darn!",
        followUp: "correct... but you still get Dubl-U-nes!",
      });
    }
  }, [correctAnswers]);

  return (
    <div className={s.congrats}>
      <h2>
        {congratsMessage.message} {correctAnswers}/10 {congratsMessage.followUp}
      </h2>

      <div data-score={finalScore}>
        <p>
          Doblons have been added <br />
          to your account
        </p>
      </div>
      {/* button test to show results */}
      <div className={s.congratsBtns}>
        <button
          onClick={() => setQuizComplete({ complete: true, results: true })}
        >
          see results
        </button>
        <Link to="/raffle" className={`${s.moreBtn} fade move`} />
      </div>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Congrats);
