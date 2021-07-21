const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/chirpsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Open");
  })
  .catch((e) => {
    console.log("DB Connection Error");
    console.log(e);
  });

const app = express();

const tweetsRoute = require("./routes/tweetsRoute");
const bannerRoute = require("./routes/bannerRoute");
const commentsRoute = require("./routes/commentsRoute");

// const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");

app.use(cors());

// app.use("/", (req, res) => {
//   console.log("new request");
// });

app.use("/api/tweets", tweetsRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/comments", commentsRoute);

// app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("hehe");
});

const PORT = 5000;

app.listen(5000, () => {
  console.log(`server started on port ${PORT}`);
});
