const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 5 * 60 * 1000,
});

require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

/* ****************** Error Handlers ********************** */
const {
  invalidPathHandler,
  errorResponseHandler,
} = require("./middlewares/errorHandlers");

/* ****************** Error Handlers ********************** */
const socketLogic = require("./socketLogic");

/* ****************** Connecting to MongoDB database *************** */
require("./config/db")();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (_, res) => {
  res.send("Welcome to ChitChatter.");
});

/* ****************** Routes ********************** */
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));

/*********************  To Handel Errors *********************/
app.use(invalidPathHandler);
app.use(errorResponseHandler);

io.on("connection", socketLogic);

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
