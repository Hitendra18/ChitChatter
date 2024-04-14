const Chat = require("../models/Chat");
const Message = require("../models/Message");

const sendMessage = async (req, res, next) => {
  try {
    // getting content and chatId
    const { content } = req.body;
    if (!content) {
      throw new Error("Invalid request, no content");
    }
    const chatId = req.params.chatId;

    // checking if chat exits
    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw new Error("Chat does not exit");
    }

    // create new message
    const message = {
      sender: req.user._id,
      content,
      chat: chat._id,
      seenBy: [req.user._id],
    };
    const createdMessage = await Message.create(message);

    // setting latest message to chat
    chat.latestMessage = createdMessage._id;
    await chat.save();

    const messageToSend = await Message.findById(createdMessage._id).populate(
      "sender"
    );

    return res.status(201).json(messageToSend);
  } catch (error) {
    next(error);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;
    const messages = await Message.find({ chat: chatId }).populate("sender");

    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const updateSeenBy = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.user._id;
    // return res.status(200).json({ success: true });
    await Message.updateMany(
      { chat: chatId, seenBy: { $ne: userId } },
      { $addToSet: { seenBy: userId } }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getAllMessages, updateSeenBy };
