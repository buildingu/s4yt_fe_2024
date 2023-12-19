import { connect } from "react-redux";
import React, { useState, ChangeEvent, FormEvent } from "react";
import s from "./styles.module.css";

const Questions: React.FC = () => {
  const [answer, setAnswer] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className={s.optionsView}>
      <form onSubmit={handleSubmit}>
        <label>
          Question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, sint!"

        </label>
        <textarea
          value={answer}
          onChange={handleInputChange}
          placeholder="Type your answer here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
