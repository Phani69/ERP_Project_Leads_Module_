import { io } from "socket.io-client";

// Connect to the backend Socket.IO server
const socket = io("http://localhost:5001");

export default socket;
