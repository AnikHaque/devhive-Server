const express = require("express");
const router = express.Router();

const {
  createUser,
  getUser,
  allUser,
  deleteUser,
  updateUser,
  singleUser,
} = require("../Controllers/userController");
const { protect } = require("../middleware/authMiddleWare");
const { adminProtect } = require("../middleware/adminMiddleWare");

router.post("/", createUser);
router.get("/user", getUser);
router.get("/all", adminProtect, allUser);
router.get("/:id", singleUser);
router.delete("/:id", protect, deleteUser);
router.patch("/:id", protect, updateUser);

module.exports = router;
