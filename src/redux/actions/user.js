import { SET_TOKEN_SUCCESS } from "@actions";
import { Api } from "@services";

export const registerPlayer = (userData, callback) => (dispatch, getState) => {
  return Api.post("/register", userData).then((response) => {
    callback(response);
  });
};

export const loginPlayer = (userData, callback) => (dispatch, getState) => {
  return Api.post("/login", userData).then((response) => {
    callback(response);
  });
};

export const setToken = (data) => (dispatch, getState) => {
  dispatch({ type: SET_TOKEN_SUCCESS, payload: data });
};

export const sendVerifyEmail = (email) => (dispatch, getState) => {
  return Api.post("/email/verify", { email });
};

export const resetPassword = (data, callback) => (dispatch, getState) => {
  return Api.post("/password-reset", data).then((response) => {
    callback(response);
  });
};

export const userProfile = (userData, callback) => (dispatch, getState) => {
  return Api.post(
    userData.id ? "/user/" + userData.id : "/user",
    userData
  ).then((response) => {
    callback(response);
  });
};

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
