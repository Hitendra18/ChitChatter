const socketLogic = (socket) => {
  console.log("Connected to socket.io");

  // user joins a personal room on login
  socket.on("setup user", (userId) => {
    console.log(userId + " joined");
    socket.join(userId);
  });

  // when someone sends a message
  socket.on("message sent", ({ receivers, message }) => {
    console.log("receivers", receivers);
    socket.to(receivers).emit("message received", message);
  });

  // when someone creates a new group chat
  socket.on("group chat created", ({ receivers, chat }) => {
    console.log("group chat created", receivers, chat);
    socket.to(receivers).emit("added to group chat", chat);
  });

  // when user leaves
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
};

module.exports = socketLogic;
