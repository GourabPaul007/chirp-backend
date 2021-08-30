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
      authorID: req.body.uid,
      body: req.body.body,
      date: Date.now(),
      likes: [],
    });
    await newComment.save();
    return res.status(200).json(newComment);
  } catch (e) {
    console.log("Something went wrong", e);
  }
  res.json("Something went wrong");
});

// update likes on a comment
router.post("/:commentId/updateCommentLikes", async (req, res) => {
  const likerID = req.body.uid;
  try {
    const singleComment = await Comment.findById(req.params.commentId);
    if (singleComment.likes.includes(likerID)) {
      singleComment.likes.splice(singleComment.likes.indexOf(likerID), 1);
      await singleComment.save();
      return res.status(200).json({ status: "Comment UnLiked" });
    } else {
      singleComment.likes.push(likerID);
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
    console.log("Comment Deleted", deletedComment);
    res.json("Comment deleted");
  } catch (e) {
    console.log(e);
  }
  console.log("ignored");
});

module.exports = router;
