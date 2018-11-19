const message = require("./../models/message_model");
const io = require("./../socket");
exports.createMessage = async (req, res) => {
  const message_new = new message({
    text: req.body.post,
    room: req.body.room,
    createdBy: req.body.by,
    createdAt: new Date()
  });
  try {
    await message_new
      .save()
      .then(result => {
        // console.log(io);
        // io.getIO().emit("newMessage", result);
        console.log("ROOM is", req.body.room);
        io.getIO()
          .sockets.in(req.body.room)
          .emit("newMsg", { data: result });
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

exports.getConvo = async (req, res) => {
  console.log("Conversation");
  try {
    await message
      .find({ room: req.query.room })
      .then(result => {
        res.send({ response: result });
      })
      .catch(error => {
        throw error;
      });
  } catch (error) {
    res.send({ error: error });
  }
};
