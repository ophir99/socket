const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  to: String,
  createdBy: String,
  createdAt: String,
  includes: [String]
});

const messageModel = mongoose.model("Messages", messageSchema);

module.exports = messageModel;
