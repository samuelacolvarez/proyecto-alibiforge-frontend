import { io } from "socket.io-client";
import { getToken } from "./api/client";

const URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// solo se conecta cuando hay sesión
export const socket = io(URL, {
  autoConnect: false,
  auth: (callback) => callback({ token: getToken() }),
});