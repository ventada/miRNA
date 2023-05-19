const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  motifSequence: { type: String },

  TimeStamp: { type: Date, default: Date.now() },
  type: { type: String }, // straight or reverse
  engId: { type: String }, // straight or reverse

  frequency: { type: Number },
});

module.exports = mongoose.model("motifs", userSchema);
