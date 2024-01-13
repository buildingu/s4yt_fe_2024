import history from "@utils/History";

export default (func, error) => {
  console.error(`${func} Request ERROR:\n`, error);
  history.push("/error-500");
};
