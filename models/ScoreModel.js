const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  score: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  engId: { type: Number },
});

module.exports = mongoose.model("scores", userSchema);
