const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

const demoProfile = require("../demoProfile.json");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/savedTweets", async (req, res) => {
  if (req.body.name === demoProfile.name) {
    res.json({
      savedTweets: demoProfile.savedTweets,
    });
  }
});

module.exports = router;
