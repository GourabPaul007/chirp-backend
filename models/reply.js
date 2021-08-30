const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  authorID: {
    type: String,
    required: true,
  },
  tweetId: {
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: [{ type: String }],
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
