import { SET_CURRENT_USER, SET_TOKEN, LOGOUT } from "@actions/index";
import { addNotification } from "./notifications";
import { Api } from "@services/index";
import errorHandler from "@services/errorHandler";

export const registerPlayer = (userData) => (dispatch, getState) => {
  return Api.post("/register", userData).catch((error) =>
    errorHandler("registerPlayer", error)
  );
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
export const sendResetPasswordEmail = (email) => (dispatch, getState) => {
  return Api.post("/email/reset", email).catch((error) =>
    errorHandler("sendResetPasswordEmail", error)
  );
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

export const userProfile = (userData, callback) => (dispatch, getState) => {
  return Api.post(
    userData.id ? "/user/" + userData.id : "/user",
    userData
  ).then((response) => {
    callback(response);
  });
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

// export const createReferral = (data, callback) => (dispatch, getState) => {
//   return Api.post("/referral", data).then((response) => {
//     callback(response);
//   });
// };
