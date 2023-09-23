const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("send-changes", (inputText) => {
    socket.broadcast.emit("receive-changes", inputText);
  });
});
io.on("error", (err) => {
  console.log(err);
});
io.on("close", () => {
  console.log("disconnected");
});
io.on("disconnect", () => {
  console.log("disconnected");
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
