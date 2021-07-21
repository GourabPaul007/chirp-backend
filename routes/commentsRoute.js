const express = require("express");
const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// update likes on a comment
router.post("/:id/:commentId/updateCommentLikes", (req, res) => {
  // somewhere here problem

  demoData.forEach((tweet) => {
    if (req.params.id == tweet.id) {
      tweet.comments.forEach((comment) => {
        if (req.params.commentId == comment.id) {
          const liker = req.body.name;
          if (comment.likes.includes(liker)) {
            comment.likes.splice(comment.likes.indexOf(liker), 1);
            console.log(`${liker} removed`);
            return res.status(200).json({ status: "liker deleted" });
          } else {
            comment.likes.push(liker);
            console.log(`${liker} added`);
            return res.status(200).json({ status: "liker Added" });
          }
        }
      });
    }
  });
  res.json({ status: "did not hit endpoint" });
});

// Check likes, its required for checking if user liked or not on application start
router.get("/:id/:commentId/likes", (req, res) => {
  demoData.forEach((tweet) => {
    if (req.params.id === tweet.id) {
      tweet.comments.forEach((comment) => {
        if (req.params.commentId == comment.id) {
          likesData = comment.likes;
          res.json(likesData);
        }
      });
    }
  });
  res.json({ status: "did not hit endpoint" });
});

module.exports = router;
