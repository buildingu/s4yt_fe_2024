import { useState } from "react";

interface Props
  extends React.ComponentProps<"select">,
    React.PropsWithChildren<{}> {}

const Select: React.FC<Props> = ({ children, ...options }) => {
  const [focus, toggleFocused] = useState(false);

  return (
    <select
      id="education"
      name="education_id"
      data-focused={focus}
      onClick={() => toggleFocused(!focus)}
      onBlur={() => toggleFocused(false)}
      {...options}
    >
      {children}
    </select>
  );
};

export default Select;
