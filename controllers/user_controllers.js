const user = require("../models/user_models");
const io = require("./../socket");
exports.create = async (req, res) => {
  console.log(req.body);

  const new_user = new user({
    email: req.body.email,
    password: req.body.password,
    isLogged: false
  });
  try {
    await new_user
      .save()
      .then(result => res.send({ response: result }))
      .catch(err => {
        throw err;
      });
  } catch (err) {
    console.log("Error", err);
    res.send({ error: err });
  }
};

exports.edit = async (req, res) => {};
exports.get = async (req, res) => {};
exports.getAll = async (req, res) => {
  try {
    await user
      .find()
      .then(result => res.send({ response: result }))
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ error: err });
  }
};
exports.login = async (req, res) => {
  console.log(req.body);
  try {
    await user
      .find({ email: req.body.email, password: req.body.password })
      .then(result =>
        result.length > 0
          ? (changeStatusToLoggedIn(result[0]),
            io.getIO().emit("Change Log Status", {
              email: result[0].email,
              status: true
            }),
            res.send({ response: result }))
          : res.send({ response: "User not found" })
      )
      .catch(error => {
        throw error;
      });
  } catch (err) {
    console.log("Error", err);
    res.send({ error: err });
  }
};

changeStatusToLoggedIn = user_ => {
  console.log(user_);
  user.update({ _id: user_._id }, { $set: { isLogged: true } }).then(
    res => {
      console.log("Updated ", res);
    },
    err => {
      console.log("Updated but", err);
    }
  );
};
exports.changeStatusToLoggedOut = async (req, res) => {
  console.log(req.params.email);
  try {
    await user
      .update({ email: req.params.email }, { $set: { isLogged: false } })
      .then(result => {
        console.log(result);
        io.getIO().emit("Change Log Status", {
          email: req.params.email,
          status: false
        });
        res.send({ response: "Logged out" });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ error: err });
  }
};
