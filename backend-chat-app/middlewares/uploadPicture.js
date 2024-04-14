const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.floor(Math.random() * 1000000000)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const uploadPicture = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);

    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed..."));
    }
    return cb(null, true);
  },
});

module.exports = uploadPicture;
