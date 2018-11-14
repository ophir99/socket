const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  includes: [String]
});

const chatRoomModel = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = chatRoomModel;
