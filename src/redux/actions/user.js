import { Api } from "@services/index";
import errorHandler, { showError } from "@services/errorHandler";

import history from "@utils/History";

import {
  INITIALIZE_SESSION,
  UPDATE_CURRENT_USER,
  LOGOUT,
  // game
  INITIALIZE_COINS,
  CLEAR_GAME,
  // gameConfig
  CLEAR_CURRENT_CONFIG,
  // businesses
  CLEAR_BUSINESSES,
  // winners
  CLEAR_WINNERS
} from "@actions/index";
import { addNotification } from "./notifications";
import { updateConfiguration } from "./gameConfig";

import { socket } from "@services/socket";

export const updateCurrentUser = (data) => (dispatch, _) => {
  dispatch({ type: UPDATE_CURRENT_USER, payload: data });
};

export const registerPlayer =
  (userData, formRef, setForm) => async (dispatch, _) => {
    try {
      const { data, meta } = await Api.post("/auth/register", userData);

      if (meta?.ok) {
        formRef.current.reset();
        dispatch(
          addNotification({
            error: false,
            content:
              "Thank you for registering! To complete the process, please check your inbox to verify\
               your email. In case you don't find it there, please check your spam folder.",
            close: false,
            duration: 0
          })
        );
      } else {
        showError(data, meta.status, dispatch);
      }
    } catch (error) {
      errorHandler("registerPlayer", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };
export const sendVerifyEmail =
  (email, formRef, setForm) => async (dispatch, _) => {
    try {
      const { data, meta } = await Api.post("/auth/email/sendVerification", { email });

      if (meta?.ok) {
        formRef.current.reset();
        dispatch(
          addNotification({
            error: false,
            content:
              "Lastly, to complete the registration process, please check your inbox to verify your email. In case you don't find it there, please check your spam folder.",
            close: false,
            duration: 0
          })
        );
        setForm((prev) => ({ ...prev, success: true }));
      } else {
        showError(data, meta.status, dispatch);
      }
    } catch (error) {
      errorHandler("sendVerifyEmail", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };
export const verifyEmail =
  (token, setResult) => async (dispatch, _) => {
    try {
      const res = await Api.post("/auth/email/verify", { token });

      if (res?.meta?.ok) {
        dispatch(
          addNotification({
            error: false,
            content: res.data.message,
            close: false,
            duration: 0
          })
        );
      } else {
        showError(res.data, res.meta.status, dispatch);
      }
      setResult(res);
    } catch (error) {
      errorHandler("verifyEmail", error);
    }
  };

export const loginPlayer =
  (userData, setForm) => async (dispatch, _) => {
    try {
      const { data, meta } = await Api.post("/auth/login", userData);

      if (meta?.ok) {
        const tokens = {
          access: meta.headers.get("Authorization")?.split("Bearer ")[1],
          csrf: meta.headers.get("x-xsrf-token")
        };
        if (!Object.values(tokens).length)
          dispatch(
            addNotification({
              error: true,
              content: "There was a issue obtaining the necessary recourses from the server. Please try again.",
              close: false,
              duration: 0
            })
          );

        if (data.timestamps === "The game has not started yet") {
          dispatch(updateConfiguration({ restrictedAccess: true })); // Only allowed to profile.
          dispatch(
            addNotification({
              error: true,
              content: data.timestamps,
              close: false,
              duration: 0
            })
          );

          history.push("/profile");
        } else {
          dispatch(
            updateConfiguration({ timestamps: data.timestamps })
          );

          history.push("/");
        }

        dispatch({ type: INITIALIZE_SESSION, payload: { user: data.user, tokens } });
        dispatch({ type: INITIALIZE_COINS, payload: data.coins });

        dispatch(
          addNotification({
            error: false,
            content: `Welcome ${data.user.name} ✔`,
            close: false,
            duration: 4000
          })
        );
      } else {
        showError(data, meta.status, dispatch);
      }
    } catch (error) {
      errorHandler("loginPlayer", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };

export const logoutPlayer = () => (dispatch, _) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_GAME });
  dispatch({ type: CLEAR_CURRENT_CONFIG });
  dispatch({ type: CLEAR_BUSINESSES });
  dispatch({ type: CLEAR_WINNERS });
  socket.disconnect();
  alert("User session timed out.");
};

export const isNotPlayer =
  (useNotification, message) => (dispatch, getState) => {
    if (getState().user.credentials?.role !== "Player") {
      useNotification &&
        dispatch(
          addNotification({
            error: true,
            content: message
              ? message
              : "Players only have access to this feature",
            close: false,
            duration: 4000
          })
        );
      return true;
    }

    return false;
  };

export const sendResetPasswordEmail =
  (email, formRef, setForm) => async (dispatch, _) => {
    try {
      const { data, meta } = await Api.post("/auth/email/reset", { email });

      if (meta?.ok) {
        formRef.current.reset();
        dispatch(
          addNotification({
            error: false,
            content:
              "Success! Check your inbox to reset your password. In case you don't find it there,\
               please check your spam folder.",
            close: false,
            duration: 0
          })
        );
        setForm((prev) => ({ ...prev, success: true }));
      } else {
        showError(data, meta.status, dispatch);
      }
    } catch (error) {
      errorHandler("sendResetPasswordEmail", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };
export const resetPassword = (userData) => () => {
  return Api.patch("/auth/password", userData).catch((error) =>
    errorHandler("resetPassword", error)
  );
};
export const updatePassword = (userData) => () => {
  return Api.patch("/auth/player/password", userData).catch((error) =>
    errorHandler("updatePassword", error)
  );
};
export const updateProfile =
  (userData, formRef, setForm) => async (dispatch, _) => {
    try {
      const { data, meta } = await Api.patch("/auth/player/profile", userData);

      if (meta?.ok) {
        formRef.current.reset();
        dispatch(
          addNotification({
            error: false,
            content: "Your profile was successfully updated ✔",
            close: false,
            duration: 4000
          })
        );

        if (data.verify_email) {
          dispatch(logoutPlayer());
          dispatch(
            addNotification({
              error: false,
              content:
                "Since you updated your email address, you now have to verify your new email address.\
                 So, please check your inbox to verify your email. In case you don't find it there, please\
                 check your spam folder.",
              close: false,
              duration: 0
            })
          );
        } else {
          dispatch(updateCurrentUser(userData));
        }
      } else {
        showError(data, meta.status, dispatch);
      }
    } catch (error) {
      errorHandler("updateProfile", error);
    } finally {
      setForm((prev) => ({ ...prev, processing: false }));
    }
  };

export const getReferrals = (setReferrals) => async (dispatch, _) => {
  try {
    const { data, meta } = await Api.get("/auth/player/referrals");

    if (meta?.ok) {
      !data.referrals?.length
        ? setReferrals("No referrals has been used yet")
        : setReferrals(data.referrals);
    } else {
      showError(
        data,
        meta.status,
        dispatch,
        "Unexpected server error occurred getting your resent referrals."
      );
    }
  } catch (error) {
    errorHandler("getReferrals", error);
  }
};
