const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    uid: { type: String, trim: true, required: true, unique: true },
    verified: { type: Boolean, trim: true },

    pic: {
      type: String,
      default:
        "https://e1.pngegg.com/pngimages/444/382/png-clipart-frost-pro-for-os-x-icon-set-now-free-contacts-male-profile.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
