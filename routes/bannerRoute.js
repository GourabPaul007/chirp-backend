const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");

const Tweet = require("../models/tweet");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Get all bookmarked Tweets
router.get("/:user/bookmarks", async (req, res) => {
  try {
    const bookmarkedTweets = await Tweet.find({ saves: "paul" });
    res.json(bookmarkedTweets);
  } catch (e) {
    console.log("Cant find tweets", e);
  }
});

// Get all liked Tweets
router.get("/:user/likes", async (req, res) => {
  try {
    const likedTweets = await Tweet.find({ likes: "paul" });
    res.json(likedTweets);
  } catch (e) {
    console.log("Cant find tweets", e);
  }
});

module.exports = router;
