import { SET_TOKEN, SET_NEW_LOGIN_FLAG, LOGOUT } from "@actions/index";

import history from "@utils/History";

import { Api } from "@services/index";
import errorHandler from "@services/errorHandler";

import { addNotification } from "./notifications";
import { updateConfiguration } from "./gameConfig";

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
export const sendVerifyEmail =
  (email, formRef, setForm) => async (dispatch, getState) => {
    try {
      const res = await Api.post("/email/verify", { email });

      if (res.success) {
        formRef.current.reset();
        dispatch(
          addNotification({
            error: false,
            content:
              "Lastly, to complete the registration process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
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
      errorHandler("sendVerifyEmail", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };

// export const setToken = (token) => (dispatch, getState) => {
//   dispatch({ type: SET_TOKEN, payload: token });
// };
// export const setCurrentUser = (userData) => (dispatch, getState) => {
//   dispatch({ type: SET_CURRENT_USER, payload: userData });
// };
// TODO: I don't know how I will determine if it's review_start.
export const loginPlayer =
  (userData, setForm) => async (dispatch, getState) => {
    try {
      const res = await Api.post("/login", userData);

      if (res.success) {
        const data = res.data,
          user = res.data.user;

        // For if the countdown is a message when the game ended, haven't started, etc.
        if (!data.countdown.split(":").length)
          dispatch(
            addNotification({
              error: true,
              content: data.countdown,
              close: false,
              duration: 0,
            })
          );

        dispatch({ type: SET_TOKEN, payload: data.token });
        if (
          user.is_backup &&
          (!user.password_updated || !user.profile_updated)
        ) {
          !user.password_updated &&
            dispatch(
              addNotification({
                error: true,
                content: `Your password needs to be updated, please update you password in the "Update Password" section.`,
                close: false,
                duration: 0,
              })
            );
          !user.profile_updated &&
            dispatch(
              addNotification({
                error: true,
                content: `There is some discrepancies within your profile data, please check you profile data and update it in the "Update Profile Info" section.`,
                close: false,
                duration: 0,
              })
            );

          dispatch(updateConfiguration({ restrictedAccess: true })); // Only allowed to profile.
          history.push("/profile");
        } else {
          history.push("/");
        }

        dispatch({ type: SET_NEW_LOGIN_FLAG, payload: data });

        // console.log("res.data", res.data);
        dispatch(
          addNotification({
            error: false,
            content: `Welcome ${data.user.name} ✔`,
            close: false,
            duration: 4000,
          })
        );
      } else {
        // Does not have validated email message.
        if (res.message.includes("validated"))
          history.push("/register/verify-email");

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
      errorHandler("loginPlayer", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };
export const logoutPlayer = () => (dispatch, getState) => {
  dispatch({ type: LOGOUT });
  alert("User session timed out.");
};
// export const isPlayer = () => (dispatch, getState) => {
//   return getState().user.credentials?.roles.includes("player");
// };
export const isNotPlayer =
  (useNotification, message) => (dispatch, getState) => {
    if (!getState().user.credentials?.roles.includes("player")) {
      useNotification &&
        dispatch(
          addNotification({
            error: true,
            content: message
              ? message
              : "Players only have access to this feature",
            close: false,
            duration: 4000,
          })
        );
      return true;
    }

    return false;
  };

export const sendResetPasswordEmail =
  (email, formRef, setForm) => async (dispatch, getState) => {
    try {
      const res = await Api.post("/email/reset", { email });

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
  return Api.patch("/password", userData).catch((error) =>
    errorHandler("resetPassword", error)
  );
};
export const updatePassword = (userData) => (dispatch, getState) => {
  return Api.patch("/player/password", userData).catch((error) =>
    errorHandler("updatePassword", error)
  );
};
export const updateProfile =
  (userData, formRef, setForm) => async (dispatch, getState) => {
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
      errorHandler("updateProfile", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };

export const getReferrals = (setReferrals) => (dispatch, getState) => {
  return Api.get("/player/referrals")
    .then((res) => {
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
