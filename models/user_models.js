const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  isLogged: Boolean,
  rooms: []
});

const model = mongoose.model("User", userSchema);

module.exports = model;
