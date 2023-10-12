import { Link } from "react-router-dom";
import { connect } from "react-redux";
import s from "./styles.module.css";

interface Props {
  finalScore: string;
}

const Congrats: React.FC<Props> = ({ finalScore }) => {
  return (
    <div className={s.congrats}>
      <h2>Congratulations</h2>
      <div data-score={finalScore}>
        <p>Doblons have been added to your account</p>
      </div>
      <Link to="/raffle" className={`${s.moreBtn} ${"fade"} ${"move"}`} />
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Congrats);
