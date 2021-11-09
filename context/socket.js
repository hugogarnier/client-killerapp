import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(
  /*"https://killer-app-api.herokuapp.com"*/ `http://192.168.86.247:3000`,
  {
    transports: ["websocket"],
  }
);
export const SocketContext = createContext();
