const router = require("express").Router();

const {
  accessRegularChat,
  createGroupChat,
  getAllChats,
  getRegularChat,
  updateGroupAvatar,
} = require("../controllers/chatControllers");
const authGuard = require("../middlewares/authGuard");
const uploadPicture = require("../middlewares/uploadPicture");

router.post("/", authGuard, accessRegularChat);
router.get("/", authGuard, getRegularChat);
router.post("/create-group-chat", authGuard, createGroupChat);
router.get("/get-all-chats", authGuard, getAllChats);
router.patch(
  "/update-group-avatar/:chatId",
  authGuard,
  uploadPicture.single("groupAvatar"),
  updateGroupAvatar
);

module.exports = router;
