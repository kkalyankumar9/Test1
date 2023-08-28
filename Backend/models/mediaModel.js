const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  filename: String,
  timestamp: Date,
  // Add more fields as needed
}, {
  versionKey: false
});

const MediaModel = new mongoose.model("media", mediaSchema);

module.exports = { MediaModel };
