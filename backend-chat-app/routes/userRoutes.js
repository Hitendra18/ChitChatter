const router = require("express").Router();

const {
  signUpUser,
  signInUser,
  getUserProfile,
  deleteUserProfile,
  updateUserProfile,
  updateAvatar,
  getAllUsers,
} = require("../controllers/userControllers");
const authGuard = require("../middlewares/authGuard");
const uploadPicture = require("../middlewares/uploadPicture");

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.get("/get-user", authGuard, getUserProfile);
router.delete("/delete-user", authGuard, deleteUserProfile);
router.patch("/update-user", authGuard, updateUserProfile);
router.patch(
  "/update-avatar",
  authGuard,
  uploadPicture.single("profilePicture"),
  updateAvatar
);
router.get("/get-all-users", authGuard, getAllUsers);

module.exports = router;
