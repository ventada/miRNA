const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const DB = require("./config/db");
const coockieParser = require("cookie-parser");
const path = require("path");
//routes
const authRouter = require("./Routes/AuthRoutes");
const sequenceRouter = require("./Routes/SequenceRoute");
const motfiRouter = require("./Routes/MotifsRoute");
const userRouter = require("./Routes/UserRoutes");

DB();

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use(coockieParser());

app.use("/auth", authRouter);
app.use("/sequence", sequenceRouter);
app.use("/motifs", motfiRouter);
app.use("/actions", userRouter);

// app.use(express.static(path.join(__dirname, "./public/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/build/index.js"));
// });

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`server running on port ${PORT}`);
});

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
