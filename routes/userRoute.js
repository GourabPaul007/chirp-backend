const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create new user
// id = set in frontend by firebase
router.post("/newUser", async (req, res) => {
  try {
    const newUser = new User({
      uid: req.body.uid,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      about: req.body.about,
      date: Date.now(),
    });
    await newUser.save();
  } catch (e) {
    console.log(e);
  }
  res.status(200).json("new user created");
});

// Get a single user by uid
router.get("/:uid/getUser", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid: uid });
    const u = JSON.parse(JSON.stringify(user));
    return res.json(u);
  } catch (e) {
    console.log(e);
  }
});
// Get a single user by username
router.get("/:username/getUserByUsername", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    const u = JSON.parse(JSON.stringify(user));
    return res.json(u);
  } catch (e) {
    console.log(e);
  }
});

// update user from edit user button in frontend
router.post("/:uid/updateUser", async (req, res) => {
  try {
    const { uid } = req.params;
    const singleUser = await User.findOne({ uid: uid });
    singleUser.name = req.body.name;
    singleUser.about = req.body.about;
    await singleUser.save();
    res.json("Update Successful");
  } catch (e) {
    console.log(e);
  }
});

// to check if a user exists with a specific username/displayname
router.get("/checkUsername/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  console.log(user);
  if (user) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

module.exports = router;
