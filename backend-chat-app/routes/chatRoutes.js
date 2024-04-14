const router = require("express").Router();

const {
  accessRegularChat,
  createGroupChat,
  getAllChats,
  getRegularChat,
} = require("../controllers/chatControllers");
const authGuard = require("../middlewares/authGuard");

router.post("/", authGuard, accessRegularChat);
router.get("/", authGuard, getRegularChat);
router.post("/create-group-chat", authGuard, createGroupChat);
router.get("/get-all-chats", authGuard, getAllChats);

module.exports = router;
