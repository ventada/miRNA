const jwt = require("jsonwebtoken");
const MotifBaseScoreModel = require("../models/motifBaseScore");

const UserModel = require("../models/UserModel");
const ScoreModel = require("../models/ScoreModel");
const MotifsModel = require("../models/MotifsModel");

module.exports.getBaseScore = async (req, res, next) => {
  let motifs = req.body.data;
  let response = [];
  for (const key in motifs) {
    let score = await MotifBaseScoreModel.findOne({ motif: key });
    response.push([score.motif, score.baseScore]);
  }
  res.json({ msg: "OK", data: response });
};

module.exports.submitScore = async (req, res, next) => {
  // res.json({ msg: "Hi" });
  const { score, sequence, isReversed } = req.body;
  console.log(isReversed);
  const token = req.cookies.jwt;

  let engId = 2591;
  try {
    let decoded = await jwt.verify(token, "secret");
    let user = await UserModel.findOne({ _id: decoded.id });
    // we have to add score Model
    let scoreModel = await ScoreModel.findOne({ userId: user._id });

    if (scoreModel) {
      let newScore = scoreModel.score + score;
      scoreModel = await ScoreModel.findOneAndUpdate(
        { userId: user._id },
        { score: newScore },
        { new: true }
      );
    } else {
      scoreModel = await ScoreModel.findOneAndUpdate(
        { userId: user._id },
        { score, engId },
        { upsert: true, new: true }
      );
    }

    let m = await MotifsModel.create({
      motifSequence: sequence.join("").toString(),
      type: isReversed ? "revresed" : "straight",
    });

    res.json(scoreModel);
  } catch (err) {
    console.log(err);
    res.json({ error: "somthing went wrong" });
  }

  next();
};
