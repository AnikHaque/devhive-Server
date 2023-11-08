const express = require("express");
const {
  makeOrder,
  orderStatus,
  orderDetail,
  allOrders,
  failStatus,
  cancelStatus,
} = require("../Controllers/orderController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();
router.post("/success", orderStatus);
router.post("/fail", failStatus);
router.post("/cancel", cancelStatus);
router.get("/", makeOrder);
router.get("/transaction/:id", orderDetail);
router.get("/all/:id", protect, allOrders);
module.exports = router;
