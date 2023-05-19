const jwt = require("jsonwebtoken");
const actionsTypeModel = require("../models/actionsTypeModel");
const userModel = require("../models/UserModel");
const scoreModel = require("../models/ScoreModel");
const UserModel = require("../models/UserModel");
const ScoreModel = require("../models/ScoreModel");
const { default: mongoose } = require("mongoose");
const userDashboardModel = require("../models/userDashboardModel");
module.exports.submitActions = async (req, res, next) => {
  const token = req.cookies.jwt;
  //   const token = req.headers.jwt;
  try {
    const decoded = await jwt.verify(token, "secret");
    if (!decoded) return res.json({ error: "invalid token" });

    let action = await actionsTypeModel.create({
      actionName: req.body.action,
      userId: decoded.id,
    });
    res.json({
      created: true,
      action,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports.getUserRank = async (req, res, next) => {
  // const token = req.headers.jwt;
  const token = req.cookies.jwt;

  try {
    const decoded = await jwt.verify(token, "secret");
    if (!decoded) return res.json({ error: "invalid token" });

    let user = await UserModel.findById(decoded.id);
    let scores = await ScoreModel.find().sort("-score");
    let rank = 0;
    scores.forEach((score, index) => {
      if (String(score.userId) == String(user._id)) rank = index + 1;
    });
    res.json({
      rank,
      score: scores[rank - 1].score,
      bestScore: scores[0].score,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.saveUserProgress = async (req, res, next) => {
  // const token = req.headers.jwt;
  const token = req.cookies.jwt;
  const { sequenceArray, motifExclusionArray } = req.body;
  try {
    const decoded = await jwt.verify(token, "secret");
    if (!decoded) return res.json({ error: "invalid token" });

    let a = await userDashboardModel.findOneAndUpdate(
      { userId: decoded.id },
      {
        userId: decoded.id,
        sequenceArray,
        motifExclusionArray,
      },
      { upsert: true, new: true }
    );
    res.json(a);
  } catch (err) {
    console.log(err);
    res.json({ error: "somthing went wrong" });
  }
};

module.exports.restoreUserProgress = async (req, res, next) => {
  // const token = req.headers.jwt;
  const token = req.cookies.jwt;

  try {
    const decoded = await jwt.verify(token, "secret");
    if (!decoded) return res.json({ error: "invalid token" });

    const dashboard = await userDashboardModel
      .findOne({ userId: decoded.id })
      .select("motifExclusionArray sequenceArray");

    res.json(dashboard);
  } catch (err) {
    console.log(err);
    res.json({ error: "somthing went wrong" });
  }
};
