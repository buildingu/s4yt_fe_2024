import { SET_CURRENT_USER, SET_TOKEN } from "@actions/index";
import { Api } from "@services/index";
import errorHandler from "@root/services/errorHandler";

// TODO: There is no need to use a callback...
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
export const sendResetPasswordEmail = (email) => (dispatch, getState) => {
  return Api.post("/email/reset", email).catch((error) =>
    errorHandler("sendResetPasswordEmail", error)
  );
};
export const resetPassword = (email) => (dispatch, getState) => {
  return Api.post("/password", email).catch((error) =>
    errorHandler("resetPassword", error)
  );
};
export const updatePassword = (email) => (dispatch, getState) => {
  return Api.post("/player/password", email).catch((error) =>
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

// This won't be here probably.
export const getCurrentUser = (callback) => (dispatch, getState) => {
  return Api.get("/user/current").then((response) => {
    console.log("currentUser", response);
    callback(response);
  });
};

export const getReferrals = (callback) => (dispatch, getState) => {
  return Api.get("/referral").then((response) => {
    callback(response);
  });
};

export const createReferral = (data, callback) => (dispatch, getState) => {
  return Api.post("/referral", data).then((response) => {
    callback(response);
  });
};
