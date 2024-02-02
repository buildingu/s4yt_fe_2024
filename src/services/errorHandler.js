import history from "@utils/History";

export default (func, error) => {
  console.error(`${func} Request ERROR:\n`, error);
  history.push("/error-500");
};

export const showError = (res, dispatch, customMessage) => {
  dispatch(
    addNotification({
      error: true,
      content:
        res.errors && Object.keys(res.errors).length
          ? res.errors[Object.keys(res.errors)[0]][0]
          : res.message
          ? res.message
          : customMessage
          ? customMessage
          : "Unexpected Error",
      close: false,
      duration: 0,
    })
  );
};
