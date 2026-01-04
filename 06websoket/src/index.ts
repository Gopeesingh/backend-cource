import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", function (socket) {
  console.log("✅ New client connected");

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    // Handle JOIN room
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
      console.log(`👤 User joined room: ${parsedMessage.payload.roomId}`);
      console.log(`📊 Total users: ${allSockets.length}`);
    }

    // Handle CHAT message
    if (parsedMessage.type === "chat") {
      console.log("💬 Message received:", parsedMessage.payload.message);

      let currentUserRoom: string | null = null;

      // Find current user's room
      for (const user of allSockets) {
        if (user.socket === socket) {
          currentUserRoom = user.room;
          break;
        }
      }

      if (!currentUserRoom) {
        console.log("⚠️ User not in any room");
        return;
      }

      console.log(`📤 Broadcasting to room: ${currentUserRoom}`);

      // Send message to all users in the same room EXCEPT the sender
      for (const user of allSockets) {
        if (user.room === currentUserRoom && user.socket !== socket) {
          user.socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});
