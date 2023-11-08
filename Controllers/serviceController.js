const serviceModel = require("../Model/serviceModel");
const asyncHandler = require("express-async-handler");
const createService = async (req, res) => {
  const newService = req.body;
  const result = await serviceModel.create(newService);
  res.send(result);
};

const getService = async (req, res) => {
  // const page = req.query.page ? parseInt(req.query.page) : 1;
  // const limit = req.query.limit ? parseInt(req.query.limit) : 50;
  // const skipIndex = (page - 1) * limit;
  // const services = await serviceModel.find({}).skip(skipIndex).limit(limit);
  const services = await serviceModel.find({});
  res.json(services);
};
const getSingleService = async (req, res) => {
  const service = await serviceModel.findById(req.params.id);
  res.json(service);
};

const getDeveloperService = async (req, res) => {
  const service = await serviceModel.find({
    "developerInfo.userId": req.params.id,
  });
  res.json(service);
};
const getCategoryService = async (req, res) => {
  const service = await serviceModel.find({
    "category._id": req.params.id,
  });
  res.json(service);
};

const queryService = async (req, res) => {
  const queryData = await serviceModel.find({ "category.name": req.params.filter })
  res.json(queryData);
};
// const queryGist = async (req, res) => {
//   const page = req.query.page ? parseInt(req.query.page) : 1;
//   const limit = req.query.limit ? parseInt(req.query.limit) : 7;
//   const skipIndex = (page - 1) * limit;
//   const queryData = await serviceModel
//     .find({
//       slugTitle: req.params.query,
//     })
//     .skip(skipIndex)
//     .limit(limit);
//   res.json(queryData);
// };
const queryGist = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { slugTitle: { $regex: req.query.search, $options: "i" } },
          { "category.name": { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const queryData = await serviceModel
    .find({ ...keyword })
    .find({})
    .limit(7);
  // const queryData = await User.find({ ...keyword }).find;
  res.json(queryData);
});

const updateService = async (req, res) => {
  const id = req.params.id;
  const updatedValue = req.body;
  const filter = { _id: id };
  const service = await serviceModel.findOneAndUpdate(filter, updatedValue, {
    new: true,
  });
  res.send(service);
};

const priceQuery = async (req, res) => {
  console.log(req.params.price);
  const service = await serviceModel.find({ price: { $lt: req.params.price } })
  res.json(service)
};

const deleteService = async (req, res) => {
  const id = req.params.id;
  const service = await serviceModel.deleteOne({ id });
  console.log(service);
  res.send(service);
};

module.exports = {
  createService,
  getService,
  getCategoryService,
  getDeveloperService,
  updateService,
  deleteService,
  getSingleService,
  queryGist,
  queryService,
  priceQuery
};
