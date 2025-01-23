import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://allrecipes-clone-server.onrender.com");

export default socket;
