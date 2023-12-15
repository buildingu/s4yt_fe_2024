import { Store } from "@root/store";

export const Api = {
  get: async (url, params) => {
    const _url = params
      ? process.env.REACT_APP_API_BASE_URL +
        url +
        "?" +
        new URLSearchParams(params).toString()
      : process.env.REACT_APP_API_BASE_URL + url;
    // TODO: Check this.
    const { token } = Store.getState().local;
    console.log("token", token);

    try {
      return token
        ? await fetch(_url, {
            method: "GET",
            headers: token
              ? {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                }
              : {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
          }).then((response) => response.json())
        : await fetch(_url, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }).then((response) => response.json());
    } catch (error) {
      console.error("GET ERROR: ", error.message);
      // Navigate to 500?
    }
  },
  post: async (url, data) => {
    const _url = process.env.REACT_APP_API_BASE_URL + url;
    const { token } = Store.getState().local;
    console.log("token2", token);

    return await fetch(_url, {
      method: "POST",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        : { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },
};
