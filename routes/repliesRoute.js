const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const demoData = require("../demoData.json");
const Comment = require("../models/comment");
const Tweet = require("../models/tweet");
const Reply = require("../models/reply");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create Reply on a Comment
router.post("/:tweetId/:commentId/newReply", async (req, res) => {
  try {
    const newReply = new Reply({
      id: uuidv4(),
      tweetId: req.params.tweetId,
      commentId: req.params.commentId,
      name: req.body.name,
      authorID: req.body.uid,
      username: req.body.username,
      body: req.body.body,
      date: Date.now(),
      likes: [],
    });
    console.log(newReply);
    await newReply.save();
    return res.status(200).json(newReply);
  } catch (e) {
    console.log("Something went wrong", e);
  }
  console.log("Did not hit");
  res.json("reply creation failed");
});

// Update Likes on a reply
router.post("/:tweetId/:replyId/updateReplyLikes", async (req, res) => {
  const likerID = req.body.uid;
  try {
    const singleReply = await Reply.findById(req.params.replyId);
    if (singleReply.likes.includes(likerID)) {
      singleReply.likes.splice(singleReply.likes.indexOf(likerID), 1);
      await singleReply.save();
      return res.status(200).json("Reply_UnLiked");
    } else {
      singleReply.likes.push(likerID);
      await singleReply.save();
      return res.status(200).json("Reply_Liked");
    }
  } catch (e) {
    console.log("bruh?", e);
  }
  res.json("updating reply likes failed");
});

// Check likes, its required for checking if user liked or not on application start
router.get("/:tweetId/:replyId/likes", async (req, res) => {
  try {
    const singleReply = await Reply.findById(req.params.replyId);
    const likesData = singleReply.likes;
    return res.json(likesData);
  } catch (e) {
    console.log("Error", e);
  }
  res.json({ status: "did not hit endpoint" });
});

// ===================================================================================================
// ===================================================================================================
//                                              Delete

router.post("/:replyId/deleteReply", async (req, res) => {
  try {
    const deletedReply = await Reply.findByIdAndDelete(req.params.replyId);
    res.json("Reply deleted");
  } catch (e) {
    console.log(e);
  }
  console.log("ignored");
});

module.exports = router;
