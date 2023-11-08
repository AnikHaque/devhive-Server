const express = require("express");
const {
  createDeveloper,
  getDeveloper,
  singleDeveloper,
} = require("../Controllers/developerController");

const router = express.Router();

// define the home page route

router.post("/", createDeveloper);
router.get("/developer", getDeveloper);
router.get("/singledeveloper/:id", singleDeveloper);
module.exports = router;
