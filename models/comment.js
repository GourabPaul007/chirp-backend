const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  tweetId: {
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
