import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Echo: Echo;
    Pusher: typeof Pusher;
  }
}

const socketProvider = () => {
  if (!window.Pusher || !window.Echo) {
    try {
      window.Pusher = Pusher;

      window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.REACT_APP_PUSHER_KEY,
        cluster: process.env.REACT_APP_PUSHER_CLUSTER,
        wsHost: process.env.REACT_APP_PUSHER_HOST,
        wsPort: process.env.REACT_APP_PUSHER_PORT,
        wssPort: process.env.REACT_APP_PUSHER_PORT,
        forceTLS: true,
        enabledTransports: ["ws", "wss"],
      });
    } catch (error) {
      console.error("socketProvider error:\n", error);
    }
  }

  // A test connection socket?
};

export default socketProvider;
