const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  miRNAid: {
    type: String,
  },
  Gene_Symbol: { type: String },
  Organism: { type: String },
  miRNA_Name: { type: String },
  sequence: { type: String },
  seedPos: { type: String },
  sequenceLen: { type: Number },
});

module.exports = mongoose.model("sequences", userSchema);
