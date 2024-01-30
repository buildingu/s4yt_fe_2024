import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Echo: Echo;
    Pusher: typeof Pusher;
  }
}

const socketProvider = (userToken: string) => {
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: "pusher",
    key: process.env.REACT_APP_PUSHER_KEY,
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    forceTLS: true,
    authEndpoint: `${process.env.REACT_APP_API_BASE_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
      },
    },
  });

  // A test connection socket?
};

export default socketProvider;
