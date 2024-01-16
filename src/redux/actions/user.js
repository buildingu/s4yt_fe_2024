import { SET_CURRENT_USER, SET_TOKEN, LOGOUT } from "@actions/index";
import { addNotification } from "./notifications";
import { Api } from "@services/index";
import errorHandler from "@services/errorHandler";

// TODO: Put all logic in here like this.
export const registerPlayer =
  (userData, formRef, setForm) => async (dispatch, getState) => {
    try {
      const res = await Api.post("/register", userData);

      if (!res.errors) {
        formRef.current.reset();
        dispatch(
          addNotification({
            error: false,
            content:
              "Thank you for registering! To complete the process, please check your inbox to verify\
               your email. In case you don't find it there, please check your spam folder.",
            close: false,
            duration: 0,
          })
        );
      } else {
        const key = Object.keys(res.errors)[0];

        dispatch(
          addNotification({
            error: true,
            content: res.errors[key],
            close: false,
            duration: 0,
          })
        );
      }
      return res;
    } catch (error) {
      errorHandler("registerPlayer", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };
export const sendVerifyEmail = (email) => (dispatch, getState) => {
  return Api.post("/email/verify", { email }).catch((error) =>
    errorHandler("sendVerifyEmail", error)
  );
};

export const loginPlayer = (userData) => (dispatch, getState) => {
  return Api.post("/login", userData).catch((error) =>
    errorHandler("loginPlayer", error)
  );
};
export const setCurrentUser = (userData) => (dispatch, getState) => {
  dispatch({ type: SET_CURRENT_USER, payload: userData });
};
export const setToken = (token) => (dispatch, getState) => {
  dispatch({ type: SET_TOKEN, payload: token });
};
export const logoutPlayer = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT });
};

export const sendResetPasswordEmail =
  (email, formRef, setForm) => async (dispatch, getState) => {
    try {
      const res = await Api.post("/email/reset", email);

      if (res.success) {
        formRef.current.reset();
        dispatch(
          addNotification({
            error: false,
            content:
              "Success! Check your inbox to reset your password. In case you don't find it there,\
               please check your spam folder.",
            close: false,
            duration: 0,
          })
        );
        setForm((prev) => ({ ...prev, success: true }));
      } else {
        dispatch(
          addNotification({
            error: true,
            content: res.message,
            close: false,
            duration: 0,
          })
        );
      }
      return res;
    } catch (error) {
      errorHandler("sendResetPasswordEmail", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };
export const resetPassword = (userData) => (dispatch, getState) => {
  return Api.post("/password", userData).catch((error) =>
    errorHandler("resetPassword", error)
  );
};
export const updatePassword = (userData) => (dispatch, getState) => {
  return Api.post("/player/password", userData).catch((error) =>
    errorHandler("updatePassword", error)
  );
};
export const updateProfile =
  (userData, formRef, setForm) => async (dispatch, getState) => {
    console.log("getState()", getState());
    try {
      const res = await Api.post("/player/profile", userData);

      if (!res.errors) {
        formRef.current.reset();
        dispatch(
          addNotification({
            error: false,
            content: "Your profile was successfully updated ✔",
            close: false,
            duration: 4000,
          })
        );
      } else {
        const key = Object.keys(res.errors)[0];

        dispatch(
          addNotification({
            error: true,
            content: res.errors[key],
            close: false,
            duration: 0,
          })
        );
      }

      if (res.success && res.data.verify_email) {
        dispatch(logoutPlayer());
        dispatch(
          addNotification({
            error: false,
            content:
              "Since you updated your email address, you now have to verify your new email address.\
               So, please check your inbox to verify your email. In case you don't find it there, please\
               check your spam folder.",
            close: false,
            duration: 0,
          })
        );
      }

      return res;
    } catch (error) {
      errorHandler("updatePassword", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };

export const getReferrals = (setReferrals) => (dispatch, getState) => {
  return Api.get("/player/referrals")
    .then((res) => {
      console.log("res", res);

      if (res.success) {
        !res.data.referrals.length
          ? setReferrals("No referrals has been used yet")
          : setReferrals(res.data.referrals);
      } else {
        dispatch(
          addNotification({
            error: true,
            content:
              "Unexpected server error occurred getting your resent referrals.",
            close: false,
            duration: 0,
          })
        );
      }
    })
    .catch((error) => errorHandler("getReferrals", error));
};
