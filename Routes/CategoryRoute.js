const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  singleCategory,
  deleteCategory,
  updateCategory,
} = require("../Controllers/categoryController");
const { adminProtect } = require("../middleware/adminMiddleWare");

router.post("/", adminProtect, createCategory);
router.get("/", getCategories);
router.get("/:id", singleCategory);
router.delete("/:id", adminProtect, deleteCategory);
router.patch("/:id", adminProtect, updateCategory);

module.exports = router;
