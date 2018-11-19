const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  isLogged: Boolean,
  rooms: []
});

userSchema.methods.addUser = function() {
  console.log("Pinging from UserModel");
};

const model = mongoose.model("User", userSchema);

module.exports = model;
