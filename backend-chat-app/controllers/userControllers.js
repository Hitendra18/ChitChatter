const path = require("path");
const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fileRemover = require("../utils/fileRemover");
const {
  deleteFromCloudinary,
  uploadOnCloudinary,
} = require("../utils/cloudinary");

const signUpUser = async (req, res, next) => {
  try {
    // getting user data from request body
    const { name, email, password } = req.body;

    // if we have all the fields or not
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    if (password.length < 6) {
      throw new Error("Password must have at least 6 characters");
    }

    // checking if user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    // if user doesn't exists
    // hashing password to store in database
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user in database
    user = await User.create({ name, email, password: hashedPassword });

    // generating jwt for user authentication
    const token = jsonwebtoken.sign({ _id: user._id }, process.env.SECRET_JWT, {
      expiresIn: "30d",
    });

    // sending response to client
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      darkTheme: user.darkTheme,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const signInUser = async (req, res, next) => {
  try {
    // getting user data from request body
    const { email, password } = req.body;

    // if we have all the fields or not
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    // checking if user exists
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exists");
    }

    // If user enters wrong password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Wrong credentials");
    }

    // generating jwt for user authentication
    const token = jsonwebtoken.sign({ _id: user._id }, process.env.SECRET_JWT, {
      expiresIn: "30d",
    });

    // sending response to client
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      darkTheme: user.darkTheme,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    // fetching user from database
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User does not exists");
    }

    // sending response to client
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      darkTheme: user.darkTheme,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserProfile = async (req, res, next) => {
  try {
    // fetching user from database
    const user = await User.deleteOne(req.user._id);

    if (!user) {
      throw new Error("User does not exists");
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { name, email, password, avatar, darkTheme } = req.body;

    if (!name && !email && !password && !avatar && !darkTheme) {
      throw new Error("Nothing to update");
    }

    const user = await User.findById(req.user._id);

    user.name = name || user.name;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    user.darkTheme = darkTheme || user.darkTheme;
    if (password) {
      if (password.length >= 6) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      } else {
        throw new Error("Password should have at least 6 characters");
      }
    }

    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      darkTheme: user.darkTheme,
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    if (req.file) {
      let filename = req.file.filename;

      // find the user
      const updatedUser = await User.findById(req.user._id);

      // get avatar publicId
      let avatarPublicId = updatedUser.avatarPublicId;

      // remove previous avatar if exits
      if (avatarPublicId) {
        const res = await deleteFromCloudinary(avatarPublicId);
        if (res == null) {
          const err = new Error("error removing profile pic...");
          return next(err);
        }
      }

      // after removing old avatar upload new avatar to cloudinary
      const uploadRes = await uploadOnCloudinary(
        path.join(__dirname, "..", "uploads", filename)
      );
      fileRemover(filename);

      // if not uploaded then throw an error
      if (uploadRes == null) {
        const err = new Error("error uploading profile pic...");
        return next(err);
      }

      updatedUser.avatar = uploadRes.url;
      updatedUser.avatarPublicId = uploadRes.publicId;
      await updatedUser.save();

      res.json({
        _id: updatedUser._id,
        avatar: updatedUser.avatar,
        name: updatedUser.name,
        email: updatedUser.email,
        darkTheme: updatedUser.darkTheme,
      });
    }
    // if file doesn't exists(requested to delete)
    else {
      // get user from database
      let updatedUser = await User.findById(req.user._id);

      // extract avatarPublicId from user
      let avatarPublicId = updatedUser.avatarPublicId;

      // set them null
      updatedUser.avatar = "";
      updatedUser.avatarPublicId = "";

      // remove image from from cloudinary
      await deleteFromCloudinary(avatarPublicId);

      // save the user to the database
      await updatedUser.save();

      res.json({
        _id: updatedUser._id,
        avatar: updatedUser.avatar,
        name: updatedUser.name,
        email: updatedUser.email,
        darkTheme: updatedUser.darkTheme,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const filter = req.query.search;
    if (!filter) {
      return res.status(200).json([]);
    }

    let where = {
      $or: [
        { email: { $regex: filter, $options: "i" } },
        { name: { $regex: filter, $options: "i" } },
      ],
      $and: [{ _id: { $ne: req.user._id } }],
    };

    const users = await User.find(where);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUpUser,
  signInUser,
  getUserProfile,
  deleteUserProfile,
  updateUserProfile,
  updateAvatar,
  getAllUsers,
};
