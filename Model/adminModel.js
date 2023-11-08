const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    uid: { type: String, trim: true, required: true, unique: true },
    verified: { type: Boolean, trim: true },
    isAdmin: { type: Boolean, trim: true },
    password: { type: String, trim: true },
    isSuperAdmin: { type: Boolean, trim: true },
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model("Admin", userSchema);

module.exports = Admin;
