const User = require("../models/UserModel");

const fs = require("fs");
const path = require("path");
const SequenceModel = require("../models/SequenceModel");

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports.getRandomSequence = async (req, res, next) => {
  // const fs = require("fs");

  // const sequence = JSON.parse(
  //   fs.readFileSync(path.join(__dirname, "./randomSequence.json")).toString()
  // );

  let sequence = await SequenceModel.find({});
  const randomNumber = getRandomNumberBetween(1, sequence.length);
  let seq = {
    miRNAid: sequence[randomNumber].miRNAid,
    sequence: sequence[randomNumber].sequence,
  };
  res.json({ sequence: seq });

  //  res.send("ok")
};
