const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  likes: [{ type: String }],
  saves: [{ type: String }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
