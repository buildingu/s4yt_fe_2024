import { connect } from "react-redux";
import React, { useState, ChangeEvent, FormEvent } from "react";
import s from "./styles.module.css";
import ChallengeModal from "@root/components/modals/challengeModal/ChallengeModal";

interface Props {
  playerCheck: any;
  data: {
    title: string;
    content: string;
    submissionCount: number;
  }
}

const Questions: React.FC<Props> = ({ playerCheck, data }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [answer, setAnswer] = useState<string>("");
  console.log(data)
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleAttach = () => {
    
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
          View challenge here: <ChallengeModal data={data} />
        </label>
        <textarea
          value={answer}
          onChange={handleInputChange}
          placeholder="Type your answer here"
          disabled={playerCheck}
        />
        <div className={s.formButtons}>
          <button
            disabled={playerCheck}
            className={s.questionAttach}
            onClick={handleAttach}
          >
          <i className="fas fa-paperclip"></i>
          </button>
          <button
            disabled={playerCheck}
            className={s.questionSave}
            onClick={handleSave}
          ></button>
          <button
            disabled={playerCheck}
            className={s.questionSubmit}
            type="submit"
          ></button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
