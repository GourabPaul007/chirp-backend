const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create tweets
router.post("/new", (req, res) => {
  if (req.body.name && req.body.body) {
    const newTweet = {
      id: uuidv4(), //req.body.id, //uuidv4(),
      name: req.body.name,
      body: req.body.body,
      date: Date.now(),
    };
    demoData.push(newTweet);
    res.redirect("/");
  } else {
    res.status(422).json({ error: "not found" });
  }
});

// getting all tweets
router.get("/", (req, res) => {
  const tweetArray = [];
  demoData.forEach((tweet) => {
    tweetArray.push(tweet);
  });
  res.json(tweetArray);
});

//getting single tweet
router.get("/:id", (req, res) => {
  demoData.forEach((tweet) => {
    if (req.params.id === tweet.id) {
      res.json(tweet);
    }
  });
});

// ===================================================================================================
// ===================================================================================================
//                                              Likes

// Update Tweet Likes
router.post("/:id/updateLikes", (req, res) => {
  demoData.forEach((tweet) => {
    if (req.params.id === tweet.id) {
      const liker = req.body.name;
      // Check if the liker already exists in fake database
      // If liker doesn't exists then push the liker name In the likes array inside the selected tweet
      if (!tweet.likes.includes(liker)) {
        tweet.likes.push(liker);
        console.log(`${liker} added`);
        return res.status(200).json({ status: "tweet Added" });
      } else {
        tweet.likes.splice(tweet.likes.indexOf(liker), 1);
        console.log(`${liker} removed`);
        return res.status(200).json({ status: "tweet Deleted" });
      }
    }
  });
  return res.status(400).json();
});

// Check likes, its required for checking if user liked or not on application start
router.get("/:id/likes", (req, res) => {
  demoData.forEach((tweet) => {
    if (req.params.id === tweet.id) {
      likesData = tweet.likes;
      res.json(likesData);
    }
  });
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
        likes: 0,
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

router.post("/:id/updateSaves", (req, res) => {
  demoData.forEach((tweet) => {
    if (req.params.id === tweet.id) {
      const saver = req.body.name;
      // Check if the saver already exists in fake database
      // If liker doesn't exist, push the liker name In the saves array
      if (!tweet.saves.includes(saver)) {
        tweet.saves.push(saver);
        console.log(`${saver} added`);
        return res.status(200).json({ status: "tweet Added" });
      } else {
        tweet.saves.splice(tweet.saves.indexOf(saver), 1);
        console.log(`${saver} removed`);
        return res.status(200).json({ status: "tweet Deleted" });
      }
    }
  });
  return res.status(400).json();
});

// Check saves, its required for checking if user saved or not on application start
router.get("/:id/saves", (req, res) => {
  demoData.forEach((tweet) => {
    if (req.params.id === tweet.id) {
      savesData = tweet.saves;
      res.json(savesData);
    }
  });
});

module.exports = router;
