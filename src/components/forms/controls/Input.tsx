import warning from "@static/warning.svg";

interface Props extends React.ComponentProps<"input"> {
  id: string;
  name: string;
  type: string;
  errorMsg?: string;
}

const Input: React.FC<Props> = ({ id, name, type, errorMsg, ...options }) => {
  return (
    <div role="presentation" className="inputContainer input">
      <input
        aria-describedby="formError"
        id={id}
        name={name}
        type={type}
        {...options}
      />
      {errorMsg && (
        <small aria-live="assertive" id="formError" className="formError">
          {errorMsg}
        </small>
      )}
      <img src={warning} alt="Warning" className="warningIcon" />
    </div>
  );
};

export default Input;
