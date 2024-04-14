const router = require("express").Router();

const {
  sendMessage,
  getAllMessages,
  updateSeenBy,
} = require("../controllers/messageControllers");
const authGuard = require("../middlewares/authGuard");

router.post("/:chatId", authGuard, sendMessage);
router.get("/:chatId", authGuard, getAllMessages);
router.patch("/:chatId", authGuard, updateSeenBy);

module.exports = router;
