const express = require("express");
const {
  accessChat,
  fetchChat,
  deleteChat,
} = require("../Controllers/chatController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post("/:id", protect, accessChat);
router.get("/:id", protect, fetchChat);
router.route("/:id").delete(deleteChat);
// router.route("/group").post( createGroupChat);
// router.route("/rename").put( renameGroup);
// router.route("/removeFromGroup").put( removeFromGroup);
// router.route("/addUser").put( addUser);

module.exports = router;
