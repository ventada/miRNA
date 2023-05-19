const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  motif: { type: String },
  baseScore: { type: Number },
});

module.exports = mongoose.model("motifbasescores", userSchema);
