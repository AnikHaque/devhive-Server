const mongoose = require("mongoose");

const OrderModel = mongoose.Schema(
  {
    serviceId: { type: String, trim: true },
    cus_id: { type: String, trim: true },
    total_amount: { type: Number, trim: true },
    currency: { type: String, trim: true },
    tran_id: { type: String, trim: true },
    shipping_method: { type: String, trim: true },
    product_name: { type: String, trim: true },
    product_category: { type: String, trim: true },
    product_profile: { type: String, trim: true },
    cus_name: { type: String, trim: true },
    cus_email: { type: String, trim: true },
    cus_add1: { type: String, trim: true },
    cus_add2: { type: String, trim: true },
    cus_city: { type: String, trim: true },
    cus_state: { type: String, trim: true },
    cus_postcode: { type: String, trim: true },
    cus_country: { type: String, trim: true },
    cus_phone: { type: String, trim: true },
    cus_fax: { type: String, trim: true },
    ship_name: { type: String, trim: true },
    ship_add1: { type: String, trim: true },
    ship_add2: { type: String, trim: true },
    ship_city: { type: String, trim: true },
    ship_state: { type: String, trim: true },
    ship_postcode: { type: String, trim: true },
    ship_country: { type: String, trim: true },
    paid: { type: Boolean, trim: true },
    paidAt: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderModel);

module.exports = Order;
