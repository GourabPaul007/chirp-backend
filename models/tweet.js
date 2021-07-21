const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  id: {
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
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  likes: [{ type: String }],
  saves: [{ type: String }],
  comments: [
    {
      id: {
        type: String,
        required: true,
      },
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
    },
  ],
  replies: [
    {
      id: {
        type: String,
        required: true,
      },
      comment: {
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
    },
  ],
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
