import { addNotification } from "@actions/notifications";
import history from "@utils/History";

const GENERAL_ERROR_MESSAGE = "An unexpected server occurred.";

export default (func, error, navigate = true) => {
  console.error(`${func} Request ERROR:\n`, error);
  if (navigate) history.push("/error-500");
};

/**
 * @param {string} [customMessage] Only used for critical errors (500).
 */
export const showError = (data, status, dispatch, customMessage) => {
  const errorMsg =
    status >= 500
      ? customMessage || GENERAL_ERROR_MESSAGE
      : data.message || GENERAL_ERROR_MESSAGE;

  dispatch(
    addNotification({
      error: true,
      content: errorMsg,
      close: false,
      duration: 0
    })
  );
};
