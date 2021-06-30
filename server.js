const express = require("express");

const app = express();

const tweetsRoute = require("./routes/tweetsRoute");
const bannerRoute = require("./routes/bannerRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");

app.use(cors());

// app.use("/", (req, res) => {
//   console.log("new request");
// });

app.use("/api/tweets", tweetsRoute);
app.use("/api/banner", bannerRoute);

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("hehe");
});

const PORT = 5000;

app.listen(5000, () => {
  console.log(`server started on port ${PORT}`);
});
