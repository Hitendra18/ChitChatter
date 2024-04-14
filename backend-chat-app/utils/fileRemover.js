const fs = require("fs");
const path = require("path");

const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      // file doesn't exist
      console.log(`File ${filename} doesn't exist, won't remove it.`);
    } else if (err) {
      console.log(`Error occurred while trying to remove file ${filename}`);
    } else {
      console.log(`Removed ${filename}`);
    }
  });
};

module.exports = fileRemover;
