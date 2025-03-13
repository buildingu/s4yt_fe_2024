import { useState } from "react";

import s from "./styles.module.css";
import ModalTemplate from "../../ModalTemplate";

interface Props extends React.ComponentProps<"button"> {}

const ChallengeInstructionsModal: React.FC<Props> = ({ ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        aria-expanded={show}
        aria-controls="modal"
        onClick={() => setShow(true)}
        {...props}
      />
      <ModalTemplate
        show={show}
        setShow={setShow}
        height={448}
        label="Challenge Submission Instructions"
      >
        <div className={s.container}>
          <ul>
            <li>Create a separate google doc for each challenge</li>
            <li>Set the sharing to "anyone with the link" can "view"</li>
            <li>Add the content you wish to submit; including text, links, and images</li>
            <li>Do not add your name or any identifying info</li>
            <li>Copy and paste your google doc link into the input above and press submit</li>
            <li>That's it!</li>
          </ul>
        </div>
      </ModalTemplate>
    </>
  );
};

export default ChallengeInstructionsModal;
