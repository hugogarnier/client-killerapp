import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("https://killer-app-api.herokuapp.com", {
  transports: ["websocket"],
});
export const SocketContext = createContext();
