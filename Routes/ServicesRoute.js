const express = require("express");
const {
  createService,
  getService,
  updateService,
  deleteService,
  getSingleService,
  queryService,
  getDeveloperService,
  getCategoryService,
  queryGist,
  priceQuery,
} = require("../Controllers/serviceController");

const router = express.Router();

// define the home page route

router.post("/", createService);

router.get("/", getService);

router.get("/slug", queryGist);
router.get("/query/:filter", queryService);

router.get("/filterPrice/:price", priceQuery);

router.get("/single/:id", getSingleService);

router.get("/developer/:id", getDeveloperService);

router.get("/category/:id", getCategoryService);

router.delete("/:id", deleteService);

router.patch("/:id", updateService);

module.exports = router;
