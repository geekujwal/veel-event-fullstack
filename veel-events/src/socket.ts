import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://event.veel.video:3000";

export const socket = io(URL);
