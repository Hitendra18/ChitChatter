const { verify } = require("jsonwebtoken");
const User = require("../models/User");

const authGuard = async (req, _, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      const err = new Error("Invalid or no token");
      err.statusCode = 401;
      throw err;
    }

    const token = req.headers.authorization.split(" ")[1];
    const { _id } = verify(token, process.env.SECRET_JWT);
    req.user = await User.findById(_id).select("-password");
    if (!req.user) {
      throw new Error("Invalid token");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authGuard;
