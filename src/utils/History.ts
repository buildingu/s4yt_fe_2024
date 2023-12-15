// import { useNavigate } from "react-router-dom";

// const history = {
//   navigate: useNavigate(),
//   push: (page: string, ...rest: any) => history.navigate(page, ...rest),
// };

// export default history;

import { useNavigate, NavigateFunction } from "react-router-dom";

export let navigate: NavigateFunction;

// This is just something I am trying.
const History = () => {
  // setTimeout(() => {
  navigate = useNavigate();

  return null;
  // }, 1000);
};

export default History;
