const Category = require("../Model/categoryModel");
// const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const { name, image, route, about } = req.body;
  console.log(req.body);
  // res.json("user created")
  const categoryExists = await Category.findOne({ route });
  if (categoryExists) {
    res.status(422).json({
      error: "Category already exists",
      categoryExists,
    });
    throw new Error("Category already exists");
  }
  const category = await Category.create({
    name,
    image,
    route,
    about,
  });
  if (category) {
    res.status(201).json({
      _id: category._id,
      name: category.name,
      image: category.image,
      route: category.route,
      about: category.about,
    });
  } else {
    res.status(400);
    throw new Error("Invalid category data");
  }
});

const getCategories = async (req, res) => {
  const category = await Category.find();
  res.send(category);
};

const singleCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const updatedValue = req.body;
  const filter = { _id: id };
  const category = await Category.findOneAndUpdate(filter, updatedValue, {
    new: true,
  });
  res.send(category);
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.deleteOne({ _id: id });
  console.log(category);
  res.send(category);
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  singleCategory,
};
