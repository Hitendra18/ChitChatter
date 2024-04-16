const mongoose = require("mongoose");
const Chat = require("../models/Chat");
const User = require("../models/User");
const uploadPicture = require("../middlewares/uploadPicture");

const accessRegularChat = async (req, res, next) => {
  try {
    // getting receiver id from request
    const { receiverId } = req.body;
    if (!receiverId) {
      throw new Error("receiverId is required");
    }

    // checking if receiver exists or not
    const receiver = await User.findById(receiverId);
    if (!receiver || receiver._id === req.user._id) {
      throw new Error("Invalid receiver");
    }

    // if receiver exists then check if there is any chat with them
    const chat = await Chat.findOne({
      users: { $all: [receiverId, req.user._id], $size: 2 },
      isGroupChat: false,
    })
      .populate({
        path: "latestMessage",
        populate: { path: "sender" },
      })
      .populate({
        path: "users",
      });

    // if chat exits then return
    if (chat) {
      return res.status(200).json(chat);
    }

    // if chat doesn't exist then create and return
    const createdChat = await Chat.create({
      users: [receiverId, req.user._id],
    });

    const getChat = await Chat.findById(createdChat._id)
      .populate({
        path: "latestMessage",
        populate: { path: "sender" },
      })
      .populate({
        path: "users",
      });

    return res.status(201).json(getChat);
  } catch (error) {
    next(error);
  }
};

const createGroupChat = async (req, res, next) => {
  try {
    // getting chatName and users to add in chat
    const { chatName, users } = req.body;
    if (!chatName || users?.length <= 0) {
      throw new Error("All fields are required");
    }

    // creating a new group chat
    const chat = await Chat.create({
      chatName,
      isGroupChat: true,
      groupOwner: req.user._id,
    });

    // adding all the users in the group chat asynchronously
    for (const user of users) {
      if (mongoose.isValidObjectId(user)) {
        const userToAdd = await User.findById(user);
        if (userToAdd) {
          chat.users.push(userToAdd._id);
        }
      }
    }
    chat.users.push(req.user._id);

    // saving chat to database
    await chat.save();

    const createdChat = await Chat.findById(chat._id)
      .populate({
        path: "latestMessage",
        populate: { path: "sender" },
      })
      .populate("users");

    res.status(201).json(createdChat);
  } catch (error) {
    next(error);
  }
};

const getAllChats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({
      $and: [
        { $or: [{ isGroupChat: true }, { latestMessage: { $exists: true } }] },
        { users: { $all: [userId] } },
      ],
    })
      .populate({
        path: "latestMessage",
        populate: { path: "sender" },
      })
      .populate("users");

    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

const getRegularChat = async (req, res, next) => {
  try {
    // getting receiver id from request
    const { receiverId } = req.body;
    if (!receiverId) {
      throw new Error("receiverId is required");
    }

    // checking if receiver exists or not
    const receiver = await User.findById(receiverId);
    if (!receiver || receiver._id === req.user._id) {
      throw new Error("Invalid receiver");
    }

    // if receiver exists then check if there is any chat with them
    const chat = await Chat.findOne({
      users: { $all: [receiverId, req.user._id], $size: 2 },
    })
      .populate({
        path: "latestMessage",
        populate: { path: "sender" },
      })
      .populate({
        path: "users",
      });

    // if chat doesn't exits then throw an error
    if (!chat) {
      throw new Error("Chat doesn't exist");
    }

    return res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

const updateGroupAvatar = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("groupAvatar");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred during uploading... " + err.message
        );
        next(error);
      } else {
        // if pic exists
        if (req.file) {
          let filename;
          const updatedChat = await Chat.findById(req.params.chatId);

          filename = updatedChat.avatar;

          // remove previous avatar if exits
          if (filename) {
            fileRemover(filename);
          }
          updatedChat.avatar = req.file.filename;
          await updatedChat.save();

          res.json(updatedChat);
        }
        // if file doesn't exists(requested to delete)
        else {
          let filename;
          let updatedChat = await Chat.findById(req.params.chatId);
          filename = updatedChat.avatar;
          updatedChat.avatar = "";
          await updatedChat.save();
          fileRemover(filename);
          res.json(updatedChat);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  accessRegularChat,
  createGroupChat,
  getAllChats,
  getRegularChat,
  updateGroupAvatar,
};
