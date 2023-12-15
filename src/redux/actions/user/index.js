import { Api } from "@services";

export const login = (data, callback) => (dispatch, getState) => {
  return Api.post("/login", data).then((response) => {
    callback(response);
  });
};

export const getCurrentUser = (callback) => (dispatch, getState) => {
  return Api.get("/user/current").then((response) => {
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

export const resetPassword = (data, callback) => (dispatch, getState) => {
  return Api.post("/password-reset", data).then((response) => {
    callback(response);
  });
};

export const userProfile = (data, callback) => (dispatch, getState) => {
  return Api.post(data.id ? "/user/" + data.id : "/user", data).then(
    (response) => {
      callback(response);
    }
  );
};
