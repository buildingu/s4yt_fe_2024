import { SET_CURRENT_USER, SET_TOKEN } from "@actions/index";
import { Api } from "@services/index";

// TODO: There is no need to use a callback...
export const registerPlayer = (userData) => (dispatch, getState) => {
  return Api.post("/register", userData);
};
export const sendVerifyEmail = (email) => (dispatch, getState) => {
  return Api.post("/email/verify", { email });
};

export const loginPlayer = (userData) => (dispatch, getState) => {
  return Api.post("/login", userData);
};
export const setCurrentUser = (userData) => (dispatch, getState) => {
  dispatch({ type: SET_CURRENT_USER, payload: userData });
};
export const setToken = (token) => (dispatch, getState) => {
  dispatch({ type: SET_TOKEN, payload: token });
};

export const sendForgotPassword = (email) => (dispatch, getState) => {
  return Api.post("TODO", email);
};
// export const resetPassword = (data, callback) => (dispatch, getState) => {
//   return Api.post("/password-reset", data).then((response) => {
//     callback(response);
//   });
// };

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
