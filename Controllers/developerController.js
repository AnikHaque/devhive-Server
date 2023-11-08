const developerModel = require("../Model/developersModel");

const createDeveloper = async (req, res) => {
  const newDeveloper = req.body;
  const result = await developerModel.create(newDeveloper);
  res.send(result);
};
const getDeveloper = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 50;
  const skipIndex = (page - 1) * limit;
  const developer = await developerModel.find({}).skip(skipIndex).limit(limit);
  res.json(developer);
};
const singleDeveloper = async (req, res) => {
  const developer = await developerModel.find({ userId: req.params.id });
  res.json(developer);
};

module.exports = { createDeveloper, getDeveloper, singleDeveloper };
