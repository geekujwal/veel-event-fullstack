import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "192.168.101.32";

export const socket = io(URL);
