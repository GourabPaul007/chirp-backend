const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Get all bookmarked Tweets
router.get("/:user/bookmarks", (req, res) => {
  const tweetArray = [];
  demoData.forEach((tweet) => {
    if (tweet.saves.includes("paul")) {
      tweetArray.push(tweet);
    }
  });
  res.json(tweetArray);
});

// Get all liked Tweets
router.get("/:user/likes", (req, res) => {
  const tweetArray = [];
  demoData.forEach((tweet) => {
    if (tweet.likes.includes("paul")) {
      tweetArray.push(tweet);
    }
  });
  res.json(tweetArray);
});

module.exports = router;
