const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  actionName: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("actions", userSchema);
