import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("http://192.168.1.48:3000", {
  transports: ["websocket"],
});
export const SocketContext = createContext();
