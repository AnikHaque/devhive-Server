const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    image: { type: String, trim: true },
    route: { type: String, trim: true, required: true, unique: true },
    about: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
