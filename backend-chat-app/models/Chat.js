const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true, minLength: 1 },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    groupAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
