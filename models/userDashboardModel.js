const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  timestamp: { type: Date, default: Date.now() },
  EngId: { type: String },
  //   seqId: { type: Schema.Types.ObjectId, ref: "sequences" },
  //   position: { type: String },
  sequenceArray: { type: [[String]] },
  motifExclusionArray: { type: [String] },
});

module.exports = mongoose.model("userdashboard", userSchema);
