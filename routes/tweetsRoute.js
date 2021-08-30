const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");
const Comment = require("../models/comment");
const Reply = require("../models/reply");
const Tweet = require("../models/tweet");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create tweet
router.post("/new", async (req, res) => {
  if (req.body.name && req.body.body) {
    const newTweet = new Tweet({
      name: req.body.name,
      username: req.body.username,
      authorID: req.body.uid,
      body: req.body.body,
      likes: [], //req.body.likes
      saves: [], //req.body.saves
      comments: [],
      date: Date.now(),
    });
    await newTweet.save();
    res.redirect("/");
  } else {
    res.status(422).json({ error: "not found" });
  }
});
// ----------------------------

// getting all tweets in News Feed
router.get("/", async (req, res) => {
  try {
    const tweetArray = await Tweet.find({});
    res.json(tweetArray);
  } catch (e) {
    console.log("Cant find tweets?", e);
  }
});
// --------------------------------

//getting Whole single tweet, Only Read DB
router.get("/:id", async (req, res) => {
  try {
    const singleTweet = await Tweet.findById(req.params.id);
    const comments = await Comment.find({ tweetId: req.params.id });
    const replies = await Reply.find({ tweetId: req.params.id });
    // singleTweet.comments = allComments; //adding comments to singletweet
    const wholeTweet = JSON.parse(JSON.stringify(singleTweet));
    wholeTweet.comments = comments; //adding comments to singletweet
    wholeTweet.replies = replies; //adding replies to singletweet
    res.json(wholeTweet);
  } catch (e) {
    console.log("Can't find tweet", e);
  }
});

// ===================================================================================================
// ===================================================================================================
//                                              Likes

// Update Tweet Likes
router.post("/:id/updateLikes", async (req, res) => {
  const singleTweet = await Tweet.findById(req.params.id);
  const likerID = req.body.uid;
  if (singleTweet.likes.includes(likerID)) {
    singleTweet.likes.splice(singleTweet.likes.indexOf(likerID), 1);
    await singleTweet.save();
    console.log(`${likerID} like removed`);
    return res.status(200).json({ status: "like Deleted" });
  } else {
    singleTweet.likes.push(likerID);
    await singleTweet.save();
    console.log(`${likerID} like added`);
    return res.status(200).json({ status: "like Added" });
  }
  return res.status(400).json();
});

// Check likes, its required for checking if user liked or not on application start
router.get("/:id/likes", async (req, res) => {
  try {
    const singleTweet = await Tweet.findById(req.params.id);
    const likesData = singleTweet.likes;
    res.json(likesData);
  } catch (e) {
    console.log("Data with id not found", e);
  }
});

// ===================================================================================================
// ===================================================================================================
//                                            Saves

router.post("/:id/updateSaves", async (req, res) => {
  const singleTweet = await Tweet.findById(req.params.id);
  const saverID = req.body.uid;
  if (singleTweet.saves.includes(saverID)) {
    singleTweet.saves.splice(singleTweet.saves.indexOf(saverID), 1);
    await singleTweet.save();
    console.log(`${saverID} save removed`);
    return res.status(200).json({ status: "tweet Deleted" });
  } else {
    singleTweet.saves.push(saverID);
    await singleTweet.save();
    console.log(`${saverID} save added`);
    return res.status(200).json({ status: "tweet Added" });
  }
  return res.status(400).json();
});

// Check saves, its required for checking if user saved or not on application start
router.get("/:id/saves", async (req, res) => {
  try {
    const singleTweet = await Tweet.findById(req.params.id);
    savesData = singleTweet.saves;
    res.json(savesData);
  } catch (e) {
    console.log(e);
  }
});

// ===================================================================================================
// ===================================================================================================
//                                           Delete Tweet
router.post("/:tweetId/deleteTweet", async (req, res) => {
  try {
    await Tweet.findByIdAndDelete(req.params.tweetId);
    await Comment.deleteMany({ tweetId: req.params.tweetId });
    await Reply.deleteMany({ tweetId: req.params.tweetId });
    console.log("Tweet Deleted");
    return res.json("tweet deleted");
  } catch (e) {
    console.log(e);
  }
  console.log("ignored");
  res.json("something went wrong");
});

module.exports = router;
