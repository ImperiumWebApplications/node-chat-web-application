const express = require("express");
const app = express();
const http = require("http").Server(app);

// Configure cors for Socket.io
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
