import { io } from "socket.io-client";

export const socket = io(import.meta.env.DEV ? "http://localhost:4000" : undefined, {
  autoConnect: false,
  reconnection: false,
  transports: ["websocket", "polling"]
  // withCredentials: true
});

export let timeout: NodeJS.Timeout | undefined;
export const EstablishConnection = (userEmail: string) => new Promise<void>((resolve, reject) => {
  let retries = 9;
  const attemptConnection = () => {
    retries--;

    if (import.meta.env.DEV)
      console.log(
        `Socket instance attempting to establish a connection; ${retries} retries left...`
      );
    socket.connect();

    if (retries === 0) {
      socket.removeAllListeners();
      reject(
        new Error("We couldn't connect to a server resource correctly, some things may not work properly.")
      );
    }
  }

  if (socket.connected) return resolve(); // Resolves early if already connected somehow.
  socket
    .on("connect", () => {
      if (import.meta.env.DEV)
        console.log("Connection established with socket, waiting for registration...");

      socket.emit("register", userEmail, (res: string) => {
        if (res === "success") {
          console.log("Successfully registered with socket server.");
          resolve();
        } else {
          reject(new Error("Failed to register with a server resource, some things may not work properly."));
        }
      });

      socket.off("connect");
      socket.off("connect_error");
    })
    .on("connect_error", (error) => {
      console.warn(`Socket instance connection error:\n`, error.message);

      timeout = setTimeout(() => attemptConnection(), 5000);
    });

  attemptConnection(); // Initial
});
