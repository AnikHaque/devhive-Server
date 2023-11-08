const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");
const Admin = require("../Model/adminModel");

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //bearer token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   const selectedUser = req.params.id;
      const decodedUser = decoded.id;
      console.log(decodedUser);
      const user = await Admin.findById(decodedUser);
      //   console.log(user);
      if (user?.isAdmin == true) {
        next();
      } else {
        res.status(401);
        throw new Error("Chill out! you're not an admin");
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { adminProtect };
