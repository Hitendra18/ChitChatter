const router = require("express").Router();

const {
  accessRegularChat,
  createGroupChat,
  getAllChats,
  getRegularChat,
  updateGroupAvatar,
} = require("../controllers/chatControllers");
const authGuard = require("../middlewares/authGuard");

router.post("/", authGuard, accessRegularChat);
router.get("/", authGuard, getRegularChat);
router.post("/create-group-chat", authGuard, createGroupChat);
router.get("/get-all-chats", authGuard, getAllChats);
router.patch("/update-group-avatar/:chatId", authGuard, updateGroupAvatar);

module.exports = router;
