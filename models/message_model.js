const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  room: String,
  createdBy: String,
  createdAt: String
});

const messageModel = mongoose.model("Messages", messageSchema);

module.exports = messageModel;
