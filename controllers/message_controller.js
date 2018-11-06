const message = require("./../models/message_model");
const io = require("./../socket");
exports.createMessage = async (req, res) => {
  const message_new = new message({
    text: req.body.text,
    to: req.body.to,
    createdBy: req.body.by,
    createdAt: new Date(),
    includes: [req.body.by, req.body.to]
  });
  try {
    await message_new
      .save()
      .then(result => {
        console.log(io);
        io.getIO().emit("newMessage", result);
        res.send({ response: result });
      })
      .catch(error => {
        throw error;
      });
  } catch (err) {
    res.send(err);
  }
};

exports.getMessages = async (req, res) => {
  const by = req.query.createdBy;
  const to = req.query.receivedBy;
  console.log(by, to);
  try {
    await message
      .find({
        $and: [{ includes: { $in: [by] } }, { includes: { $in: [to] } }]
      })
      .then(result => {
        console.log(result);
        res.send({ response: result });
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.send({ error: err });
  }
};
