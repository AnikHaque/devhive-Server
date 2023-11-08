const { Schema, model } = require("mongoose");
const developerSchema = new Schema({
  username: String,
  title: String,
  about: String,
  language: String,
  userUid: String,
  userId: String,
  displayName: String,
  photoURL: String,
});
module.exports = model("developer", developerSchema);