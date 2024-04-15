const socketLogic = (socket) => {
  console.log("Connected to socket.io");

  // user joins a personal room on login
  socket.on("setup user", (userId) => {
    socket.join(userId);
  });

  // when someone sends a message
  socket.on("message sent", ({ receivers, message }) => {
    socket.to(receivers).emit("message received", message);
  });

  // when someone creates a new group chat
  socket.on("group chat created", ({ receivers, chat }) => {
    socket.to(receivers).emit("added to group chat", chat);
  });
  socket.on(
    "call started",
    ({ receivers, channelName, caller, groupChatName }) => {
      socket
        .to(receivers)
        .emit("call received", { channelName, caller, groupChatName });
    }
  );

  // when user leaves
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
};

module.exports = socketLogic;
