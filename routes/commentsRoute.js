const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");
const Comment = require("../models/comment");
const Tweet = require("../models/tweet");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create Comments on a tweet
router.post("/:tweetId/newComment", async (req, res) => {
  try {
    const newComment = new Comment({
      id: uuidv4(),
      tweetId: req.params.tweetId,
      name: req.body.name,
      username: req.body.username,
      body: req.body.body,
      date: Date.now(),
      likes: [],
    });
    await newComment.save();
    return res.status(200).json({ status: "success" });
  } catch (e) {
    console.log("Something went wrong", e);
  }
});

// update likes on a comment
router.post("/:commentId/updateCommentLikes", async (req, res) => {
  const liker = req.body.name;
  try {
    const singleComment = await Comment.findById(req.params.commentId);
    if (singleComment.likes.includes(liker)) {
      singleComment.likes.splice(singleComment.likes.indexOf(liker), 1);
      await singleComment.save();
      return res.status(200).json({ status: "Comment UnLiked" });
    } else {
      singleComment.likes.push(liker);
      await singleComment.save();
      return res.status(200).json({ status: "Comment Liked" });
    }
  } catch (e) {
    console.log(e);
  }
  res.json({ status: "did not hit endpoint" });
});

// Check likes, its required for checking if user liked or not on application start
router.get("/:commentId/likes", async (req, res) => {
  try {
    const singleComment = await Comment.findById(req.params.commentId);
    const likesData = singleComment.likes;
    return res.json(likesData);
  } catch (e) {
    console.log("Error", e);
  }
  res.json({ status: "did not hit endpoint" });
});

// ===================================================================================================
// ===================================================================================================
//                                              Delete
router.post("/:commentId/deleteComment", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    res.json("Comment deleted");
  } catch (e) {
    console.log(e);
  }
  console.log("ignored");
});

module.exports = router;
