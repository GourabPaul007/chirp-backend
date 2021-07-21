const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");

const Tweet = require("../models/tweet");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create tweets
router.post("/new", async (req, res) => {
  if (req.body.name && req.body.body) {
    const newTweet = new Tweet({
      id: uuidv4(), //req.body.id, //uuidv4(),
      name: req.body.name,
      username: req.body.username,
      body: req.body.body,
      likes: [], //req.body.likes
      saves: [], //req.body.saves
      comments: req.body.comments,
      date: Date.now(),
    });
    await newTweet.save();
    res.redirect("/");
  } else {
    res.status(422).json({ error: "not found" });
  }
});
// ----------------------------

// getting all tweets
router.get("/", async (req, res) => {
  try {
    const tweetArray = await Tweet.find({});
    res.json(tweetArray);
  } catch (e) {
    console.log("Cant find tweets?", e);
  }
});
// --------------------------------

//getting single tweet
router.get("/:id", async (req, res) => {
  try {
    const singleTweet = await Tweet.findOne({ id: req.params.id });
    console.log(singleTweet);
    res.json(singleTweet);
  } catch (e) {
    console.log("Can't find tweet", e);
  }
});

// ===================================================================================================
// ===================================================================================================
//                                              Likes

// Update Tweet Likes
router.post("/:id/updateLikes", async (req, res) => {
  const singleTweet = await Tweet.findOne({ id: req.params.id });
  const liker = req.body.name;
  if (singleTweet.likes.includes(liker)) {
    singleTweet.likes.splice(singleTweet.likes.indexOf(liker), 1);
    await singleTweet.save();
    console.log(`${liker} removed`);
    return res.status(200).json({ status: "tweet Deleted" });
  } else {
    singleTweet.likes.push(liker);
    await singleTweet.save();
    console.log(`${liker} added`);
    return res.status(200).json({ status: "tweet Added" });
  }
  return res.status(400).json();
});

// Check likes, its required for checking if user liked or not on application start
router.get("/:id/likes", async (req, res) => {
  try {
    const singleTweet = await Tweet.findOne({ id: req.params.id });
    //If singleTweet is found then send likesData
    if (singleTweet.id && req.params.id === singleTweet.id) {
      const likesData = singleTweet.likes;
      res.json(likesData);
    }
  } catch (e) {
    console.log("Data with id not found", e);
  }
});

// ===================================================================================================
// ===================================================================================================
//                                            Comments

// Create Comments on a tweet
router.post("/:id/newComment", (req, res) => {
  demoData.forEach((tweet) => {
    if (req.params.id === tweet.id) {
      const newComment = {
        id: uuidv4(),
        tweetId: tweet.id,
        name: req.body.name,
        body: req.body.body,
        date: Date.now(),
        likes: [],
      };
      console.log(newComment);
      tweet.comments.push(newComment);
      return res.status(200).json({ status: "success" });
    }
  });
});

// ===================================================================================================
// ===================================================================================================
//                                            Saves

router.post("/:id/updateSaves", async (req, res) => {
  const singleTweet = await Tweet.findOne({ id: req.params.id });
  const saver = req.body.name;
  if (singleTweet.saves.includes(saver)) {
    singleTweet.saves.splice(singleTweet.saves.indexOf(saver), 1);
    await singleTweet.save();
    console.log(`${saver} removed`);
    return res.status(200).json({ status: "tweet Deleted" });
  } else {
    singleTweet.saves.push(saver);
    await singleTweet.save();
    console.log(`${saver} added`);
    return res.status(200).json({ status: "tweet Added" });
  }
  return res.status(400).json();
});

// Check saves, its required for checking if user saved or not on application start
router.get("/:id/saves", async (req, res) => {
  const singleTweet = await Tweet.findOne({ id: req.params.id });
  //If singleTweet is found then send likesData
  if (singleTweet.id && req.params.id === singleTweet.id) {
    savesData = singleTweet.saves;
    res.json(savesData);
  }
});

module.exports = router;
