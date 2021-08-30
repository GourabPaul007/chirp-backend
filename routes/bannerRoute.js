const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");

const Tweet = require("../models/tweet");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Get all bookmarked Tweets
router.get("/:uid/bookmarks", async (req, res) => {
  try {
    const bookmarkedTweets = await Tweet.find({ saves: `${req.params.uid}` });
    res.json(bookmarkedTweets);
  } catch (e) {
    console.log("Cant find tweets", e);
    res.status(200).json("Cant find tweets");
  }
});

// Get all liked Tweets
router.get("/:uid/likes", async (req, res) => {
  try {
    const likedTweets = await Tweet.find({ likes: [`${req.params.uid}`] });
    console.log("likedTweets", likedTweets);
    res.json(likedTweets);
  } catch (e) {
    console.log("Cant find tweets", e);
    res.status(200).json("Cant find tweets");
  }
});

module.exports = router;
