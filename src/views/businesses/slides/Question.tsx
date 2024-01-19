import { connect } from "react-redux";
import React, { useState, ChangeEvent, FormEvent } from "react";
import s from "./styles.module.css";

interface Props {
  playerCheck: any;
}

const Questions: React.FC<Props> = ({ playerCheck }) => {
  const [answer, setAnswer] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleDelete = () => {
    setAnswer("");
  };
  const handleSave = () => {
    console.log("saved");
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className={s.optionsView}>
      <form onSubmit={handleSubmit}>
        <label>
          Question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Eveniet, sint!"
        </label>
        <textarea
          value={answer}
          onChange={handleInputChange}
          placeholder="Type your answer here"
          disabled={playerCheck}
        />
        <div className={s.formButtons}>
          <button disabled={playerCheck} className={s.questionSave} onClick={handleSave}></button>
          <button disabled={playerCheck} className={s.questionDelete} onClick={handleDelete}></button>
          <button disabled={playerCheck} className={s.questionSubmit} type="submit"></button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
