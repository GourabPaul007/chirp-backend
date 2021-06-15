const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// getting all tweets
router.get("/", (req, res) => {
  const tweetArray = [];
  demoData.forEach((tweet) => {
    tweetArray.push(tweet);
  });
  res.json(tweetArray);
});

// Create tweets
router.post("/new", (req, res) => {
  if (req.body.name && req.body.body) {
    const newTweet = {
      id: uuidv4(), //req.body.id, //uuidv4(),
      name: req.body.name,
      body: req.body.body,
      date: req.body.date,
    };
    demoData.push(newTweet);
    res.redirect("/");
  } else {
    res.status(422).json({ error: "not found" });
  }
});

//getting single tweet
router.get("/:id", (req, res) => {
  demoData.forEach((tweet) => {
    if (parseInt(req.params.id) === tweet.id) {
      res.json(tweet);
    }
  });
});

// Update Tweet
router.post("/:id/updateLikes", (req, res) => {
  demoData.forEach((tweet) => {
    if (parseInt(req.params.id) === tweet.id) {
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

// Check likes
router.get("/:id/likes", (req, res) => {
  demoData.forEach((tweet) => {
    if (parseInt(req.params.id) === tweet.id) {
      likesData = tweet.likes;
      res.json(likesData);
    }
  });
});

// Create Comments on a tweet
// router.post("/:id/newComment", (req, res) => {
//   if()
// });

module.exports = router;
