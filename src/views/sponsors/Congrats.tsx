import { connect } from "react-redux";
import s from "./styles.module.css";

interface Props {}

const Congrats: React.FC<Props> = ({}) => {
  return <div className={s.congrats}>Hello, go away.</div>;
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Congrats);
