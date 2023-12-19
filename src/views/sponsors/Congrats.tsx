import { Link } from "react-router-dom";
import { connect } from "react-redux";
import s from "./styles.module.css";

interface Props {
  setClicked: React.Dispatch<
    React.SetStateAction<{
      more: boolean;
      quizDone: boolean;
    }>
  >;
  setQuizComplete: React.Dispatch<React.SetStateAction<{
    complete: boolean,
    results: boolean
  }>>;
  finalScore: string;
}

const Congrats: React.FC<Props> = ({
  finalScore,
  setClicked,
  setQuizComplete,
}) => {
  return (
    <div className={s.congrats}>
      <h2>Congratulations</h2>
      <div data-score={finalScore}>
        <p>
          Doblons have been added <br />
          to your account
        </p>
      </div>
      {/* button test to show results */}
      <button onClick={() => setQuizComplete({complete: true, results: true})}>see results</button>
      <Link to="/raffle" className={`${s.moreBtn} fade move`} />
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Congrats);
