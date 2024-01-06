import { Store } from "@root/store";
import history from "@utils/History";

// export const Api = {
//   get: async (url, params) => {
//     const _url = params
//       ? process.env.REACT_APP_API_BASE_URL +
//         url +
//         "?" +
//         new URLSearchParams(params).toString()
//       : process.env.REACT_APP_API_BASE_URL + url;
//     // TODO: Check this.
//     const { token } = Store.getState().local;
//     console.log("token", token);

//     try {
//       return token
//         ? await fetch(_url, {
//             method: "GET",
//             headers: token
//               ? {
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${token}`,
//                 }
//               : {
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//                 },
//           }).then((response) => response.json())
//         : await fetch(_url, {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           }).then((response) => response.json());
//     } catch (error) {
//       console.error("GET ERROR: ", error.message);
//       // Navigate to 500?
//     }
//   },
//   post: async (url, data) => {
//     const _url = process.env.REACT_APP_API_BASE_URL + url;
//     const { token } = Store.getState().local;
//     console.log("token2", token);

//     return await fetch(_url, {
//       method: "POST",
//       headers: token
//         ? {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           }
//         : { Accept: "application/json", "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     }).then((response) => response.json());
//   },
// };

const headers = (token) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
};

export const Api = {
  get: async (url, params) => {
    const apiUrl = params
        ? `${process.env.REACT_APP_API_BASE_URL}${url}?${new URLSearchParams(
            params
          ).toString()}`
        : `${process.env.REACT_APP_API_BASE_URL}${url}`,
      token = Store.getState().user.token;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers(token),
      });

      return await response.json();
    } catch (error) {
      console.error("GET Request ERROR: ", error.message);
      history.push("/error-500");
    }
  },
  post: async (url, body) => {
    console.log("POST body ", body);
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}${url}`;
      const token = Store.getState().user.token;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(body),
      });

      return await response.json();
    } catch (error) {
      console.error("GET Request ERROR: ", error.message);
      history.push("/error-500");
    }
  },
};
