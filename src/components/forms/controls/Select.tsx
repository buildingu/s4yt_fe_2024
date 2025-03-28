import { useState } from "react";
import warning from "@static/warning.svg";

interface Props extends React.ComponentProps<"select"> {
  id: string;
  name: string;
}

const Select: React.FC<Props> = ({ children, id, name, ...options }) => {
  const [focus, toggleFocused] = useState(false);

  return (
    <div className="inputContainer select">
      <select
        id={id}
        name={name}
        data-focused={focus}
        onClick={() => toggleFocused(!focus)}
        onBlur={() => toggleFocused(false)}
        {...options}
      >
        {children}
      </select>
      <img src={warning} alt="Warning" className="warningIcon" />
    </div>
  );
};

export default Select;
